using GrowthLMS.Core.Interfaces;

namespace GrowthLMS.Core.Models
{
    public class User : IUser
    {
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Salt { get; set; } = string.Empty;
        public string Hash { get; set; } = string.Empty;
        public ICollection<Guid> CourseIds { get; set; } = new List<Guid>();
        public ICollection<UserType> UserTypes { get; set; } = new List<UserType>();
    }
} 