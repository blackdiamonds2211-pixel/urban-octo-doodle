import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const login = (email, password) => {
    // Provera: Gmail format i dužina lozinke (minimum 6 karaktera)
    if (email.includes('@gmail.com') && password.length >= 6) {
      const userData = { email };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    }
    
    // Određivanje specifične poruke o grešci
    let errorMsg = "Neispravni podaci.";
    if (!email.includes('@gmail.com')) {
      errorMsg = "Morate koristiti @gmail.com adresu!";
    } else if (password.length < 6) {
      errorMsg = "Lozinka mora imati minimum 6 karaktera!";
    }
    
    return { success: false, message: errorMsg };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
