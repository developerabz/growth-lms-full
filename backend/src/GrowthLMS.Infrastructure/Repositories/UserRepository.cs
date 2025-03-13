using Dapper;
using GrowthLMS.Core.Interfaces;
using GrowthLMS.Core.Models;
using Npgsql;
using System.Data;
using Microsoft.Extensions.Logging;

namespace GrowthLMS.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(string connectionString, ILogger<UserRepository> logger)
        {
            _connectionString = connectionString;
            _logger = logger;
        }

        public async Task<Guid?> GetUserIdByEmailAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            return await connection.ExecuteScalarAsync<Guid?>(
                "SELECT user_id FROM users WHERE email = @Email",
                new { Email = email });
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            var count = await connection.ExecuteScalarAsync<int>(
                "SELECT COUNT(*) FROM users WHERE email = @Email",
                new { Email = email });
            return count > 0;
        }

        public async Task<IUser?> GetUserByEmailAsync(string email)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            _logger.LogInformation("Attempting to retrieve user with email: {Email}", email);

            var result = await connection.QueryFirstOrDefaultAsync<dynamic>(
                @"SELECT u.user_id as UserId, u.name as Name, u.email as Email, u.salt as Salt, u.hash as Hash,
                    COALESCE(array_agg(ut.user_type::text) FILTER (WHERE ut.user_type IS NOT NULL), ARRAY[]::text[]) as UserTypes
                FROM users u
                LEFT JOIN user_types ut ON u.user_id = ut.user_id
                WHERE u.email = @Email
                GROUP BY u.user_id, u.name, u.email, u.salt, u.hash",
                new { Email = email });

            if (result == null)
            {
                ((ILogger)_logger).LogWarning("No user found with email: {Email}", email);
                return null;
            }

            Console.WriteLine(string.Join(", ", result.usertypes));

            try
            {
                // Log the raw result for debugging
                ((ILogger)_logger).LogInformation("Raw database result: UserId={UserId}, Name={Name}, Email={Email}, Salt={Salt}, Hash={Hash}, UserTypes={UserTypes}",
                    (string?)result.userid?.ToString(),
                    (string?)result.name?.ToString(),
                    (string?)result.email?.ToString(),
                    (string?)result.salt?.ToString(),
                    (string?)result.hash?.ToString(),
                    (string?)result.usertypes?.ToString());

                string? userIdStr = (string?)result.userid?.ToString();
                ((ILogger)_logger).LogInformation("Found user with ID: {UserId}", userIdStr);

                // Parse the Guid safely
                if (!Guid.TryParse(userIdStr, out Guid userId))
                {
                    ((ILogger)_logger).LogError("Failed to parse user ID: {UserId}", userIdStr);
                    return null;
                }

                var user = new User
                {
                    UserId = userId,
                    Name = result.name?.ToString() ?? string.Empty,
                    Email = result.email?.ToString() ?? string.Empty,
                    Salt = result.salt?.ToString() ?? string.Empty,
                    Hash = result.hash?.ToString() ?? string.Empty,
                    UserTypes = new List<UserType>()
                };
                Console.WriteLine(1);

                if (result.usertypes != null)
                {
                    var userTypes = ((string[])result.usertypes)
                        .Where(t => !string.IsNullOrEmpty(t))
                        .Select(t => Enum.Parse<UserType>(t))
                        .ToList();
                    user.UserTypes = userTypes;
                    ((ILogger)_logger).LogInformation("User types for {Email}: {UserTypes}", email, string.Join(", ", userTypes));
                }
                Console.WriteLine(2);
                return user;
            }
            catch (Exception ex)
            {
                ((ILogger)_logger).LogError(ex, "Error processing user data for email: {Email}", email);
                return null;
            }
        }

        public async Task<bool> CreateUserAsync(IUser user, UserType userType, Guid? parentUserId = null)
        {
            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();
            using var transaction = await connection.BeginTransactionAsync();

            try
            {
                // Insert into users table
                await connection.ExecuteAsync(
                    @"INSERT INTO users (user_id, name, email, salt, hash) 
                    VALUES (@UserId, @Name, @Email, @Salt, @Hash)",
                    user,
                    transaction);

                // Insert user type with proper casting
                await connection.ExecuteAsync(
                    @"INSERT INTO user_types (user_id, user_type) 
                    VALUES (@UserId, @UserType::user_type)",
                    new { UserId = user.UserId, UserType = userType.ToString() },
                    transaction);

                // If user is a child student, add to child_student_users
                if (userType == UserType.ChildStudent && parentUserId.HasValue)
                {
                    await connection.ExecuteAsync(
                        @"INSERT INTO child_student_users (user_id, parent_user_id) 
                        VALUES (@UserId, @ParentUserId)",
                        new { UserId = user.UserId, ParentUserId = parentUserId },
                        transaction);
                }
                // If user is a parent, add to parent_users
                else if (userType == UserType.Parent)
                {
                    await connection.ExecuteAsync(
                        @"INSERT INTO parent_users (user_id) 
                        VALUES (@UserId)",
                        new { UserId = user.UserId },
                        transaction);
                }

                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
} 