using GrowthLMS.Core.Interfaces;

namespace GrowthLMS.Core.DTOs
{
    public class CourseCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Duration { get; set; }
        public string Level { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string TeacherId { get; set; } = string.Empty;
    }
}