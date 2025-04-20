export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

const siteConfig: SiteConfig = {
  title: "Мое Портфолио",
  description: "Портфолио разработчика, showcasing my projects and skills.",
  author: "Ваше Имя",
  socialLinks: {
    github: "https://github.com/ваш-логин",
    linkedin: "https://linkedin.com/in/ваш-логин",
    twitter: "https://twitter.com/ваш-логин",
    instagram: "https://instagram.com/ваш-логин",
  },
};

export default siteConfig;