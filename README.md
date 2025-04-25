# my-portfolio

Modern portfolio site built with Next.js + TypeScript + Tailwind CSS + Framer Motion.

## Stack
- **Next.js** (React, SSG/ISR)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Vercel/GitHub Pages**

## Pages structure
- `/` — Home
- `/about` — About
- `/projects` — Projects
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

## Final UX review

- Check navigation, responsiveness, animations, accessibility.
- Test with Lighthouse (Ctrl+Shift+I → Lighthouse).

## Deploy

### Vercel (Primary)
- Connect your GitHub repository to Vercel for automatic deployments.
- No additional configuration needed, works out of the box.

### GitHub Pages
1. Install GitHub Pages dependency:
   ```
   npm install --save-dev gh-pages
   ```

2. Build and deploy to GitHub Pages:
   ```
   npm run deploy:gh-pages
   ```

3. Alternatively, use GitHub Actions workflow for automated deployments.

### Environment Variables
- `NEXT_PUBLIC_SITE_URL`: Your site's URL (different for each environment)
- `GITHUB_PAGES`: Set to 'true' when deploying to GitHub Pages
- `EXPORT`: Set to 'true' when creating static export

## License

This project is licensed under the MIT License.
