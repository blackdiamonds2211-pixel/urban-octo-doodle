import { useState } from 'react';
import { addCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  // Proširena lista svih programerskih smerova
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

  // Inicijalno postavljamo prvu opciju
  const [title, setTitle] = useState(programerskiSmerovi[0]);
  const [instructor, setInstructor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Provera da student nije ostavio "Izaberite program"
    if (title === programerskiSmerovi[0]) {
      alert("Molimo izaberite konkretan program sa liste.");
      return;
    }

    try {
      await addCourse({ title, instructor });
      navigate('/'); 
    } catch (error) {
      console.error("Greška pri upisu:", error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '550px' }}>
      {/* Kartica prati Glassmorphism stil iz index.css */}
      <div style={{ 
        background: 'var(--card-bg)', 
        padding: '40px', 
        borderRadius: '12px', 
        border: '1px solid var(--border)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '30px', 
          color: 'var(--accent)', 
          fontFamily: 'Courier New, monospace',
          fontSize: '1.4rem'
        }}>
          {`> New_Registration.exe`}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <label>PROGRAMSKI SMER</label>
          <select 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginTop: '10px', marginBottom: '25px' }}
          >
            {programerskiSmerovi.map((kurs, index) => (
              <option key={index} value={kurs} style={{background: '#0d1117', color: '#fff'}}>
                {kurs}
              </option>
            ))}
          </select>
          
          <label>MENTOR / INSTRUKTOR</label>
          <input 
            type="text" 
            placeholder="Unesite ime mentora" 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
            required 
          />
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <button type="submit" className="btn-main" style={{ flex: 2 }}>
              Potvrdi upis
            </button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              className="btn-logout"
              style={{ flex: 1, padding: '12px' }}
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
