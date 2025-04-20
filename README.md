# my-portfolio

Modern portfolio site built with Next.js + TypeScript + Tailwind CSS + Framer Motion.

## Stack
- **Next.js** (React, SSG/ISR)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Netlify CMS** (Git‑based)
- **Vercel/Netlify** (CI/CD, hosting)

## Pages structure
- `/` — Home
- `/about` — About
- `/skills` — Skills
- `/projects` — Projects
- `/blog` — Blog/Certificates
- `/resume` — Resume
- `/contact` — Contact

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-login/my-portfolio.git
   ```

2. Go to the project directory:
   ```
   cd my-portfolio
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

- `public/`: Static files (images, icons, etc).
- `src/`: Application source code.
  - `components/`: UI components.
  - `pages/`: Application pages.
  - `styles/`: Global styles.
  - `utils/`: Markdown and CMS utilities.
  - `types/`: Types and interfaces.
  - `config/`: Configuration files.

## CMS

- Content is edited manually via Markdown files in the `content/` folder.
- No visual admin, all changes via git.

## Sitemap and robots.txt

- Generated automatically via `next-sitemap`.

## Final UX review

- Check navigation, responsiveness, animations, accessibility.
- Test with Lighthouse (Ctrl+Shift+I → Lighthouse).
- Check CMS and contact form.

## Deploy

- Recommended: Vercel or Netlify.
- For Netlify: build command — `npm run build`, publish directory — `.next` or `out`.
- For Vercel: just connect the repo, works out of the box.

## Contribution

If you want to contribute, please fork the repo and submit a pull request with your changes.

## License

This project is licensed under the MIT License.