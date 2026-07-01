# Sachin Bisht - Interactive Portfolio & Printable Resume

A premium, fast, and SEO-optimized portfolio and print-ready A4 resume. Created with React, Vite, and custom CSS variables, it uses a single source of truth (`src/data/resumeData.json`) to control both the interactive website and the downloadable PDF resume.

---

## Features

1. **Interactive Dark Portfolio**: Minimalist layout inspired by Framer web design aesthetics. Features subtle glows, glassmorphism, responsive navigation, hover animations, experience timeline, and project filters.
2. **Dynamic Data Model**: Everything from professional experience, project summaries, and education to contact links and tech skills is defined in `src/data/resumeData.json`. Modify this file, and both the website and printable resume update immediately.
3. **Print-optimized A4 Layout & PDF Download**: Clicking **Save as PDF** on the resume page formats the page into a clean, professional, black-and-white A4 layout using browser print stylesheet rules (`@media print`), ensuring clickable links, sharp vectors, and print margins.

---

## Getting Started

### 1. Run Locally
To start the local development server:
```bash
# Install dependencies (already completed)
npm install

# Start the dev server
npm run dev
```
Open the local server URL (usually `http://localhost:5173`) in your browser to view your interactive portfolio.

### 2. Edit Your Details
Open [resumeData.json](file:///C:/Users/ksach/.gemini/antigravity/scratch/sachin-portfolio-resume/src/data/resumeData.json) and modify details under basics, work experience, projects, skills, and certifications. Save the file, and your changes will hot-reload on the portfolio and print views.

### 3. Save as PDF / Print
1. Click the **PDF Resume** button in the floating navbar or hero actions.
2. In the print-ready view, click **Save as PDF**.
3. In the browser print dialog:
   - Destination: Set to **Save as PDF** or **Microsoft Print to PDF**.
   - Layout: **Portrait**
   - Paper Size: **A4**
   - Margin: **Default** or **None** (recommended for perfect edge alignments).
   - Headers and Footers: **Unchecked** (to prevent the browser from printing the URL and page number headers).
   - Background Graphics: **Checked** (optional, recommended to preserve list bullet points and structure formatting).

---

## Deployment Guide

Deploying this portfolio to the web for free is incredibly simple:

### Option A: Vercel (Recommended)
1. Push this folder to a new **GitHub repository**.
2. Go to [Vercel](https://vercel.com/) and sign up with your GitHub account.
3. Click **Add New** > **Project** and select your repository.
4. Vercel automatically detects Vite. Leave default configuration settings and click **Deploy**.
5. Your site is now live! Every time you update `resumeData.json` and push to GitHub, Vercel rebuilds and deploys your site in seconds.

### Option B: Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Select **Import from Git** or drag-and-drop the compiled `dist/` folder directly to the Netlify dashboard.

---

## Custom Domains & `.website`

* **What is a Custom Domain?** By default, Vercel gives you a URL like `sachin-portfolio.vercel.app`. You can buy a custom domain (e.g., `sachinbisht.website` or `sachinbisht.dev`) from a domain registrar like Namecheap or GoDaddy.
* **Adding to Vercel/Netlify**: In your project settings, go to the **Domains** section, enter your domain name, and configure your DNS settings (CNAME/A Records) to point to Vercel or Netlify as shown in their instructions.
