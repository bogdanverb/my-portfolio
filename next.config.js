/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify видалено (застаріла опція)
  
  // Динамічно визначаємо, чи включати basePath для GitHub Pages
  basePath: process.env.GITHUB_PAGES === 'true' ? '/my-portfolio' : '',
  // Для оптимальної роботи статичної експортації
  trailingSlash: process.env.GITHUB_PAGES === 'true',
  // Підтримка експорту для GitHub Pages
  output: process.env.EXPORT === 'true' ? 'export' : undefined,
  // Налаштування зображень для статичної експортації
  images: {
    unoptimized: process.env.EXPORT === 'true' ? true : false,
    // domains видалено (застаріла опція)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    // Поліпшення розв'язання модулів для запобігання дублікатів
    config.optimization.moduleIds = 'deterministic';
    
    // Оптимізація розбиття на чанки
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            name: 'framework',
            chunks: 'all',
            priority: 40,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
          },
          shared: {
            name: false,
            priority: 10,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
