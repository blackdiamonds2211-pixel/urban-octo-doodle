import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
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

  const [title, setTitle] = useState(programerskiSmerovi[0]);
  const [instructor, setInstructor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (title === programerskiSmerovi[0]) {
      alert("Molimo izaberite konkretan program sa liste.");
      return;
    }

    const savedCourses = localStorage.getItem('local_courses');
    let currentCourses = savedCourses ? JSON.parse(savedCourses) : [];

    const newCourse = {
      id: Date.now(), 
      title: title,
      instructor: instructor,
      description: "Lokalno dodat program u registar."
    };

    currentCourses.push(newCourse);
    localStorage.setItem('local_courses', JSON.stringify(currentCourses));

    alert(`Sistem: Uspešno kreiran program "${title}" kod mentora: ${instructor}`);
    navigate('/'); 
  };

  return (
    <div className="container" style={{ maxWidth: '550px', display: 'flex', minHeight: '80vh', alignItems: 'center' }}>
      {/* Kartica prati meki Glassmorphism stil iz index.css */}
      <div className="course-card" style={{ width: '100%', padding: '40px', minHeight: 'auto' }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '30px', 
          color: 'var(--accent)', 
          fontFamily: 'monospace',
          fontSize: '1.3rem'
        }}>
          {`> New_Registration.exe`}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Rešenje za grešku: labela je sada povezana preko htmlFor i id-ja */}
          <label htmlFor="add-course-select">PROGRAMSKI SMER</label>
          <select 
            id="add-course-select"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          >
            {programerskiSmerovi.map((kurs, index) => (
              <option key={index} value={kurs} style={{ background: '#0d1117', color: '#fff' }}>
                {kurs}
              </option>
            ))}
          </select>
          
          {/* Rešenje za grešku: labela je sada povezana preko htmlFor i id-ja */}
          <label htmlFor="add-instructor-input">MENTOR / INSTRUKTOR</label>
          <input 
            id="add-instructor-input"
            type="text" 
            placeholder="Unesite ime mentora" 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
            required 
          />
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button type="submit" className="btn-main" style={{ flex: 2 }}>
              Potvrdi upis
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

export default AddCourse;
