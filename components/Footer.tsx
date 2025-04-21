import React from 'react';
import Link from 'next/link';
import { socialLinks } from '../data/contact'; // Импортируем данные из контактов

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 sm:col-span-2">
            <Link href="/" className="flex items-center space-x-1 mb-6">
              <div className="text-2xl font-black tracking-tighter">
                <span className="text-primary">Script</span>
                <span className="text-accent relative">
                  XX
                  <span className="absolute -top-1 right-0 text-xs text-primary opacity-70">™</span>
                </span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Creating digital experiences that blend creativity with technical excellence. 
              Let's build something amazing together.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name}
                  className="touch-target p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="sr-only">{link.name}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 pt-4 sm:pt-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/skills', label: 'Skills' },
                { href: '/projects', label: 'Projects' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1 pt-4 sm:pt-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href={`mailto:${socialLinks.find(link => link.name === 'Email')?.url.replace('mailto:', '')}`} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  {socialLinks.find(link => link.name === 'Email')?.url.replace('mailto:', '')}
                </a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">
                  Your Location, City, Country
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} ScriptXX. All rights reserved.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 md:mt-0">
            Designed and built with <span className="text-accent">❤</span> by ScriptXX
          </p>
        </div>
      </div>
    </footer>
  );
}
