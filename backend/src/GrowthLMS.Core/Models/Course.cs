using GrowthLMS.Core.Interfaces;

namespace GrowthLMS.Core.Models
{
    public class Course : ICourse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public Guid TeacherId { get; set; }
    }

    public class EnrolledCourse : IEnrolledCourse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Level { get; set; } = string.Empty;
        public Guid TeacherId { get; set; }
        public decimal Progress { get; set; }
    }
}