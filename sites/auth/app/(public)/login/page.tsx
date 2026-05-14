'use client'

import { useActionState } from 'react'
import { login } from './actions'
import '@/app/auth.css'

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null)

  return (
    <div className="eco-auth-page">
      <div className="eco-auth-card">
        <div className="eco-auth-logo">
          <span>economiz<em>ze</em></span>
        </div>

        <h1>Bem-vindo de volta</h1>
        <p>Acesso restrito a usuários internos.</p>

        {error && <div className="eco-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <form className="eco-auth-form" action={action}>
          <div className="eco-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="eco-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="eco-btn-primary" disabled={pending}>
            {pending ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
