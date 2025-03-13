using GrowthLMS.Core.Interfaces;

namespace GrowthLMS.Core.DTOs
{
    public class UserRegistrationDto
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string[] UserTypes { get; set; } = Array.Empty<string>();
        public string? ParentEmail { get; set; }
        public ChildEmailDto[]? ChildEmails { get; set; }
    }

    public class ChildEmailDto
    {
        public string Email { get; set; } = string.Empty;
    }
} 