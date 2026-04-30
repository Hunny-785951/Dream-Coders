
import './App.css';
import Welcome from "./pages/welcome";
import IntroSplash from "./pages/IntroSplash";
import React, { useState } from 'react';

function App() {

  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="App">
      {showSplash && (
        <IntroSplash onComplete={() => setShowSplash(false)} />
      )}

      <Welcome />
    </div>
  );
}

export default App;
