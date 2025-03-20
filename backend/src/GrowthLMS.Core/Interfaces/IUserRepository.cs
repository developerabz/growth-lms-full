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
    }
} 