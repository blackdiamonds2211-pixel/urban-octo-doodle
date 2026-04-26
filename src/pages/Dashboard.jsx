import { useCourses } from '../hooks/useCourses';
import { deleteCourse } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { courses, loading, refresh } = useCourses();
  const { logout, user } = useAuth();

  const handleDelete = async (id) => {
    if (window.confirm('Da li ste sigurni da želite ovaj kurs izbrisati?')) {
      try {
        await deleteCourse(id);
        refresh(); 
      } catch (error) {
        console.error("Greška pri brisanju:", error);
      }
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
        {courses.length === 0 ? (
          <p style={{ color: '#8b949e' }}>// No data found in registry.</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <div>
                <h4>{course.title}</h4>
                <p>{`instructor: "${course.instructor}"`}</p>
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
