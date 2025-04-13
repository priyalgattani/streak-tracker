const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // User endpoints
  USERS: `${API_BASE_URL}/api/users`,
  USER: (id) => `${API_BASE_URL}/api/users/${id}`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  
  // Course endpoints
  COURSES: `${API_BASE_URL}/api/courses`,
  COURSE: (id) => `${API_BASE_URL}/api/courses/${id}`,
  COURSE_PROGRESS: (courseId) => `${API_BASE_URL}/api/courses/${courseId}/progress`,
  COURSE_CHAPTERS: (courseId) => `${API_BASE_URL}/api/courses/${courseId}/chapters`,
  
  // Problem endpoints
  PROBLEMS: (courseId, chapterId) => 
    `${API_BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/problems`,
  PROBLEM: (courseId, chapterId, problemId) => 
    `${API_BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/problems/${problemId}`,
  SUBMIT_SOLUTION: (courseId, chapterId, problemId) => 
    `${API_BASE_URL}/api/courses/${courseId}/chapters/${chapterId}/problems/${problemId}/submit`,
  
  // Streak endpoints
  STREAK: (userId) => `${API_BASE_URL}/api/streaks/${userId}`,
  UPDATE_STREAK: (userId) => `${API_BASE_URL}/api/streaks/update/${userId}`,
  RESET_STREAK: (userId) => `${API_BASE_URL}/api/streaks/reset/${userId}`,
  
  // Achievement endpoints
  ACHIEVEMENTS: (userId) => `${API_BASE_URL}/api/users/${userId}/achievements`,
  
  // User preferences
  PREFERENCES: (userId) => `${API_BASE_URL}/api/users/${userId}/preferences`,
}; 