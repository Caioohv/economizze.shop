import Link from "next/link";

export function Navbar() {
  return (
    <nav className="eco-nav">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" className="eco-nav__logo">
          economizze
        </Link>

        <div className="eco-nav__links">
          <Link href="#sobre">Sobre</Link>
          <Link href="#lojas">Lojas</Link>
          <Link href="#contato">Contato</Link>
        </div>

        <Link href="/login" className="eco-nav__cta">
          Entrar
        </Link>
      </div>
    </nav>
  );
}
