import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses'; // Proverite putanju do vašeg hook-a

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, updateCourse } = useCourses();

  // Isti raspored stanja kao u AddCourse
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [loading, setLoading] = useState(true);

  // Proširena lista svih programerskih smerova (identična vašoj)
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
    if (!courses || courses.length === 0) return;

    // Pronalaženje kursa u pravoj listi pomoću ID-ja iz URL-a
    const currentCourse = courses.find(c => String(c.id) === String(id));

    if (currentCourse) {
      setTitle(currentCourse.title);
      setInstructor(currentCourse.instructor);
      setLoading(false);
    } else {
      alert(`Kurs sa ID-em "${id}" nije pronađen!`);
      navigate('/');
    }
  }, [id, courses, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacija: Provera da li je izabran smer i da li je unet instruktor
    if (title === "--- Izaberite program ---" || !title || !instructor.trim()) {
      alert("Sva polja moraju biti ispravno popunjena!");
      return;
    }

    // Ažuriranje preko vašeg hook-a
    if (typeof updateCourse === 'function') {
      updateCourse(id, { title, instructor });
    }

    alert(`Uspešno sačuvane izmene za kurs: "${title}"`);
    navigate('/');
  };

  if (loading) {
    return <p style={{ padding: '20px' }}>Učitavanje podataka...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Izmeni kurs</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Izaberite smer:</label><br />
          {/* Padajući meni koji automatski selektuje trenutni naziv kursa */}
          <select value={title} onChange={(e) => setTitle(e.target.value)}>
            {programerskiSmerovi.map((smer, index) => (
              <option key={index} value={smer}>
                {smer}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label>Instruktor:</label><br />
          <input 
            type="text" 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
          />
        </div>
        <br />
        <button type="submit">Sačuvaj izmene</button>
      </form>
    </div>
  );
};

export default EditCourse;
