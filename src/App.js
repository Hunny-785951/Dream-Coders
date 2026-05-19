import './App.css';
import Welcome from "./pages/welcome";
import IntroSplash from "./pages/IntroSplash";
import EventPage from "./pages/EventPage";
import React, { useState } from 'react';

function App() {

  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('welcome');

  return (
    <div className="App">
      {showSplash && (
        <IntroSplash onComplete={() => setShowSplash(false)} />
      )}

      {!showSplash && currentPage === 'welcome' && <Welcome onNavigate={setCurrentPage} />}
      {!showSplash && currentPage === 'events' && <EventPage onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
