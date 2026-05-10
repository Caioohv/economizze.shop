"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Integrar com Supabase Auth
    console.log("Login attempt:", { email, password });
    setLoading(false);
  };

  return (
    <div className="eco-auth-container">
      <div className="eco-auth-card">
        <div className="eco-auth-card__header">
          <div className="eco-auth-card__logo">economizze</div>
          <h1 className="eco-auth-card__title">Bem-vindo de volta</h1>
          <p className="eco-auth-card__desc">Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="eco-auth-form">
          <div className="eco-auth-form__group">
            <label htmlFor="email" className="eco-auth-form__label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="eco-auth-form__input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="eco-auth-form__group">
            <label htmlFor="password" className="eco-auth-form__label">
              Senha
            </label>
            <input
              id="password"
              type="password"
              className="eco-auth-form__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="eco-auth-form__submit"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="eco-auth-form__link">
          Não tem conta?{" "}
          <Link href="/register">
            Crie uma
          </Link>
        </p>
      </div>
    </div>
  );
}
