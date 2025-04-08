using System;
using System.Collections.Generic;

namespace GrowthLMS.Core.Interfaces
{
    public interface ICourse
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        string Level { get; set; }
        Guid TeacherId { get; set; }
        decimal Price { get; set; }
        int Duration { get; set; }
        string Subject { get; set; }
    }

    public interface IEnrolledCourse
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        string Level { get; set; }
        Guid TeacherId { get; set; }
        decimal Price { get; set; }
        int Duration { get; set; }
        string Subject { get; set; }
        decimal Progress { get; set; }
    }

    public interface IComment
    {

        Guid Id { get; set; }
        string Name { get; set; }
        string Description { get; set; }
        Guid AnnouncementId { get; set; }
        Guid AuthorId { get; set; }
    }

    public interface IAnnouncement
    {
        Guid Id { get; set; }
        string Name { get; set; }
        string Details { get; set; }
        Guid AuthorId { get; set; }
        Guid CourseId { get; set; }
        ICollection<IComment> Comments { get; set; }
    }
} 
