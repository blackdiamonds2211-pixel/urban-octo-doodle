import { useState, useEffect } from 'react';

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = () => {
    setLoading(true);
    
    // Čitamo podatke iz memorije pretraživača pod ključem 'local_courses'
    const savedCourses = localStorage.getItem('local_courses');
    
    if (savedCourses) {
      // Ako postoje sačuvani podaci, pretvaramo ih nazad u niz i ubacujemo u stanje
      setCourses(JSON.parse(savedCourses));
    } else {
      // Ako je memorija prazna, postavljamo tvoja početna 3 kursa sa tačnim ključevima
      const defaultData = [
        { 
          id: 1, 
          title: "React za Početnike", 
          instructor: "Petar Petrović",
          description: "Naučite osnove React frameworka kroz praktične primere." 
        },
        { 
          id: 2, 
          title: "Uvod u JavaScript", 
          instructor: "Marko Marković",
          description: "Savladajte osnove programiranja i logike u JavaScriptu." 
        },
        { 
          id: 3, 
          title: "HTML i CSS Dizajn", 
          instructor: "Nikola Nikolić",
          description: "Kreirajte moderne i responzivne veb stranice ispočetka." 
        }
      ];
      
      setCourses(defaultData);
      // Prvi put zaključavamo ove početne kurseve u memoriju brauzera
      localStorage.setItem('local_courses', JSON.stringify(defaultData));
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Vraćamo podatke, loading stanje i funkciju za osvežavanje liste nazad komponentama
  return { courses, loading, refresh: fetchCourses };
};
