import axios from 'axios';

// Pravimo Axios instancu sa portom 5005 koji ti trenutno radi
const api = axios.create({
  baseURL: 'http://localhost:5005' 
});

// Funkcije za CRUD operacije
export const getCourses = () => api.get('/courses');
export const addCourse = (courseData) => api.post('/courses', courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);

export default api;
