export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5279'  // Use HTTP in development to avoid certificate issues
  : 'https://localhost:7279'; // Use HTTPS in production

export const API_ENDPOINTS = {
  register: '/api/users/register',
  login: '/api/users/login',
  getUser: (email: string) => `/api/users/by-email/${email}`,
  getTeachers: '/api/users/teachers',
  createCourse: '/api/users/create-course',
  getAllCourses: '/api/users/all-courses',
  enrolUserInCourse: '/api/users/enrol-user-in-course',
  getEnrolmentsForUser: (userId: string) => `/api/users/enrolments-for-user/${userId}`,
  getEnrolmentsForTeacher: (teacherId: string) => `/api/users/enrolments-for-teacher/${teacherId}`,
  // Add other endpoints as needed
}; 