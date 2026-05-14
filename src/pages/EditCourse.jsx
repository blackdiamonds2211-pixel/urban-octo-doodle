import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Uklonili smo uvoz mrežnog 'api' i 'updateCourse' jer radimo u lokalnom režimu

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', instructor: '' });

  useEffect(() => {
    // Lokalna baza podataka koja se poklapa sa onom iz useCourses.js
    const mockData = [
      { 
        id: 1, 
        title: "React za Početnike", 
        instructor: "Petar Petrović" 
      },
      { 
        id: 2, 
        title: "Uvod u JavaScript", 
        instructor: "Marko Marković" 
      },
      { 
        id: 3, 
        title: "HTML i CSS Dizajn", 
        instructor: "Nikola Nikolić" 
      }
    ];

    // Pronalazimo kurs koji ima isti ID kao onaj iz URL linka
    const currentCourse = mockData.find(c => c.id === parseInt(id));

    if (currentCourse) {
      setCourse({
        title: currentCourse.title,
        instructor: currentCourse.instructor
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simuliramo uspešno čuvanje izmena u memoriji
    alert(`Uspešno sačuvane izmene za kurs: "${course.title}"`);
    
    // Vraćamo se na početnu stranu / Dashboard
    navigate('/'); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Izmeni kurs</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={course.title} 
          onChange={(e) => setCourse({...course, title: e.target.value})} 
        /><br /><br />
        <input 
          type="text" 
          value={course.instructor} 
          onChange={(e) => setCourse({...course, instructor: e.target.value})} 
        /><br /><br />
        <button type="submit">Sačuvaj izmene</button>
      </form>
    </div>
  );
};

export default EditCourse;
