import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { Pizzeria } from './pages/Pizzeria';
import { MesCommandes } from './pages/MesCommandes';
import { Legal } from './pages/Legal';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { ProtectedRoute } from './components/ProtectedRoute';
import { initializeRealtime } from './lib/sync';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  useEffect(() => {
    const cleanup = initializeRealtime();
    return () => cleanup();
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Router>
        <div className="min-h-screen bg-primary-50 flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mes-commandes"
                element={
                  <ProtectedRoute role="client">
                    <MesCommandes />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute role="admin">
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pizzeria/*"
                element={
                  <ProtectedRoute role="pizzeria">
                    <Pizzeria />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </SessionContextProvider>
  );
}

export default App;