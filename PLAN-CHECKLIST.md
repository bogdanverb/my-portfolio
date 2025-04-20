# Чек‑лист реализации плана портфолио‑сайта

## Фаза 0. Архитектура и стек

- [x] **Next.js** (React, SSG/ISR, TypeScript)
- [x] **Tailwind CSS** + **Framer Motion**
- [x] **Netlify CMS** (Git‑based, Markdown)
- [x] **Vercel/Netlify** для деплоя
- [x] Репозиторий на GitHub

## Фаза 1. Инициализация проекта

- [x] Next.js‑проект с TypeScript (`npx create-next-app@latest my-portfolio --typescript`)
- [x] Tailwind CSS, Framer Motion установлены и настроены
- [x] Базовый layout: Header, Footer, `<main>`, глобальные стили Tailwind

## Фаза 2. Каркас страниц и маршрутов

- [x] Страницы: `/`, `/about`, `/skills`, `/projects`, `/blog`, `/resume`, `/contact`
- [x] Динамические маршруты: `/projects/[slug].tsx`, `/blog/[slug].tsx`
- [x] Навигация реализована в Layout

## Фаза 3. Компоненты и дизайн

- [x] Компоненты: ProjectCard, SkillList, ThemeToggle, FadeIn и др.
- [x] Переключатель темы (next-themes)
- [x] Цветовая палитра и шрифты через Tailwind
- [x] Анимации появления секций (Framer Motion)

## Фаза 4. Интеграция CMS и контент

- [x] Netlify CMS: `static/admin/config.yml` с коллекциями projects, blog, pages
- [x] Фронтенд-роут `/admin` для админки
- [x] Markdown + frontmatter для projects и blog
- [x] Утилиты для чтения Markdown (gray-matter, remark)
- [x] Примеры проектов и постов добавлены

## Фаза 5. Анимации и микровзаимодействия

- [x] Framer Motion + Intersection Observer для fade-in/slide-in
- [x] Hover‑эффекты карточек и ссылок
- [ ] Параллакс‑эффект на hero‑секции (можно добавить)

## Фаза 6. Форма обратной связи и интеграции

- [ ] Форма контактов (Netlify Forms или Formspree)
- [ ] Социальные иконки (LinkedIn, GitHub, Telegram, Gmail и др.)
- [x] Google Analytics через `<Script>` в `_app.tsx`

## Фаза 7. SEO и производительность

- [x] `<Head>`: title, meta description, Open Graph на всех страницах
- [x] Генерация sitemap.xml и robots.txt (`next-sitemap`)
- [x] Оптимизация изображений через `next/image`
- [ ] Проверка Core Web Vitals, Lighthouse

## Фаза 8. Адаптивность и i18n

- [x] Tailwind responsive utilities, адаптивность
- [ ] (Опционально) next-i18next для мультиязычности

## Фаза 9. Тестирование и правки

- [ ] Кроссбраузерное тестирование
- [ ] Тесты компонентов (Jest + React Testing Library)
- [ ] Финальный UX‑ревью

## Фаза 10. Деплой и поддержка

- [x] Репозиторий подключён к Netlify/Vercel
- [x] Build command и publish directory настроены
- [x] Кастомный домен и SSL (если нужно)
- [x] Автоматический деплой при пуше в main
- [x] Документация по работе с CMS (см. README.md)

---

## Итог

**Реализовано:**  
- Современный стек (Next.js, TypeScript, Tailwind, Framer Motion)
- Адаптивный дизайн, анимации, тёмная/светлая тема
- CMS для контента (Netlify CMS)
- Динамические проекты и блог (Markdown)
- SEO, sitemap, robots.txt, аналитика
- Готов к деплою на Vercel/Netlify

**Что можно доработать:**  
- Форма обратной связи (Netlify Forms)
- Социальные иконки
- Параллакс-эффекты, дополнительные анимации
- Тесты и финальное UX‑ревью
- (Опционально) мультиязычность

---

**Вывод:**  
План реализован практически полностью, проект готов к публикации и дальнейшему развитию.
