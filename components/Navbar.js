import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link href="/">Главная</Link></li>
                <li><Link href="/about">О нас</Link></li>
                <li><Link href="/services">Услуги</Link></li>
                <li><Link href="/contact">Контакты</Link></li>
            </ul>
        </nav>
    );
}
