import { useState } from 'react';
import { addCourse } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddCourse = () => {
  // Lista predefinisanih programerskih kurseva
  const programerskiKursevi = [
    "Frontend Development (React)",
    "Backend Development (Node.js)",
    "Fullstack JavaScript",
    "Python for Data Science",
    "Java Spring Boot Masterclass",
    "C# i .NET Core",
    "Mobilne aplikacije (React Native)",
    "UI/UX Design for Developers",
    "Osnove algoritama i struktura podataka"
  ];

  const [title, setTitle] = useState(programerskiKursevi[0]); // Postavljamo prvi kurs kao default
  const [instructor, setInstructor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!instructor) {
      alert("Molimo unesite ime instruktora.");
      return;
    }

    try {
      await addCourse({ title, instructor });
      navigate('/'); 
    } catch (error) {
      console.error("Greška pri čuvanju:", error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px' }}>Prijava novog kursa</h3>
        
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Izaberite Programerski Kurs</label>
          <select 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '12px', 
              margin: '10px 0 20px', 
              borderRadius: '8px', 
              border: '2px solid #e2e8f0',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            {programerskiKursevi.map((kurs, index) => (
              <option key={index} value={kurs}>
                {kurs}
              </option>
            ))}
          </select>
          
          <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Instruktor</label>
          <input 
            type="text" 
            placeholder="Ime i prezime instruktora" 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
            required 
          />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="btn-main">Potvrdi Prijavu</button>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              style={{ background: '#f1f5f9', color: '#1e293b' }}
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
