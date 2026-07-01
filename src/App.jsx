import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import PrintableResume from './components/PrintableResume';

function App() {
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'resume') return 'resume';
    }
    return 'portfolio';
  });

  // Scroll to top whenever the view mode changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  return (
    <div className="app-container">
      {viewMode === 'portfolio' ? (
        <Portfolio setViewMode={setViewMode} />
      ) : (
        <PrintableResume setViewMode={setViewMode} />
      )}
    </div>
  );
}

export default App;
