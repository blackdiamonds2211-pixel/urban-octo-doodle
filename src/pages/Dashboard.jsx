import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const [localCourses, setLocalCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCourses = localStorage.getItem('local_courses');
    if (savedCourses) {
      setLocalCourses(JSON.parse(savedCourses));
    } else {
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

  const handleDelete = (id) => {
    if (window.confirm('Da li ste sigurni da želite ovaj kurs izbrisati?')) {
      const updatedList = localCourses.filter(course => course.id !== id);
      setLocalCourses(updatedList);
      localStorage.setItem('local_courses', JSON.stringify(updatedList));
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-dim)' }}>Učitavanje podataka...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Zaglavlje u mekom staklenom stilu */}
      <header>
        <div>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem', display: 'block', marginBottom: '4px' }}>
            // session_active: true
          </span>
          <h2>{`const student = "${user?.email || 'Gost'}";`}</h2>
        </div>
        <button onClick={logout} className="btn-logout">
          system.logout()
        </button>
      </header>

      {/* Sekcija ispod zaglavlja za dodavanje novog programa */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '600' }}>
          Available_Courses
        </h3>
        <Link to="/add" style={{ textDecoration: 'none' }}>
          <button className="btn-main">git commit -m "Add New"</button>
        </Link>
      </div>

      {/* Mreža sa karticama kurseva */}
      <div className="courses-grid">
        {localCourses.length === 0 ? (
          <p style={{ color: 'var(--text-dim)', gridColumn: '1 / -1' }}>
            // No data found in registry.
          </p>
        ) : (
          localCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-info">
                <h4>{course.title || course.name}</h4>
                <p style={{ margin: '10px 0 0 0', fontFamily: 'monospace', color: 'var(--text-dim)' }}>
                  {`instructor: "${course.instructor || 'Nepoznato'}"`}
                </p>
              </div>
              
              {/* Sekcija za akcije unutar kartice */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' }}>
                <Link 
                  to={`/edit/${course.id}`} 
                  className="edit-button" 
                  style={{ flex: 1, padding: '10px', display: 'block' }}
                >
                  ./edit
                </Link>
                <button 
                  onClick={() => handleDelete(course.id)} 
                  className="btn-logout"
                  style={{ 
                    flex: 1, 
                    padding: '10px', 
                    fontSize: '0.82rem', 
                    fontFamily: 'monospace',
                    fontWeight: '700',
                    border: '1px solid rgba(244, 63, 94, 0.2)'
                  }}
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
