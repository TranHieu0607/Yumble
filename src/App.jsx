// App.jsx
import React from 'react';
import Header from './component/header';
import Footer from './component/footer';


const App = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default App;