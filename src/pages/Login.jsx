import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Resetuj grešku pre novog pokušaja
    
    const result = login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '80px' }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0' 
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>Student Login</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.9rem', marginBottom: '25px' }}>
          Portal za programerske kurseve
        </p>

        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#dc2626', 
            padding: '10px', 
            borderRadius: '8px', 
            fontSize: '0.85rem', 
            marginBottom: '20px',
            textAlign: 'center',
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '5px' }}>
            Gmail Adresa
          </label>
          <input 
            type="email" 
            placeholder="vas-email@gmail.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ marginBottom: '20px' }}
          />

          <label style={{ fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '5px' }}>
            Lozinka (min. 6 karaktera)
          </label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ marginBottom: '25px' }}
          />

          <button type="submit" className="btn-main" style={{ width: '100%', padding: '14px' }}>
            Pristupi kursevima
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
