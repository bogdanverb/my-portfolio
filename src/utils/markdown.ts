import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type MarkdownMeta = {
  title: string;
  slug: string;
  description?: string;
  date?: string;
  cover?: string;
  tech?: string[];
};

export function getMarkdownList(contentDir: string): MarkdownMeta[] {
  const dir = path.join(process.cwd(), contentDir);
  const files = fs.readdirSync(dir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      return data as MarkdownMeta;
    });
}

export function getMarkdownBySlug(contentDir: string, slug: string) {
  const dir = path.join(process.cwd(), contentDir);
  const files = fs.readdirSync(dir);
  const file = files.find((f) => f.replace(/\.md$/, '') === slug);
  if (!file) return null;
  const filePath = path.join(dir, file);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  const processedContent = remark().use(html).processSync(content).toString();
  return { meta: data as MarkdownMeta, content: processedContent };
}