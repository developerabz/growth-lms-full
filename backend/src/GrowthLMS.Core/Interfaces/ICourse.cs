using System;

namespace GrowthLMS.Core.Interfaces
{
    public interface ICourse
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        string Level { get; set; }
        Guid TeacherId { get; set; }
    }

    public interface IAnnouncement
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Details { get; set; }
        Guid AuthorId { get; set; }
        Guid CourseId { get; set; }
    }
} 