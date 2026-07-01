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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('print') !== '1') return;

    const timer = window.setTimeout(() => {
      window.print();
    }, 350);

    const handleAfterPrint = () => {
      window.close();
    };

    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
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
