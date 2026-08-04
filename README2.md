# Exam Result 2026 – Secure Result Viewer

A clean, professional, fully static exam result portal built with pure HTML, CSS and JavaScript.  
Works perfectly on **GitHub Pages** – no backend, no build tools, no dependencies.

---

## Features

- Responsive (mobile-first) design
- Professional blue & white theme
- Canvas-based CAPTCHA (noise + strike lines, never plain text)
- Case-sensitive 6-character CAPTCHA
- Refresh button for new CAPTCHA
- Green submit button with loading spinner
- 2-second loading animation before opening the PDF
- Soft shadows, rounded corners, smooth animations
- Fully accessible and keyboard-friendly

---

## Folder Structure

```
ExamResultPortal/
│
├── index.html          # Main page
├── style.css           # All styles
├── script.js           # Form logic & interactions
├── captcha.js          # CAPTCHA generation & validation
├── result.pdf          # Your result file (replace this)
├── README.md           # This file
└── assets/
      ├── logo.png      # Portal logo
      └── (spinner is pure CSS – no GIF needed)
```

---

## How to Deploy on GitHub Pages

### 1. Create a new GitHub repository
- Go to [github.com/new](https://github.com/new)
- Name it anything you like (example: `exam-result-2026`)
- Keep it **Public**
- Do **not** initialize with README (we already have one)

### 2. Upload the files
You can either:

**Option A – Drag & Drop (easiest)**
1. Open the repository page
2. Click **Add file → Upload files**
3. Drag the entire contents of the `ExamResultPortal` folder
4. Commit the changes

**Option B – Git CLI**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
# copy all files from ExamResultPortal into this folder
git add .
git commit -m "Initial commit - Exam Result Portal"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select:
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
3. Click **Save**
4. Wait 30–60 seconds
5. Your site will be live at:  
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

---

## How to Replace the Result PDF

1. Prepare your actual result PDF
2. Rename it exactly to **`result.pdf`**
3. Replace the existing `result.pdf` in the root of the repository
4. Commit and push the change
5. The website will automatically serve the new PDF

---

## How to Update the Logo

1. Prepare a square PNG image (recommended size: 200×200 px or larger)
2. Name it **`logo.png`**
3. Replace the file inside the `assets/` folder
4. Commit and push

---

## Customization Tips

| What you want to change          | File to edit     | Notes                                      |
|----------------------------------|------------------|--------------------------------------------|
| Title / Subtitle                 | `index.html`     | Look for the `<h1>` and `.subtitle`        |
| Colors                           | `style.css`      | Edit the CSS variables at the top (`:root`)|
| CAPTCHA length / characters      | `captcha.js`     | Change `LENGTH` or `CHARSET`               |
| Loading delay                    | `script.js`      | Change the `2000` (milliseconds) value     |
| Footer text                      | `index.html`     | Bottom of the file                         |

---

## Browser Support

Works on all modern browsers:
- Chrome, Edge, Firefox, Safari
- Mobile browsers (iOS Safari, Chrome Android)

---

## License

Free to use and modify for any personal or commercial project.

---

© 2026 Exam Result Portal
