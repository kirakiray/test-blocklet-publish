import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@arcblock/ux/lib/Theme';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';
import Header from '@blocklet/ui-react/lib/Header';

import './app.css';
import Home from './pages/home';
import About from './pages/about';
import InvitePage from './pages/invite';
import AdminPage from './pages/admin';
import OwnerPage from './pages/owner';

const { SessionProvider } = createAuthServiceSessionContext();
const theme = createTheme();

function App() {
  const [role, setRole] = useState();

  const getRole = () => {
    fetch('api/user')
      .then((e) => e.json())
      .then((e) => {
        setRole(e.role);
      });
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Header />
        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home role={role} />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home role={role} />} />
            {/* 本来是通过role限制路由的，这里偷懒不做 */}
            <Route path="/invite" element={<InvitePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/owner" element={<OwnerPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
