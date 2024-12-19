import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          EN-KR Translator
        </Link>
      </div>
      <div className="flex-none gap-4">
        
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Translate</Link></li>
          <li><Link href="/history">History</Link></li>
          <li><Link href="/favorites">Favorites</Link></li>
        </ul>
        <ThemeSwitcher />
      </div>
    </header>
  );
} 