"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não conferem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    setLoading(true);
    // TODO: Integrar com Supabase Auth
    console.log("Register attempt:", { name, email, password });
    setLoading(false);
  };

  return (
    <div className="eco-auth-container">
      <div className="eco-auth-card">
        <div className="eco-auth-card__header">
          <div className="eco-auth-card__logo">economizze</div>
          <h1 className="eco-auth-card__title">Crie sua conta</h1>
          <p className="eco-auth-card__desc">Junte-se à nossa comunidade de afiliados</p>
        </div>

        <form onSubmit={handleSubmit} className="eco-auth-form">
          {error && (
            <div style={{
              background: "var(--orange-pale)",
              color: "var(--orange)",
              padding: "10px 12px",
              borderRadius: "8px",
              fontSize: "12px",
            }}>
              {error}
            </div>
          )}

          <div className="eco-auth-form__group">
            <label htmlFor="name" className="eco-auth-form__label">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              className="eco-auth-form__input"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="eco-auth-form__group">
            <label htmlFor="confirmPassword" className="eco-auth-form__label">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="eco-auth-form__input"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="eco-auth-form__submit"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="eco-auth-form__link">
          Já tem conta?{" "}
          <Link href="/login">
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
