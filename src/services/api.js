import axios from 'axios';

// Promenjeno sa 'localhost' na '127.0.0.1' da bismo sprečili IPv6 mrežne greške
const api = axios.create({
  baseURL: 'http://127.0.0.1:5005' 
});

// Funkcije za CRUD operacije koje tvoj React koristi
export const getCourses = () => api.get('/courses');
export const addCourse = (courseData) => api.post('/courses', courseData);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);
export const updateCourse = (id, courseData) => api.put(`/courses/${id}`, courseData);

export default api;
