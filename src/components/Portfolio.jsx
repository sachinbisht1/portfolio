import React, { useState, useEffect } from 'react';
import resumeData from '../data/resumeData.json';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Brain, 
  Cpu, 
  Database, 
  Mail, 
  Phone, 
  ExternalLink, 
  Eye, 
  Layers, 
  Map, 
  Terminal, 
  FileText,
  Send,
  ArrowRight
} from 'lucide-react';

const Portfolio = ({ setViewMode }) => {
  const { basics, work, education, projects, skills } = resumeData;
  const [activeSection, setActiveSection] = useState('hero');

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'projects', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map skill categories to Lucide icons
  const getSkillIcon = (category) => {
    switch (category) {
      case 'Programming':
        return <Code2 className="skill-cat-icon text-indigo" />;
      case 'Libraries & Frameworks':
        return <Layers className="skill-cat-icon text-purple" />;
      case 'Database & Cloud':
        return <Database className="skill-cat-icon text-indigo" />;
      case 'ML & Vision':
        return <Eye className="skill-cat-icon text-purple" />;
      case 'Automation':
        return <Cpu className="skill-cat-icon text-indigo" />;
      case 'Backend & System':
        return <Terminal className="skill-cat-icon text-purple" />;
      default:
        return <Brain className="skill-cat-icon" />;
    }
  };

  // Map projects to icons dynamically
  const getProjectIcon = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('3d') || lowerName.includes('stitching') || lowerName.includes('image')) {
      return <Layers className="proj-icon text-purple" />;
    }
    if (lowerName.includes('drone') || lowerName.includes('mapping')) {
      return <Map className="proj-icon text-indigo" />;
    }
    if (lowerName.includes('table') || lowerName.includes('extraction')) {
      return <Database className="proj-icon text-purple" />;
    }
    if (lowerName.includes('backend') || lowerName.includes('api')) {
      return <Terminal className="proj-icon text-indigo" />;
    }
    return <Brain className="proj-icon text-indigo" />;
  };

  return (
    <div className="portfolio-wrapper">
      {/* Glow Effects */}
      <div className="glow-bg glow-indigo"></div>
      <div className="glow-bg glow-purple"></div>

      {/* Floating Navbar */}
      <nav className="portfolio-nav glass">
        <div className="nav-container">
          <a href="#hero" className="nav-logo">
            <span className="logo-accent">SB.</span>
          </a>
          <ul className="nav-links">
            <li><a href="#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
          <button onClick={() => setViewMode('resume')} className="nav-resume-btn btn-glow">
            <FileText size={16} style={{ marginRight: '6px' }} />
            <span>PDF Resume</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section container">
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-title animate-slide-up">
            Hi, I'm <span className="text-gradient">{basics.name}</span>
          </h1>
          <h2 className="hero-subtitle animate-slide-up delay-1">
            Building scalable pipelines for <span className="highlight-text">drone mapping</span>, 3D reconstruction & backend systems.
          </h2>
          <p className="hero-desc animate-slide-up delay-2">
            {basics.summary}
          </p>
          <div className="hero-actions animate-slide-up delay-3">
            <a href="#projects" className="btn btn-primary">
              View Work <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </a>
            <button onClick={() => setViewMode('resume')} className="btn btn-secondary">
              Printable Resume
            </button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience-section container">
        <div className="section-header">
          <div className="section-badge">Career</div>
          <h2 className="section-title">Work Experience</h2>
        </div>

        <div className="timeline">
          {work.map((job, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot">
                <Briefcase size={16} />
              </div>
              <div className="timeline-content glass-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="job-role">{job.position}</h3>
                    <h4 className="job-company text-gradient">{job.company}</h4>
                  </div>
                  <div className="job-meta">
                    <span className="job-date">{job.startDate} – {job.endDate}</span>
                    <span className="job-loc">{job.location}</span>
                  </div>
                </div>
                <ul className="job-highlights">
                  {job.highlights.map((highlight, hIdx) => (
                    <li key={hIdx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section container">
        <div className="section-header">
          <div className="section-badge">Portfolio</div>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <div key={idx} className="project-card glass-card">
              <div className="project-card-header">
                {getProjectIcon(proj.name)}
                <span className="project-date">{proj.startDate}</span>
              </div>
              <h3 className="project-name">{proj.name}</h3>
              <p className="project-company">{proj.company || 'Personal Project'}</p>
              <ul className="project-highlights">
                {proj.highlights.map((highlight, hIdx) => (
                  <li key={hIdx}>{highlight}</li>
                ))}
              </ul>
              <div className="project-footer">
                <span className="project-loc-tag">{proj.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills-section container">
        <div className="section-header">
          <div className="section-badge">Expertise</div>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid">
          {Object.entries(skills).map(([category, items], idx) => (
            <div key={idx} className="skills-card glass-card">
              <div className="skills-card-header">
                {getSkillIcon(category)}
                <h3>{category}</h3>
              </div>
              <div className="skills-list">
                {items.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Sub-card */}
        <div className="education-grid">
          <div className="edu-card glass-card">
            <div className="edu-header">
              <GraduationCap className="edu-icon text-indigo" />
              <div>
                <h3>Education</h3>
                <p>Academic Foundation</p>
              </div>
            </div>
            {education.map((edu, idx) => (
              <div key={idx} className="edu-details">
                <h4>{edu.studyType} in {edu.area}</h4>
                <p className="edu-inst">{edu.institution} | {edu.location}</p>
                <span className="edu-date">{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section container">
        <div className="contact-card glass-card">
          <div className="contact-info">
            <div className="section-badge">Get In Touch</div>
            <h2 className="contact-title">Let's build something epic.</h2>
            <p className="contact-desc">
              Have a pipeline to build, a 3D mapping project, or looking for a backend architect? Drop me a message or let's connect online.
            </p>
            <div className="contact-details-list">
              <a href={`mailto:${basics.email}`} className="contact-detail-item">
                <Mail size={18} />
                <span>{basics.email}</span>
              </a>
              <div className="contact-detail-item">
                <Phone size={18} />
                <span>{basics.phone}</span>
              </div>
            </div>
            <div className="contact-socials">
              <a href={basics.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href={basics.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <p>© {new Date().getFullYear()} {basics.name}. All rights reserved.</p>
        <p className="footer-meta">Built with React & Vanilla CSS. Editable via JSON.</p>
      </footer>

      {/* Inline styles for Portfolio.jsx to maintain modularity & premium Framer aesthetic */}
      <style>{`
        .portfolio-wrapper {
          position: relative;
          background-color: var(--bg-primary);
          color: var(--text-primary);
          min-height: 100vh;
          overflow: hidden;
          padding-top: 80px;
        }

        /* --- Navigation --- */
        .portfolio-nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 40px);
          max-width: 900px;
          height: 60px;
          border-radius: var(--radius-full);
          z-index: 1000;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .logo-accent {
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-links {
          display: flex;
          gap: 1.8rem;
        }

        .nav-links a {
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          position: relative;
          padding: 5px 0;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--text-primary);
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transition: var(--transition-smooth);
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        .nav-resume-btn {
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          color: #fff;
          font-weight: 600;
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          transition: var(--transition-smooth);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
        }

        .nav-resume-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        /* --- Hero Section --- */
        .hero-section {
          min-height: calc(85vh - 80px);
          display: flex;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          max-width: 800px;
          text-align: left;
        }

        .hero-badge {
          display: inline-flex;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          color: #818cf8;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 7vw, 4.8rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 1rem;
        }

        .hero-subtitle {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3.5vw, 2.2rem);
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.3;
          margin-bottom: 1.5rem;
        }

        .highlight-text {
          color: var(--text-primary);
          border-bottom: 3px solid var(--accent-primary);
        }

        .hero-desc {
          color: var(--text-secondary);
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.6;
          margin-bottom: 2.5rem;
          max-width: 650px;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
        }

        /* --- Buttons --- */
        .btn {
          display: inline-flex;
          align-items: center;
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.8rem 1.6rem;
          border-radius: var(--radius-md);
          transition: var(--transition-smooth);
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          color: #fff;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(99, 102, 241, 0.55);
        }

        .btn-secondary {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
        }

        .btn-secondary:hover {
          background: var(--bg-tertiary);
          border-color: var(--border-hover);
          transform: translateY(-2px);
        }

        /* --- Section Styling --- */
        .section-header {
          margin-bottom: 3.5rem;
        }

        .section-badge {
          display: inline-block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent-primary);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -1px;
        }

        .experience-section,
        .projects-section,
        .skills-section,
        .contact-section {
          padding-top: 6rem;
          padding-bottom: 6rem;
        }

        /* --- Timeline --- */
        .timeline {
          position: relative;
          border-left: 2px solid var(--border-color);
          margin-left: 10px;
          padding-left: 30px;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .timeline-item {
          position: relative;
        }

        .timeline-dot {
          position: absolute;
          left: -40px;
          top: 20px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 2px solid var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.8rem;
        }

        .job-role {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
        }

        .job-company {
          font-size: 1.05rem;
          font-weight: 700;
          margin-top: 0.2rem;
        }

        .job-meta {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          font-size: 0.85rem;
        }

        .job-date {
          color: var(--text-primary);
          font-weight: 600;
        }

        .job-loc {
          color: var(--text-secondary);
        }

        .job-highlights {
          list-style-type: none;
        }

        .job-highlights li {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          position: relative;
          padding-left: 1.2rem;
          margin-bottom: 0.8rem;
        }

        .job-highlights li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }

        /* --- Projects Grid --- */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .proj-icon {
          width: 32px;
          height: 32px;
          padding: 6px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
        }

        .project-date {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .project-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.3;
          margin-bottom: 0.3rem;
        }

        .project-company {
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .project-highlights {
          list-style: none;
          flex-grow: 1;
          margin-bottom: 1.5rem;
        }

        .project-highlights li {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 0.6rem;
          position: relative;
          padding-left: 1rem;
        }

        .project-highlights li::before {
          content: '•';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }

        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 0.8rem;
          margin-top: auto;
        }

        .project-loc-tag {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          background: rgba(255, 255, 255, 0.03);
          padding: 2px 8px;
          border-radius: 4px;
        }

        /* --- Skills Section --- */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .skills-card {
          padding: 1.8rem;
        }

        .skills-card-header {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.6rem;
        }

        .skills-card-header h3 {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
        }

        .skill-cat-icon {
          width: 20px;
          height: 20px;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .skill-tag {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 4px 10px;
          border-radius: 6px;
          transition: var(--transition-fast);
        }

        .skill-tag:hover {
          color: var(--text-primary);
          border-color: var(--accent-primary);
          background: rgba(99, 102, 241, 0.05);
        }

        /* --- Education --- */
        .education-grid {
          max-width: 600px;
          margin: 0 auto;
        }

        .edu-card {
          padding: 2rem;
        }

        .edu-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .edu-header h3 {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 600;
        }

        .edu-header p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .edu-icon {
          width: 28px;
          height: 28px;
        }

        .edu-details h4 {
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .edu-inst {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0.2rem;
        }

        .edu-date {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        /* --- Contact --- */
        .contact-card {
          padding: 4rem 2rem;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .contact-info {
          max-width: 500px;
          margin: 0 auto;
        }

        .contact-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          letter-spacing: -1px;
          margin-top: 0.8rem;
          margin-bottom: 1rem;
        }

        .contact-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .contact-details-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        .contact-detail-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 1.05rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .contact-detail-item:hover {
          color: var(--accent-primary);
        }

        .contact-socials {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .social-icon-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .social-icon-btn:hover {
          background: var(--accent-primary);
          color: #fff;
          border-color: var(--accent-primary);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
        }

        /* --- Footer --- */
        .portfolio-footer {
          text-align: center;
          padding: 3rem 2rem;
          border-top: 1px solid var(--border-color);
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .footer-meta {
          margin-top: 0.5rem;
          font-size: 0.75rem;
        }

        /* --- Neon Helper Classes --- */
        .text-indigo { color: var(--accent-primary) !important; }
        .text-purple { color: var(--accent-secondary) !important; }

        /* --- Responsive Tweaks --- */
        @media (max-width: 768px) {
          .portfolio-nav {
            top: 10px;
            padding: 0 1rem;
          }
          .nav-links {
            display: none;
          }
          .timeline-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .job-meta {
            text-align: left;
          }
          .hero-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
