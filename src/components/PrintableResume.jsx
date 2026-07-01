import React from 'react';
import resumeData from '../data/resumeData.json';

const PrintableResume = ({ setViewMode }) => {
  const { basics, work, education, projects, skills, certifications } = resumeData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-page-wrapper">
      {/* Control bar, only visible on screen, hidden in print PDF */}
      <div className="no-print print-control-bar">
        <div className="control-bar-content">
          <button onClick={() => setViewMode('portfolio')} className="btn btn-secondary" style={{padding: '0.4rem 1.2rem', fontSize: '0.85rem', color: '#fff', border: '1px solid rgba(255,255,255,0.2)'}}>
            ← Back to Portfolio
          </button>
          <p className="control-bar-text">Print-ready A4 View. Use standard print setup to download as PDF.</p>
          <button onClick={handlePrint} className="btn btn-primary btn-print" style={{padding: '0.4rem 1.2rem', fontSize: '0.85rem'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Save as PDF
          </button>
        </div>
      </div>

      {/* Main A4 Printable Area */}
      <div className="print-resume-container">
        {/* Header Section */}
        <header className="resume-header">
          <h1>{basics.name}</h1>
          <div className="resume-subtitle">{basics.label}</div>
          <div className="resume-contact">
            {basics.phone && (
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', verticalAlign: 'middle' }}><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.57a1 1 0 0 0-1.01.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.2a1 1 0 0 0 .24-1.01 11.48 11.48 0 0 1-.57-3.53A1 1 0 0 0 7.36 4H4a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.62a1 1 0 0 0-1-1z"/></svg>
                {basics.phone}
              </span>
            )}
            {basics.linkedin && (
              <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}
            {basics.github && (
              <a href={basics.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ display: 'inline-flex', alignItems: 'center', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle' }}><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {basics.email && (
              <a href={`mailto:${basics.email}`} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {basics.email}
              </a>
            )}
          </div>
        </header>

        {/* Profile Summary */}
        <section className="resume-section">
          <h2 className="resume-section-title">Profile</h2>
          <p className="resume-summary-text">{basics.summary}</p>
        </section>

        {/* Professional Experience */}
        <section className="resume-section">
          <h2 className="resume-section-title">Professional Experience</h2>
          {work.map((job, idx) => (
            <div key={idx} className="resume-item">
              <div className="resume-item-header">
                <span>{job.position}, <a href="#" style={{textDecoration: 'none'}}>{job.company}</a></span>
                <span>{job.startDate} – {job.endDate}</span>
              </div>
              <div className="resume-item-subheader">
                <span>{job.location}</span>
              </div>
              <ul className="resume-bullets">
                {job.highlights.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="resume-item">
              <div className="resume-item-header">
                <span>{edu.studyType} in {edu.area}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="resume-item-subheader">
                <span>{edu.institution}, {edu.location}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="resume-section">
          <h2 className="resume-section-title">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="resume-item">
              <div className="resume-item-header">
                <span>{proj.name} {proj.company ? `(${proj.company})` : ''}</span>
                <span>{proj.startDate} - {proj.endDate}</span>
              </div>
              <div className="resume-item-subheader">
                <span>{proj.location}</span>
              </div>
              <ul className="resume-bullets">
                {proj.highlights.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <div className="resume-skills-grid">
            {Object.entries(skills).map(([category, items], idx) => (
              <div key={idx} className="resume-skill-row" style={{marginBottom: '4pt'}}>
                <strong>{category}:</strong> {items.join(', ')}
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Online Courses & Certifications</h2>
            <ul className="resume-bullets">
              {certifications.map((cert, idx) => (
                <li key={idx}>
                  {cert.name} - <strong>{cert.issuer}</strong>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <style>{`
        .resume-page-wrapper {
          min-height: 100vh;
          background: #111;
          padding-bottom: 3rem;
        }

        .print-control-bar {
          background: rgba(20, 20, 25, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
        }

        .control-bar-content {
          max-width: 800px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ccc;
          font-size: 0.9rem;
        }

        .btn-print {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
          color: #fff;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          border: none;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
          transition: all 0.2s ease;
        }

        .btn-print:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
        }

        /* Screen representation of A4 sheet */
        .print-resume-container {
          background: #ffffff;
          color: #000000;
          width: 210mm;
          min-height: 297mm;
          margin: 2rem auto;
          padding: 12mm 15mm;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border-radius: 4px;
          font-family: 'Inter', sans-serif;
          line-height: 1.35;
          box-sizing: border-box;
        }

        .resume-header h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 21pt;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.1rem;
          text-align: center;
          letter-spacing: -0.5px;
        }

        .resume-subtitle {
          font-size: 11pt;
          font-weight: 600;
          color: #4f46e5;
          text-align: center;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .resume-contact {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.2rem;
          font-size: 8.5pt;
          color: #475569;
          margin-bottom: 1rem;
          border-bottom: 1.5px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }

        .resume-contact span {
          display: inline-flex;
          align-items: center;
        }

        .resume-contact a {
          color: #475569;
          text-decoration: none;
        }

        .resume-contact a:hover {
          color: #4f46e5;
          text-decoration: underline;
        }

        .resume-section {
          margin-bottom: 0.8rem;
        }

        .resume-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 10pt;
          font-weight: 700;
          text-transform: uppercase;
          color: #0f172a;
          border-bottom: 1.5px solid #0f172a;
          margin-bottom: 0.4rem;
          padding-bottom: 2px;
          letter-spacing: 0.5px;
        }

        .resume-summary-text {
          font-size: 8.8pt;
          color: #334155;
          line-height: 1.4;
        }

        .resume-item {
          margin-bottom: 0.5rem;
        }

        .resume-item-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-weight: 700;
          font-size: 9.2pt;
          color: #0f172a;
        }

        .resume-item-header a {
          color: #4f46e5;
          font-weight: 600;
        }

        .resume-item-subheader {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 8.5pt;
          color: #64748b;
          font-style: italic;
          margin-bottom: 0.15rem;
        }

        .resume-bullets {
          margin-left: 1.2rem;
          list-style-type: disc;
        }

        .resume-bullets li {
          font-size: 8.8pt;
          color: #334155;
          margin-bottom: 0.1rem;
          line-height: 1.35;
        }

        .resume-skills-grid {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 8.8pt;
          color: #334155;
        }

        .resume-skill-row strong {
          color: #0f172a;
          min-width: 140px;
          display: inline-block;
        }

        /* Print media layout overrides */
        @media print {
          .no-print {
            display: none !important;
          }
          
          .resume-page-wrapper {
            background: #ffffff !important;
            padding: 0 !important;
            min-height: auto !important;
          }
          
          .print-resume-container {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 8mm 12mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            line-height: 1.3 !important;
          }

          .resume-header h1 {
            font-size: 18pt !important;
            margin-bottom: 1px !important;
          }

          .resume-subtitle {
            font-size: 9.5pt !important;
            margin-bottom: 3px !important;
          }

          .resume-contact {
            font-size: 8pt !important;
            margin-bottom: 8px !important;
            padding-bottom: 3px !important;
            gap: 12px !important;
          }

          .resume-section {
            margin-bottom: 6px !important;
          }

          .resume-section-title {
            font-size: 9pt !important;
            margin-bottom: 3px !important;
            padding-bottom: 1px !important;
          }

          .resume-summary-text {
            font-size: 8.2pt !important;
          }

          .resume-item {
            margin-bottom: 3px !important;
          }

          .resume-item-header {
            font-size: 8.5pt !important;
          }

          .resume-item-subheader {
            font-size: 8pt !important;
            margin-bottom: 1px !important;
          }

          .resume-bullets {
            margin-left: 10px !important;
          }

          .resume-bullets li {
            font-size: 8.2pt !important;
            margin-bottom: 0.5px !important;
            line-height: 1.25 !important;
          }

          .resume-skills-grid {
            gap: 1px !important;
            font-size: 8.2pt !important;
          }

          .resume-skill-row {
            margin-bottom: 0.5px !important;
          }

          .resume-skill-row strong {
            min-width: 130px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableResume;
