using GrowthLMS.Core.Interfaces;

namespace GrowthLMS.Core.Models
{
    public class SimpleUser : ISimpleUser
    {
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
} 