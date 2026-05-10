import Link from "next/link";

const stores = [
  {
    id: 1,
    name: "Perfumaria Elegância",
    desc: "Fragrâncias importadas e nacionais",
    emoji: "🧴",
    count: 120,
  },
  {
    id: 2,
    name: "Pet's World",
    desc: "Tudo para seu pet",
    emoji: "🐾",
    count: 85,
  },
  {
    id: 3,
    name: "Tech & Gadgets",
    desc: "Eletrônicos e acessórios",
    emoji: "🔌",
    count: 200,
  },
  {
    id: 4,
    name: "Home & Garden",
    desc: "Móveis e decoração",
    emoji: "🏠",
    count: 150,
  },
  {
    id: 5,
    name: "Fashion Hub",
    desc: "Roupas e acessórios",
    emoji: "👔",
    count: 180,
  },
  {
    id: 6,
    name: "Beauty Lab",
    desc: "Cosméticos e cuidados",
    emoji: "💄",
    count: 95,
  },
];

export function StoresSection() {
  return (
    <section className="eco-stores">
      <div className="container">
        <div className="eco-stores__header">
          <h2 className="eco-stores__title">Nossas Lojas</h2>
          <Link href="/lojas" className="eco-stores__see-all">
            Ver todas
          </Link>
        </div>

        <div className="eco-stores__grid">
          {stores.map((store) => (
            <Link key={store.id} href={`/lojas/${store.id}`} className="eco-store-card">
              <div className="eco-store-card__icon">{store.emoji}</div>
              <h3 className="eco-store-card__name">{store.name}</h3>
              <p className="eco-store-card__desc">{store.desc}</p>
              <span className="eco-store-card__tag">{store.count} produtos</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
