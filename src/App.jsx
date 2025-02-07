import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './component/header';
import Footer from './component/footer';

const App = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAiPage = location.pathname === '/ai';
  const isAdminPage = location.pathname === '/admin';

  return (
    <div>
      {!isAdminPage && <Header />}
      <main>
        {children}
      </main>
      {!isHomePage && !isAiPage && !isAdminPage && <Footer />}
    </div>
  );
};

export default App; 