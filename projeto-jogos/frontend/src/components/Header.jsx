import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link to="/" className="app-header__logo">
          <span className="app-header__logo-icon">▮▮</span>
          GAME<span className="app-header__logo-accent">CATALOG</span>
        </Link>
        <nav className="app-header__nav">
          <Link to="/">Catálogo</Link>
          <Link to="/novo" className="app-header__cta">+ Novo Jogo</Link>
        </nav>
      </div>
    </header>
  );
}
