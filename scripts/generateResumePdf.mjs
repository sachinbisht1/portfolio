import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'resumeData.json');
const publicOutputPath = path.join(__dirname, '..', 'public', 'Sachin_Bisht_Resume.pdf');
const downloadsOutputPath = path.join(process.env.HOME || process.env.USERPROFILE || '.', 'Downloads', 'Sachin_Bisht_Resume.pdf');

const resumeData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const { basics, work, education, projects, skills, certifications } = resumeData;

// Build styled HTML matching the portfolio resume view
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      color: #000;
      background: #fff;
      line-height: 1.35;
    }
    .resume-container {
      width: 210mm;
      min-height: 297mm;
      padding: 12mm 15mm;
      background: #ffffff;
    }
    .resume-header {
      text-align: center;
      margin-bottom: 1rem;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    .resume-header h1 {
      font-family: 'Outfit', sans-serif;
      font-size: 21pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 0.1rem;
      letter-spacing: -0.5px;
    }
    .resume-subtitle {
      font-size: 11pt;
      font-weight: 600;
      color: #4f46e5;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }
    .resume-contact {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 8.5pt;
      color: #475569;
    }
    .resume-contact a {
      color: #4f46e5;
      text-decoration: none;
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
      margin-bottom: 0.15rem;
    }
    .resume-item-header-left {
      flex: 1;
    }
    .resume-item-header-right {
      text-align: right;
      white-space: nowrap;
      margin-left: 0.5rem;
    }
    .resume-item-header a {
      color: #4f46e5;
      font-weight: 600;
      text-decoration: none;
    }
    .resume-item-subheader {
      font-size: 8.5pt;
      color: #64748b;
      font-style: italic;
      margin-bottom: 0.15rem;
    }
    .resume-bullets {
      margin-left: 1.2rem;
      list-style-type: disc;
      padding-left: 0;
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
    .resume-skill-row {
      margin-bottom: 4pt;
    }
    .resume-skill-row strong {
      color: #0f172a;
      min-width: 140px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <header class="resume-header">
      <h1>${basics.name}</h1>
      <div class="resume-subtitle">${basics.label}</div>
      <div class="resume-contact">
        <span>${basics.phone}</span>
        <span>${basics.email}</span>
        <a href="https://portfolio-blond-mu-82.vercel.app/" target="_blank">Portfolio</a>
        <span>${basics.location}</span>
      </div>
    </header>

    <section class="resume-section">
      <h2 class="resume-section-title">Profile</h2>
      <p class="resume-summary-text">${basics.summary}</p>
    </section>

    <section class="resume-section">
      <h2 class="resume-section-title">Professional Experience</h2>
      ${work.map(job => `
        <div class="resume-item">
          <div class="resume-item-header">
            <div class="resume-item-header-left">${job.position}, <a href="#">${job.company}</a></div>
            <div class="resume-item-header-right">${job.startDate} – ${job.endDate}</div>
          </div>
          <div class="resume-item-subheader">${job.location}</div>
          <ul class="resume-bullets">
            ${job.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <section class="resume-section">
      <h2 class="resume-section-title">Education</h2>
      ${education.map(edu => `
        <div class="resume-item">
          <div class="resume-item-header">
            <div class="resume-item-header-left">${edu.studyType} in ${edu.area}</div>
            <div class="resume-item-header-right">${edu.startDate} - ${edu.endDate}</div>
          </div>
          <div class="resume-item-subheader">${edu.institution}, ${edu.location}</div>
        </div>
      `).join('')}
    </section>

    <section class="resume-section">
      <h2 class="resume-section-title">Projects</h2>
      ${projects.map(proj => `
        <div class="resume-item">
          <div class="resume-item-header">
            <div class="resume-item-header-left">${proj.name} ${proj.company ? `(${proj.company})` : ''}</div>
            <div class="resume-item-header-right">${proj.startDate} - ${proj.endDate}</div>
          </div>
          <div class="resume-item-subheader">${proj.location}</div>
          <ul class="resume-bullets">
            ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </section>

    <section class="resume-section">
      <h2 class="resume-section-title">Skills</h2>
      <div class="resume-skills-grid">
        ${Object.entries(skills).map(([category, items]) => `
          <div class="resume-skill-row">
            <strong>${category}:</strong> ${items.join(', ')}
          </div>
        `).join('')}
      </div>
    </section>

    ${certifications && certifications.length > 0 ? `
      <section class="resume-section">
        <h2 class="resume-section-title">Online Courses & Certifications</h2>
        <ul class="resume-bullets">
          ${certifications.map(cert => `
            <li>${cert.name} - <strong>${cert.issuer}</strong></li>
          `).join('')}
        </ul>
      </section>
    ` : ''}
  </div>
</body>
</html>
`;

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle2' });
    
    fs.mkdirSync(path.dirname(publicOutputPath), { recursive: true });
    fs.mkdirSync(path.dirname(downloadsOutputPath), { recursive: true });
    
    await page.pdf({
      path: publicOutputPath,
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    await page.pdf({
      path: downloadsOutputPath,
      format: 'A4',
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    await browser.close();
    console.log(`Resume PDF created at ${publicOutputPath}`);
    console.log(`Resume PDF copied to ${downloadsOutputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();

