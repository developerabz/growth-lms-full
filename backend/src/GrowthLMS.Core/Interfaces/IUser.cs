using System;
using System.Collections.Generic;

namespace GrowthLMS.Core.Interfaces
{
    public enum UserType
    {
        Teacher,
        Parent,
        AdultStudent,
        Admin,
        ChildStudent
    }

    public interface IUser
    {
        Guid UserId { get; set; }
        string Name { get; set; }
        string Email { get; set; }
        string Salt { get; set; }
        string Hash { get; set; }
        ICollection<Guid> CourseIds { get; set; }
        ICollection<UserType> UserTypes { get; set; }
    }

    public interface ISimpleUser
    {
        Guid UserId { get; set; }
        string Name { get; set; }
        string Email { get; set; }
    }

    public interface IParentUser
    {
        Guid UserId { get; set; }
        ICollection<Guid> ChildrenIds { get; set; }
    }

    public interface IChildStudentUser
    {
        Guid UserId { get; set; }
        Guid ParentUserId { get; set; }
    }

    public interface IProgress
    {
        Guid Id { get; set; }
        decimal Amount { get; set; }  // Will store value between 0-100
        Guid CourseId { get; set; }
        Guid StudentId { get; set; }
    }
} 