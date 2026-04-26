import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Uvoženje stranica
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse'; // 1. Dodat import za Edit stranicu

function App() {
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

          {/* 2. Dodata ruta za izmenu kursa (PUT operacija bonus) */}
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
