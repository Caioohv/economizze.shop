import Link from "next/link";

export function Hero() {
  return (
    <section className="eco-hero">
      <div className="container">
        <div className="eco-hero__tag">Niche eCommerce Curated</div>

        <h1 className="eco-hero__title">
          Seu diretório de lojas <span className="eco-hero__highlight">temáticas</span> de afiliados
        </h1>

        <p className="eco-hero__subtitle">
          Descubra lojas especializadas em nichos específicos. Navegue, pesquise e compre através de links de afiliados dos principais marketplaces.
        </p>

        <div className="eco-hero__buttons">
          <Link href="/register" className="eco-hero__btn-primary">
            <i className="ti ti-arrow-right"></i>
            Começar
          </Link>
          <button className="eco-hero__btn-secondary">
            <i className="ti ti-play"></i>
            Saiba Mais
          </button>
        </div>

        <div className="eco-hero__stats">
          <div className="eco-hero__stat">
            <div className="eco-hero__stat-number">8+</div>
            <div className="eco-hero__stat-label">Lojas Ativas</div>
          </div>
          <div className="eco-hero__stat">
            <div className="eco-hero__stat-number">2k+</div>
            <div className="eco-hero__stat-label">Produtos Curados</div>
          </div>
          <div className="eco-hero__stat">
            <div className="eco-hero__stat-number">3</div>
            <div className="eco-hero__stat-label">Plataformas</div>
          </div>
        </div>
      </div>
    </section>
  );
}
