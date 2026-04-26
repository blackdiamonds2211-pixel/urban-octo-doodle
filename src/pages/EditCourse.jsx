import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api, { updateCourse } from '../services/api';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', instructor: '' });

  useEffect(() => {
    // Prvo dobavljamo trenutne podatke o kursu
    api.get(`/courses/${id}`).then(res => setCourse(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCourse(id, course);
    navigate('/'); // Vrati se na listu
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
