# economizze.shop — Documentação do Projeto

**Versão:** 0.1 — Fase de planejamento  
**Data:** Maio 2026

---

## 1. Visão Geral

**economizze.shop** é uma plataforma de marketing de afiliados que funciona como um diretório de lojas temáticas. Em vez de ser uma loja real, cada "site" dentro do ecossistema é uma vitrine curada de produtos com links de afiliado redirecionando para plataformas parceiras (Shopee, Amazon, Mercado Livre).

O modelo é inspirado no conceito de Linktree, mas com interface e experiência de loja: o usuário navega por categorias, pesquisa produtos e filtra por preferências — e ao clicar em "comprar", é redirecionado via link de afiliado para a plataforma de origem.

---

## 2. Estrutura do Ecossistema

```
economizze.shop          → Home institucional (hub)
├── loja1.economizze.shop  → Nicho: Perfumaria
├── loja2.economizze.shop  → Nicho: Pets
├── loja3.economizze.shop  → Nicho: Masculino / Lifestyle
└── ...                    → Outros nichos
```

Cada sub-site é independente em conteúdo, mas compartilha a mesma base de código e infraestrutura.

---

## 3. Páginas e Funcionalidades

### 3.1 Home — economizze.shop

Objetivo: apresentar o ecossistema e atrair lojistas/parceiros.

| Seção | Conteúdo |
|---|---|
| Hero | Proposta de valor principal, CTA |
| O que é | Explicação do modelo de afiliados |
| Nossos sites | Cards dos sub-sites ativos com link |
| Contato | Formulário simples ou link para WhatsApp/e-mail |

### 3.2 Sub-sites (Lojas Temáticas)

Cada sub-site é uma loja de afiliados com:

- Página inicial com destaques e ofertas
- Busca por produto (filtro por nome, categoria, preço)
- Listagem por categorias
- Página de produto com descrição, imagem e botão "Ver oferta" (link afiliado)
- Sem carrinho, sem checkout — tudo redireciona externamente

### 3.3 Painel Administrativo

Acesso restrito a usuários autorizados. Um usuário pode ter acesso a um ou mais sub-sites.

Funcionalidades:

- Login com autenticação segura
- Seleção do site a gerenciar
- CRUD de produtos (nome, imagem, preço, link afiliado, categoria, destaque)
- CRUD de categorias e seções da loja
- Gestão de usuários (admin global) — permissões por site
- Visualização de métricas básicas (cliques nos links)

---

## 4. Plataformas de Afiliados Suportadas

| Plataforma | Integração |
|---|---|
| Amazon | Product Advertising API 5.0 — busca e links semi-automáticos |
| Mercado Livre | API pública — busca e links programáticos |
| Shopee | Manual — links gerados no painel Shopee e cadastrados no admin |

---

## 5. Requisitos Técnicos

### Frontend
- Site público (Home + sub-sites): Next.js ou similar, otimizado para SEO
- Painel admin: React com controle de acesso por roles

### Backend / Dados
- Banco de dados: PostgreSQL
- Autenticação: Projeto próprio
- Tabelas principais: `sites`, `users`, `user_site_permissions`, `products`, `categories`, `clicks`

### Automação (futuro)
- Geração de conteúdo via Claude API
- Orquestração via Make ou n8n
- Postagem em redes sociais (grupos, comunidades)

---

## 6. Modelo de Permissões

```
Admin Global
└── Acessa todos os sites
└── Cria/remove usuários e permissões

Editor (por site)
└── Gerencia produtos, categorias e seções
└── Não altera permissões de outros usuários
```

---

## 7. Roadmap Inicial

| Fase | Entregável |
|---|---|
| 1 | Home institucional (economizze.shop) publicada |
| 2 | Primeiro sub-site funcional (nicho definido) |
| 3 | Painel admin com CRUD de produtos |
| 4 | Sistema de permissões por usuário/site |
| 5 | Integração Amazon e Mercado Livre |
| 6 | Automação de conteúdo e postagem |

---

## 8. Fora do Escopo (por ora)

- Pagamentos ou checkout próprio
- Sistema de reviews/avaliações
- App mobile nativo
- Geração automática de sites (tudo criado manualmente na fase inicial)
