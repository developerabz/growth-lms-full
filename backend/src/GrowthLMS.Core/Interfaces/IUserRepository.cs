namespace GrowthLMS.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> CreateUserAsync(IUser user, UserType userType, Guid? parentUserId = null);
        Task<bool> EmailExistsAsync(string email);
        Task<Guid?> GetUserIdByEmailAsync(string email);
        Task<IUser?> GetUserByEmailAsync(string email);
        Task<ISimpleUser[]?> GetTeachersAsync();
        Task<bool> CreateCourseAsync(ICourse course);
        Task<ICourse[]> GetAllCoursesAsync();
        Task<ICourse[]> GetCoursesForTeacherIdAsync(Guid teacherId);
        Task<bool> UpdateCourseAsync(ICourse course);
        Task<bool> DeleteCourseAsync(Guid courseId);
        Task<bool> EnrolUserInCourseAsync(Guid userId, Guid courseId);
        Task<IEnrolledCourse[]> GetEnrollmentsForUserIdAsync(Guid userId);
    }
} 