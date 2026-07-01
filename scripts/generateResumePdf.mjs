import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '..', 'src', 'data', 'resumeData.json');
const publicOutputPath = path.join(__dirname, '..', 'public', 'Sachin_Bisht_Resume.pdf');
const downloadsOutputPath = path.join(process.env.HOME || process.env.USERPROFILE || '.', 'Downloads', 'Sachin_Bisht_Resume.pdf');

const resumeData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const { basics, work, education, projects, skills, certifications } = resumeData;

const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();
const margin = 40;
let y = 48;

const addLine = (text, size = 10, weight = 'normal', color = '#111111') => {
  pdf.setFont('helvetica', weight);
  pdf.setFontSize(size);
  pdf.setTextColor(color);
  const lines = pdf.splitTextToSize(text, pageWidth - margin * 2);
  pdf.text(lines, margin, y);
  y += lines.length * (size * 1.25);
};

const addSectionTitle = (title) => {
  if (y > pageHeight - 90) {
    pdf.addPage();
    y = 48;
  }
  pdf.setDrawColor(79, 70, 229);
  pdf.setLineWidth(1); 
  pdf.line(margin, y - 8, pageWidth - margin, y - 8);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(13);
  pdf.setTextColor(15, 23, 42);
  pdf.text(title, margin, y);
  y += 20;
};

pdf.setFillColor(248, 250, 252);
pdf.rect(0, 0, pageWidth, 120, 'F');

pdf.setFont('helvetica', 'bold');
pdf.setFontSize(22);
pdf.setTextColor(15, 23, 42);
pdf.text(basics.name, margin, 42);

pdf.setFont('helvetica', 'normal');
pdf.setFontSize(11);
pdf.setTextColor(79, 70, 229);
pdf.text(basics.label, margin, 64);

pdf.setFontSize(10);
pdf.setTextColor(71, 85, 105);
pdf.text(`${basics.phone} | ${basics.email}`, margin, 84);
pdf.text(`${basics.location} | Portfolio: ${'https://portfolio-blond-mu-82.vercel.app/'}`, margin, 102);

y = 132;

addSectionTitle('Profile');
addLine(basics.summary);

addSectionTitle('Professional Experience');
work.forEach((job) => {
  addLine(`${job.position} — ${job.company}`, 11, 'bold');
  addLine(`${job.location} | ${job.startDate} – ${job.endDate}`, 10, 'normal', '#475569');
  job.highlights.forEach((h) => addLine(`• ${h}`, 10, 'normal', '#334155'));
  y += 4;
});

addSectionTitle('Education');
education.forEach((edu) => {
  addLine(`${edu.studyType} in ${edu.area}`, 11, 'bold');
  addLine(`${edu.institution}, ${edu.location} | ${edu.startDate} – ${edu.endDate}`, 10, 'normal', '#475569');
  y += 4;
});

addSectionTitle('Projects');
projects.forEach((proj) => {
  addLine(`${proj.name} — ${proj.company || 'Personal Project'}`, 11, 'bold');
  addLine(`${proj.location} | ${proj.startDate} – ${proj.endDate}`, 10, 'normal', '#475569');
  proj.highlights.forEach((h) => addLine(`• ${h}`, 10, 'normal', '#334155'));
  y += 4;
});

addSectionTitle('Skills');
Object.entries(skills).forEach(([category, items]) => {
  addLine(`${category}: ${items.join(', ')}`, 10, 'normal', '#334155');
});

if (certifications?.length) {
  addSectionTitle('Certifications');
  certifications.forEach((cert) => {
    addLine(`${cert.name} — ${cert.issuer}`, 10, 'normal', '#334155');
  });
}

fs.mkdirSync(path.dirname(publicOutputPath), { recursive: true });
fs.writeFileSync(publicOutputPath, Buffer.from(pdf.output('arraybuffer')));
fs.mkdirSync(path.dirname(downloadsOutputPath), { recursive: true });
fs.writeFileSync(downloadsOutputPath, Buffer.from(pdf.output('arraybuffer')));
console.log(`Resume PDF created at ${publicOutputPath}`);
console.log(`Resume PDF copied to ${downloadsOutputPath}`);
