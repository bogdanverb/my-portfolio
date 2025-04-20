// Этот файл содержит определения типов и интерфейсов, используемых в проекте.

export interface Project {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export interface Skill {
    name: string;
    level: string; // Например, "Junior", "Mid", "Senior"
}

export interface BlogPost {
    title: string;
    content: string;
    slug: string;
    date: string; // Дата публикации
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}