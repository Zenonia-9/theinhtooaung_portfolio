# Thein Htoo Aung Portfolio

![Astro](https://img.shields.io/badge/Astro-5.18.1-FF5A03?style=flat-square)
![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-22C55E?style=flat-square)
![License: CC BY 4.0](https://img.shields.io/badge/License-CC--BY--4.0-lightgrey?style=flat-square)

Personal portfolio website built with Astro, React, and Tailwind CSS.

Showcases projects, professional experience, and technical skills as an Odoo Developer and Python Backend Engineer.

---

## Live Demo

https://theinhtooaung.vercel.app

---

## Highlights

- Modern responsive portfolio with dark/light theme support
- Astro 5 static generation for excellent performance
- Interactive UI with typing animation and smooth transitions
- Project showcase with filters and galleries
- MDX content workflow
- SEO optimization
- Accessibility support
- Responsive multi-page architecture

---

## Tech Stack

- Framework → Astro 5
- UI → React 19
- Styling → Tailwind CSS 3
- Animation → Framer Motion
- Icons → Lucide React
- Content → MDX
- Deployment → Vercel

---

## Project Structure

```txt
theinhtooaung_portfolio/

public/
 ├── projects/
 ├── favicon/
 └── Thein-Htoo-Aung-CV.pdf

src/
 ├── assets/
 ├── components/
 │    ├── home/
 │    ├── layout/
 │    ├── projects/
 │    └── ui/
 ├── content/
 │    ├── projects/
 │    └── config.ts
 ├── layouts/
 ├── pages/
 └── styles/

astro.config.mjs
tailwind.config.mjs
package.json
```

---

## Getting Started

### Requirements

- Node.js 22.12+

### Install

```bash
git clone https://github.com/Zenonia-9/theinhtooaung_portfolio.git

cd theinhtooaung_portfolio

npm install

npm run dev
```

Open:

```txt
http://localhost:4321
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Content Management

Projects live inside:

```txt
src/content/projects/
```

Example:

```mdx
---
title: "Project Title"
slug: "project-slug"

published: true
featured: true

status: "Completed"

category: "ERP"

year: 2026

cover: "/projects/demo.jpg"

stack:
 - Astro
 - React

summary: "Summary"

screenshots:
 - src: "/demo.jpg"
   title: "Home"
---
```

---

## Customization

### Theme

Edit:

```txt
src/styles/global.css
```

Example:

```css
:root {
  --color-primary: #22c55e;
  --color-secondary: #f97316;
}
```

### Navigation

Edit:

```txt
src/components/layout/Navbar.astro
src/components/layout/MobileMenu.jsx
```

---

## Pages

| Route | Description |
|---|---|
| / | Homepage |
| /projects | Project gallery |
| /projects/[slug] | Project details |
| /about | About |
| /experience | Timeline |
| /skills | Skills |
| /contact | Contact |

---

## Reusing This Design

You may use this project as:

- Portfolio template
- Starter project
- Learning resource
- Modified derivative

Recommended:

- Keep visible attribution
- Link back to original
- Mention major changes

Suggested attribution:

```txt
Design based on original work by Thein Htoo Aung

https://theinhtooaung.vercel.app
```

Attribution may appear in:

- Footer
- README
- About page
- Credits section

---

## License

Creative Commons Attribution 4.0 International

(CC BY 4.0)

You are free to:

✔ Share  
✔ Modify  
✔ Redistribute  
✔ Commercial Use  

Condition:

✔ Attribution

Official License:

https://creativecommons.org/licenses/by/4.0/

Legal Code:

https://creativecommons.org/licenses/by/4.0/legalcode

---

## Author

Thein Htoo Aung

Odoo Developer  
Python Backend Engineer

GitHub  
https://github.com/Zenonia-9

LinkedIn  
https://www.linkedin.com/in/thein-htoo-aung

Portfolio  
https://theinhtooaung.vercel.app

---

Licensed under CC BY 4.0

Design based on original work by Thein Htoo Aung

https://theinhtooaung.vercel.app
