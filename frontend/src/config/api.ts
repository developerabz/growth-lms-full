export const API_BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5279'  // Use HTTP in development to avoid certificate issues
  : 'https://localhost:7279'; // Use HTTPS in production

export const API_ENDPOINTS = {
  register: '/api/users/register',
  login: '/api/users/login',
  getUser: (email: string) => `/api/users/by-email/${email}`,
  getTeachers: '/api/users/teachers',
  createCourse: '/api/users/create-course',
  // Add other endpoints as needed
}; 