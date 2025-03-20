using Microsoft.AspNetCore.Mvc;
using GrowthLMS.Core.DTOs;
using GrowthLMS.Core.Interfaces;
using GrowthLMS.Core.Models;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Logging;

namespace GrowthLMS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserRepository userRepository, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistrationDto registration)
        {
            try
            {
                _logger.LogInformation("Starting user registration for email: {Email}", registration.Email);

                // Check if email already exists
                if (await _userRepository.EmailExistsAsync(registration.Email))
                {
                    _logger.LogWarning("Registration failed: Email {Email} already exists", registration.Email);
                    return BadRequest(new { message = "Email already registered" });
                }

                // Generate salt and hash
                var salt = GenerateSalt();
                var hash = HashPassword(registration.Password, salt);

                // Create user object
                var user = new User
                {
                    UserId = Guid.NewGuid(),
                    Name = registration.FullName,
                    Email = registration.Email,
                    Salt = Convert.ToBase64String(salt),
                    Hash = Convert.ToBase64String(hash),
                    CourseIds = new List<Guid>(),
                    UserTypes = new List<UserType>()
                };

                // Convert frontend user types to backend UserType enum
                foreach (var type in registration.UserTypes)
                {
                    // Convert camelCase to PascalCase for enum parsing
                    var pascalCaseType = char.ToUpper(type[0]) + type.Substring(1);
                    if (Enum.TryParse<UserType>(pascalCaseType, true, out var userType))
                    {
                        user.UserTypes.Add(userType);
                        _logger.LogInformation("Added user type: {UserType}", userType);
                    }
                    else
                    {
                        _logger.LogWarning("Failed to parse user type: {Type}", type);
                        return BadRequest(new { message = $"Invalid user type: {type}" });
                    }
                }

                if (!user.UserTypes.Any())
                {
                    _logger.LogWarning("No valid user types provided for email: {Email}", registration.Email);
                    return BadRequest(new { message = "At least one user type must be specified" });
                }

                // Handle parent-child relationships
                Guid? parentUserId = null;
                if (!string.IsNullOrEmpty(registration.ParentEmail))
                {
                    parentUserId = await _userRepository.GetUserIdByEmailAsync(registration.ParentEmail);
                    if (!parentUserId.HasValue)
                    {
                        _logger.LogWarning("Parent email {ParentEmail} not found", registration.ParentEmail);
                        return BadRequest(new { message = "Parent email not found" });
                    }
                    _logger.LogInformation("Found parent user ID: {ParentUserId}", parentUserId);
                }

                // Create user in database
                var success = await _userRepository.CreateUserAsync(
                    user,
                    user.UserTypes.First(), // Primary user type
                    parentUserId);

                if (success)
                {
                    _logger.LogInformation("Successfully created user with ID: {UserId}", user.UserId);

                    // If user is a parent and has children, create child accounts
                    if (user.UserTypes.Contains(UserType.Parent) && 
                        registration.ChildEmails != null && 
                        registration.ChildEmails.Any())
                    {
                        foreach (var childEmail in registration.ChildEmails)
                        {
                            // Create child user with temporary password
                            var childSalt = GenerateSalt();
                            var childHash = HashPassword(Guid.NewGuid().ToString(), childSalt);
                            
                            var childUser = new User
                            {
                                UserId = Guid.NewGuid(),
                                Name = $"Child of {registration.FullName}", // Temporary name
                                Email = childEmail.Email,
                                Salt = Convert.ToBase64String(childSalt),
                                Hash = Convert.ToBase64String(childHash),
                                CourseIds = new List<Guid>(),
                                UserTypes = new List<UserType> { UserType.ChildStudent }
                            };

                            await _userRepository.CreateUserAsync(
                                childUser,
                                UserType.ChildStudent,
                                user.UserId);
                            
                            _logger.LogInformation("Created child user with ID: {ChildUserId}", childUser.UserId);
                        }
                    }

                    return Ok(new { message = "User registered successfully" });
                }

                _logger.LogWarning("Failed to create user in database");
                return BadRequest(new { message = "Failed to register user" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user registration for email: {Email}", registration.Email);
                return StatusCode(500, new { 
                    message = "An error occurred while registering the user",
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto login)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(login.Email);
                if (user == null)
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                var passwordHash = HashPassword(login.Password, Convert.FromBase64String(user.Salt));
                if (!user.Hash.Equals(Convert.ToBase64String(passwordHash)))
                {
                    return Unauthorized(new { message = "Invalid email or password" });
                }

                return Ok(new { message = "Login successful", token = GenerateSalt() });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during user login for email: {Email}", login.Email);
                return StatusCode(500, new { 
                    message = "An error occurred while logging in", 
                    error = ex.Message,
                    stackTrace = ex.StackTrace
                });
            }
        }   
        
        
        


        [HttpGet("by-email/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await _userRepository.GetUserByEmailAsync(email);
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Don't return sensitive information
                var userResponse = new
                {
                    user.UserId,
                    user.Name,
                    user.Email,
                    user.UserTypes,
                    user.CourseIds
                };

                return Ok(userResponse);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user with email: {Email}", email);
                return StatusCode(500, new { 
                    message = "An error occurred while retrieving the user",
                    error = ex.Message
                });
            }
        }

        [HttpGet("teachers")]
        public async Task<IActionResult> GetTeachers()
        {
            try
            {
                var teachers = await _userRepository.GetTeachersAsync();
                if (teachers == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                // Don't return sensitive information 

                return Ok(teachers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving teachers");
                return StatusCode(500, new { 
                    message = "An error occurred while retrieving the user",
                    error = ex.Message
                });
            }
        }

        [HttpPost("create-teacher")]
        public async Task<IActionResult> CreateTeacher(UserRegistrationDto registration)
        {
            var user = new User
            {
                UserId = Guid.NewGuid(),    
                Name = registration.FullName,
                Email = registration.Email,
                Salt = Convert.ToBase64String(GenerateSalt()),
                Hash = Convert.ToBase64String(HashPassword(registration.Password, GenerateSalt())),
                UserTypes = new List<UserType> { UserType.Teacher },
                CourseIds = new List<Guid>()
            };

            var success = await _userRepository.CreateUserAsync(user, UserType.Teacher);
            if (success)
            {
                return Ok(new { message = "Teacher created successfully" });
            }
            return BadRequest(new { message = "Failed to create teacher" });
        }

        [HttpPost("create-admin")]  
        public async Task<IActionResult> CreateAdmin(UserRegistrationDto registration)
        {
            var user = new User
            {
                UserId = Guid.NewGuid(),
                Name = registration.FullName,
                Email = registration.Email,
                Salt = Convert.ToBase64String(GenerateSalt()),
                Hash = Convert.ToBase64String(HashPassword(registration.Password, GenerateSalt())),
                UserTypes = new List<UserType> { UserType.Admin },
                CourseIds = new List<Guid>()
            };

            var success = await _userRepository.CreateUserAsync(user, UserType.Admin);
            if (success)
            {
                return Ok(new { message = "Admin created successfully" });
            }
            return BadRequest(new { message = "Failed to create admin" });
        }

        [HttpPost("create-course")]
        public async Task<IActionResult> CreateCourse(CourseCreateDto courseCreation)
        {
            var course = new Course
            {
                Id = Guid.NewGuid(),
                Name = courseCreation.Name,
                Description = courseCreation.Description,
                Price = courseCreation.Price,
                Duration = courseCreation.Duration, 
                Subject = courseCreation.Subject,
                Level = courseCreation.Level,
                TeacherId = Guid.Parse(courseCreation.TeacherId)
            };

            var success = await _userRepository.CreateCourseAsync(course);
            if (success)
            {
                return Ok(new { message = "Course created successfully" });
            }
            return BadRequest(new { message = "Failed to create course" });
        } 

        private byte[] GenerateSalt()
        {
            var salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }

        private byte[] HashPassword(string password, byte[] salt)
        {
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000, HashAlgorithmName.SHA256))
            {
                return pbkdf2.GetBytes(32);
            }
        }
    }


} 