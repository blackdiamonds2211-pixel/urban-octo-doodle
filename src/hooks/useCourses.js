import { useState, useEffect } from 'react';
import { getCourses } from '../services/api';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.error("Greška pri učitavanju:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Vraćamo podatke, loading stanje i funkciju za osvežavanje liste
  return { courses, loading, refresh: fetchCourses };
};
