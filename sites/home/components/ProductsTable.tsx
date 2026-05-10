"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  platform: string;
  status: "active" | "draft";
}

const products: Product[] = [
  {
    id: 1,
    name: "Perfume Paris Elite",
    category: "Fragrâncias",
    price: "R$ 129,90",
    platform: "Amazon",
    status: "active",
  },
  {
    id: 2,
    name: "Eau de Toilette Rose",
    category: "Fragrâncias",
    price: "R$ 89,90",
    platform: "Shopee",
    status: "active",
  },
  {
    id: 3,
    name: "Perfume Ambar",
    category: "Fragrâncias",
    price: "R$ 149,90",
    platform: "Mercado Livre",
    status: "draft",
  },
  {
    id: 4,
    name: "Colônia Sport",
    category: "Fragrâncias",
    price: "R$ 69,90",
    platform: "Amazon",
    status: "active",
  },
  {
    id: 5,
    name: "Body Splash Floral",
    category: "Cosméticos",
    price: "R$ 45,90",
    platform: "Shopee",
    status: "active",
  },
];

export function ProductsTable() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filteredProducts = activeFilter
    ? products.filter((p) => p.status === activeFilter)
    : products;

  return (
    <div className="eco-table">
      <div className="eco-table__header">
        <button
          className={`eco-filter-pill ${activeFilter === null ? "eco-filter-pill--active" : ""}`}
          onClick={() => setActiveFilter(null)}
        >
          Todos
        </button>
        <button
          className={`eco-filter-pill ${activeFilter === "active" ? "eco-filter-pill--active" : ""}`}
          onClick={() => setActiveFilter("active")}
        >
          Ativos
        </button>
        <button
          className={`eco-filter-pill ${activeFilter === "draft" ? "eco-filter-pill--active" : ""}`}
          onClick={() => setActiveFilter("draft")}
        >
          Rascunhos
        </button>
      </div>

      <div className="eco-table__body">
        {filteredProducts.map((product) => (
          <div key={product.id} className="eco-product-row">
            <div
              className={`eco-status-dot eco-status-dot--${
                product.status === "active" ? "active" : "draft"
              }`}
            ></div>

            <div className="eco-product-row__thumbnail">
              {product.platform === "Amazon" ? "🛍️" : product.platform === "Shopee" ? "🛒" : "📦"}
            </div>

            <div className="eco-product-row__info">
              <div className="eco-product-row__name">{product.name}</div>
              <div className="eco-product-row__meta">
                {product.category} • {product.platform}
              </div>
            </div>

            <div className="eco-product-row__price">{product.price}</div>

            <div className="eco-product-row__actions">
              <button title="Editar">
                <i className="ti ti-edit"></i>
              </button>
              <button title="Ver">
                <i className="ti ti-external-link"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
