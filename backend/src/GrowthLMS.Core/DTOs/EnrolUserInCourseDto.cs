using GrowthLMS.Core.Interfaces;
namespace GrowthLMS.Core.DTOs
{
    public class EnrolUserInCourseDto
    {
        public Guid UserId { get; set; }
        public Guid CourseId { get; set; }
    }
}