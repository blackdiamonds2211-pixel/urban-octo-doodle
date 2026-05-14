import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Uvoženje stranica
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';

function App() {
  // Kontrolišemo pozadinu tela (body) direktno preko React-a za mekan i prijatan izgled
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    document.body.style.color = "#f8fafc";
    
    // Linearni prelaz iz opuštajuće plavo-sive u duboku ponoćnu nijansu pod uglom od 135 stepeni
    document.body.style.background = "linear-gradient(135deg, #0f172a 0%, #020617 100%)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.webkitFontSmoothing = "antialiased";
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Javna ruta - svako može da vidi Login */}
          <Route path="/login" element={<Login />} />

          {/* Zaštićene rute - moraš biti ulogovan da bi im pristupio */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/add" 
            element={
              <ProtectedRoute>
                <AddCourse />
              </ProtectedRoute>
            } 
          />

          {/* Ruta za izmenu kursa */}
          <Route 
            path="/edit/:id" 
            element={
              <ProtectedRoute>
                <EditCourse />
              </ProtectedRoute>
            } 
          />

          {/* Ako korisnik ukuca bilo šta drugo, vrati ga na početnu */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
