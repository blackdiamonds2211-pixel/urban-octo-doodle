import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCourse } = useCourses();

  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [loading, setLoading] = useState(true);

  const programerskiSmerovi = [
    "--- Izaberite program ---",
    "Frontend Development (React.js & Next.js)",
    "Backend Development (Node.js & Express)",
    "Fullstack JavaScript Developer",
    "Python za Veštačku Inteligenciju (AI)",
    "Data Science & Machine Learning",
    "Java Spring Boot Enterprise",
    "C# i .NET Core Web API",
    "Razvoj mobilnih aplikacija (React Native)",
    "Cyber Security & Ethical Hacking",
    "Game Development (Unity & C#)",
    "UI/UX Design for Developers"
  ];

  useEffect(() => {
    // Čitamo iz 'local_courses' baze koju koristi i Dashboard kako bi ID uvek bio pronađen
    const savedCourses = localStorage.getItem('local_courses');
    const coursesList = savedCourses ? JSON.parse(savedCourses) : [];

    const currentCourse = coursesList.find(c => String(c.id) === String(id));

    if (currentCourse) {
      setTitle(currentCourse.title);
      setInstructor(currentCourse.instructor);
      setLoading(false);
    } else {
      alert(`Kurs sa ID-em "${id}" nije pronađen!`);
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "--- Izaberite program ---" || !title || !instructor.trim()) {
      alert("Sva polja moraju biti ispravno popunjena!");
      return;
    }

    // Trajno ažuriramo podatak unutar 'local_courses' u localStorage
    const savedCourses = localStorage.getItem('local_courses');
    let currentCourses = savedCourses ? JSON.parse(savedCourses) : [];

    const updatedCourses = currentCourses.map(course => {
      if (String(course.id) === String(id)) {
        return { ...course, title, instructor };
      }
      return course;
    });

    localStorage.setItem('local_courses', JSON.stringify(updatedCourses));

    if (typeof updateCourse === 'function') {
      updateCourse(id, { title, instructor });
    }

    alert(`Sistem: Uspešno izmenjen program "${title}"`);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)' }}>Učitavanje podataka...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '550px', display: 'flex', minHeight: '80vh', alignItems: 'center' }}>
      {/* Kartica u potpunosti kopira stil, mekoću i prozirnost iz AddCourse */}
      <div className="course-card" style={{ width: '100%', padding: '40px', minHeight: 'auto' }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '30px', 
          color: 'var(--accent)', 
          fontFamily: 'monospace',
          fontSize: '1.3rem'
        }}>
          {`> Edit_Registration.exe`}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Fiksirana greška: Labela povezana preko htmlFor i id-ja sa select poljem */}
          <label htmlFor="edit-course-select">PROGRAMSKI SMER</label>
          <select 
            id="edit-course-select"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          >
            {programerskiSmerovi.map((smer, index) => (
              <option key={index} value={smer} style={{ background: '#0d1117', color: '#fff' }}>
                {smer}
              </option>
            ))}
          </select>
          
          {/* Fiksirana greška: Labela povezana preko htmlFor i id-ja sa input poljem */}
          <label htmlFor="edit-instructor-input">MENTOR / INSTRUKTOR</label>
          <input 
            id="edit-instructor-input"
            type="text" 
            placeholder="Unesite ime mentora"
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
            required
          />
          
          {/* Simetrična i mekana dugmad, raspoređena u flex odnosu 2:1 kao na AddCourse */}
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button type="submit" className="btn-main" style={{ flex: 2 }}>
              Potvrdi izmene
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn-logout"
              style={{ flex: 1 }}
            >
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
