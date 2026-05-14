import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [localCourses, setLocalCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Čitamo podatke direktno iz localStorage čim se stranica učita
  useEffect(() => {
    const savedCourses = localStorage.getItem('local_courses');
    if (savedCourses) {
      setLocalCourses(JSON.parse(savedCourses));
    } else {
      // Ako je memorija prazna (prvi put), postavljamo početna 3 kursa
      const defaultData = [
        { id: 1, title: "React za Početnike", instructor: "Petar Petrović", description: "Osnove React frameworka." },
        { id: 2, title: "Uvod u JavaScript", instructor: "Marko Marković", description: "Savladajte logiku." },
        { id: 3, title: "HTML i CSS Dizajn", instructor: "Nikola Nikolić", description: "Kreirajte stranice." }
      ];
      setLocalCourses(defaultData);
      localStorage.setItem('local_courses', JSON.stringify(defaultData));
    }
    setLoading(false);
  }, []);

  // Nova funkcija koja TRAJNO briše kurs iz memorije brauzera
  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite ovaj kurs izbrisati?')) {
      // 1. Filtriramo listu i izbacujemo odabrani kurs
      const updatedList = localCourses.filter(course => course.id !== id);
      
      // 2. Čuvamo novu, skraćenu listu na ekranu
      setLocalCourses(updatedList);
      
      // 3. ZAKLJUČAVAMO izmenu u localStorage memoriji (ključna stavka!)
      localStorage.setItem('local_courses', JSON.stringify(updatedList));
    }
  };

  if (loading) return <div className="container">Učitavanje...</div>;

  return (
    <div className="container">
      <header>
        <div>
          <span style={{ color: '#8b949e', fontSize: '0.7rem' }}>// session_active: true</span>
          <h2>{`const student = "${user?.email}";`}</h2>
        </div>
        <button onClick={logout} className="btn-logout">system.logout()</button>
      </header>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Available_Courses</h3>
        <Link to="/add">
          <button className="btn-main">git commit -m "Add New"</button>
        </Link>
      </div>

      <div className="courses-grid">
        {localCourses.length === 0 ? (
          <p style={{ color: '#8b949e' }}>// No data found in registry.</p>
        ) : (
          localCourses.map(course => (
            <div key={course.id} className="course-card">
              <div>
                <h4>{course.title || course.name}</h4>
                <p>{`instructor: "${course.instructor || 'Nepoznato'}"`}</p>
              </div>
              
              <div className="card-actions">
                <Link to={`/edit/${course.id}`} className="edit-button">
                  ./edit
                </Link>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  style={{ background: 'none', color: '#da3633', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '700' }}
                >
                  rm -rf
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
