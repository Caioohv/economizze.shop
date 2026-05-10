import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="eco-cta-banner">
      <div className="eco-cta-banner__text">
        <h3 className="eco-cta-banner__title">Quer criar sua loja?</h3>
        <p className="eco-cta-banner__subtitle">Entre em contato com nossa equipe e comece hoje mesmo</p>
      </div>
      <Link href="mailto:contato@economizze.shop" className="eco-cta-banner__btn">
        Entrar em Contato
      </Link>
    </section>
  );
}
