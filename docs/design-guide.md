# economizze.shop — Design Guide

> Referência de design para o Claude Code implementar a Home e o Painel Admin com fidelidade ao mockup aprovado.

---

## 1. Fontes

Importar via Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

| Papel | Família | Peso | Uso |
|---|---|---|---|
| Display / Logo | Sora | 700 | Nome do site, hero principal |
| Heading | Sora | 600 | Títulos de seção, cards |
| UI / Label | DM Sans | 500 | Botões, labels, navegação |
| Body | DM Sans | 400 | Parágrafos, descrições, tabelas |

```css
--font-display: 'Sora', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

Letter-spacing no display: `-0.03em`. Letter-spacing em labels uppercase: `0.1em`.

---

## 2. Paleta de Cores

```css
:root {
  /* Marca */
  --green:        #1a6b4a;   /* Principal — links, bordas ativas, badges */
  --green-light:  #27a169;   /* Hover, deltas positivos, dot ativo */
  --green-pale:   #e8f7f0;   /* Background de badges verdes, hover suave */

  /* CTA */
  --orange:       #f05c2a;   /* Exclusivo para botão CTA primário */
  --orange-pale:  #fff0ea;   /* Background de badges laranja */

  /* Neutros */
  --dark:         #12201a;   /* Hero background, sidebar admin, texto primário escuro */
  --gray:         #6b7c74;   /* Texto secundário, ícones, metadados */
  --border:       rgba(26,107,74,0.15); /* Bordas padrão */
  --surface:      #f7faf8;   /* Background de páginas e search bars */
  --white:        #ffffff;   /* Cards, nav, painel principal */
}
```

### Regra de uso do laranja

O laranja `#f05c2a` é **reservado exclusivamente para CTAs primários**. Não usar em textos, ícones decorativos ou backgrounds de seção.

### Badges de plataforma

| Plataforma | Background | Texto |
|---|---|---|
| Amazon | `#fff3e0` | `#bf6700` |
| Shopee | `#ffe8e0` | `#c94a1b` |
| Mercado Livre | `#fff9e0` | `#b07a00` |

---

## 3. Border Radius

```css
--radius:    10px;  /* Padrão — cards, inputs, pills menores */
--radius-lg: 16px;  /* Wrappers, modais, seções com destaque */
```

Botões pill (nav CTA, filtros): `border-radius: 100px`.

---

## 4. Estrutura — Home (`economizze.shop`)

### 4.1 Navbar

```
altura: 52px
background: white
border-bottom: 1px solid var(--border)
padding: 0 24px
layout: flex, space-between, align-center
```

**Logo:** `font-family: Sora, 700, 15px, color: --green, letter-spacing: -0.02em`

**Links de navegação:** `font-size: 12px, color: --gray, gap: 20px`

**Botão CTA nav:**
```css
background: var(--green);
color: white;
font-size: 12px;
font-weight: 500;
padding: 6px 14px;
border-radius: 100px;
```

---

### 4.2 Hero

```
background: linear-gradient(135deg, #12201a 0%, #1a3d2c 100%)
padding: 40px 28px 36px
overflow: hidden
position: relative
```

**Elementos de fundo (decorativos):**
- Círculo 1: `200×200px, top: -60px, right: 60px, background: rgba(39,161,105,0.12), border-radius: 50%`
- Círculo 2: `120×120px, bottom: 20px, right: 20px, opacity: 0.5, mesma cor`

**Tag de curadoria (topo do hero):**
```css
display: inline-flex;
align-items: center;
gap: 6px;
background: rgba(39,161,105,0.2);
border: 1px solid rgba(39,161,105,0.35);
border-radius: 100px;
padding: 4px 12px;
font-size: 11px;
font-weight: 500;
color: #7debb0;
margin-bottom: 16px;
```
Dot interno: `6×6px, background: #7debb0, border-radius: 50%`

**Título H1:**
```css
font-family: Sora;
font-size: 26px;
font-weight: 700;
color: white;
line-height: 1.25;
letter-spacing: -0.03em;
max-width: 380px;
margin-bottom: 10px;
```
Palavra de destaque (em): `color: #27a169, font-style: normal`

**Subtítulo:**
```css
font-size: 13px;
color: rgba(255,255,255,0.6);
line-height: 1.6;
max-width: 340px;
margin-bottom: 22px;
```

**Botões do hero:**
```
layout: flex, gap: 10px, align-items: center
```

Botão primário (laranja):
```css
background: var(--orange);
color: white;
font-size: 12px;
font-weight: 600;
padding: 9px 18px;
border-radius: 100px;
display: flex;
align-items: center;
gap: 6px;
```

Botão secundário (ghost):
```css
color: rgba(255,255,255,0.7);
font-size: 12px;
font-weight: 500;
display: flex;
align-items: center;
gap: 5px;
background: none;
border: none;
```

**Stats do hero:**
```
margin-top: 28px
padding-top: 20px
border-top: 1px solid rgba(255,255,255,0.08)
display: flex
gap: 24px
```

Número: `font-family: Sora, 20px, 700, color: white`
Label: `font-size: 11px, color: rgba(255,255,255,0.45), margin-top: 2px`

---

### 4.3 Seção "Nossas Lojas"

```
background: var(--surface)
padding: 28px 24px
```

Header da seção:
```
display: flex
align-items: center
justify-content: space-between
margin-bottom: 16px
```

Título: `font-family: Sora, 15px, 600, color: --dark`
Link "Ver todas": `font-size: 12px, color: --green, font-weight: 500`

**Grid de cards:**
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;
```

**Store card:**
```css
background: white;
border: 1px solid var(--border);
border-radius: var(--radius);
padding: 14px 14px 12px;
cursor: pointer;
transition: border-color 0.2s;
```
Hover: `border-color: #27a169`

Ícone: `36×36px, border-radius: 8px, background: var(--green-pale), font-size: 18px, margin-bottom: 8px`

Nome: `font-size: 12px, font-weight: 600, color: --dark, margin-bottom: 2px`

Descrição: `font-size: 11px, color: --gray, line-height: 1.4`

Tag de contagem:
```css
display: inline-block;
margin-top: 8px;
font-size: 10px;
font-weight: 500;
background: var(--green-pale);
color: var(--green);
padding: 2px 8px;
border-radius: 100px;
```

---

### 4.4 CTA de Contato

```
margin: 0 24px 24px
background: var(--green)
border-radius: var(--radius-lg)
padding: 22px 24px
display: flex
align-items: center
justify-content: space-between
```

Título: `font-family: Sora, 14px, 600, color: white, margin-bottom: 4px`
Subtítulo: `font-size: 12px, color: rgba(255,255,255,0.65)`

Botão:
```css
background: white;
color: var(--green);
font-size: 12px;
font-weight: 600;
padding: 8px 16px;
border-radius: 100px;
white-space: nowrap;
flex-shrink: 0;
```

---

## 5. Estrutura — Painel Admin

Layout geral:
```css
display: flex;
height: 100vh; /* ou altura do container */
background: #f1f4f2;
```

---

### 5.1 Sidebar

```css
width: 180px;
flex-shrink: 0;
background: var(--dark); /* #12201a */
display: flex;
flex-direction: column;
padding: 18px 0;
```

**Logo/título:**
```
padding: 0 16px 18px
font-family: Sora, 13px, 700
color: #27a169
letter-spacing: -0.02em
border-bottom: 1px solid rgba(255,255,255,0.07)
margin-bottom: 12px
```
Sub-label: `color: rgba(255,255,255,0.4), font-weight: 400, font-size: 11px, display: block, margin-top: 2px`

**Site switcher** (dropdown de troca de loja):
```css
margin: 0 10px 12px;
background: rgba(255,255,255,0.06);
border: 1px solid rgba(255,255,255,0.1);
border-radius: 8px;
padding: 8px 10px;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
```
Nome do site: `font-size: 11px, font-weight: 500, color: rgba(255,255,255,0.8)`
Domínio: `font-size: 10px, color: rgba(255,255,255,0.35), margin-top: 1px`

**Label de grupo (ex: "Principal", "Sistema"):**
```css
font-size: 10px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
color: rgba(255,255,255,0.25);
padding: 0 16px;
margin: 12px 0 4px;
```

**Item de menu:**
```css
display: flex;
align-items: center;
gap: 10px;
padding: 8px 16px;
font-size: 12px;
color: rgba(255,255,255,0.55);
cursor: pointer;
border-left: 2px solid transparent;
transition: background 0.15s;
```
Ícone: `font-size: 15px`

**Item ativo:**
```css
color: white;
background: rgba(39,161,105,0.15);
border-left-color: #27a169;
```

**Item hover (não ativo):**
```css
background: rgba(255,255,255,0.04);
```

---

### 5.2 Top Bar

```css
background: white;
border-bottom: 1px solid var(--border);
padding: 12px 20px;
display: flex;
align-items: center;
justify-content: space-between;
```

Título da página: `font-family: Sora, 14px, 600, color: --dark`

Search bar:
```css
display: flex;
align-items: center;
gap: 6px;
background: var(--surface);
border: 1px solid var(--border);
border-radius: 8px;
padding: 5px 10px;
font-size: 12px;
color: var(--gray);
```

Botão "Novo produto":
```css
background: var(--green);
color: white;
font-size: 12px;
font-weight: 500;
padding: 6px 12px;
border-radius: 8px;
display: flex;
align-items: center;
gap: 5px;
```

---

### 5.3 Métricas (Dashboard)

```css
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 10px;
margin-bottom: 18px;
```

**Metric card:**
```css
background: white;
border-radius: var(--radius);
border: 1px solid var(--border);
padding: 12px 14px;
```

Label: `font-size: 10px, color: --gray, font-weight: 500, text-transform: uppercase, letter-spacing: 0.05em`
Valor: `font-family: Sora, 20px, 700, color: --dark, margin: 4px 0 2px`
Delta positivo: `font-size: 11px, color: #27a169`
Delta negativo: `font-size: 11px, color: --orange`
Delta neutro: `font-size: 11px, color: --gray`

---

### 5.4 Tabela de Produtos

**Wrapper:**
```css
background: white;
border-radius: var(--radius);
border: 1px solid var(--border);
overflow: hidden;
```

**Header da tabela (filtros):**
```css
display: flex;
align-items: center;
padding: 12px 14px;
border-bottom: 1px solid var(--border);
gap: 8px;
```

Filter pill:
```css
font-size: 11px;
font-weight: 500;
padding: 4px 10px;
border-radius: 100px;
border: 1px solid var(--border);
color: var(--gray);
background: white;
cursor: pointer;
```

Filter pill ativo:
```css
background: var(--green-pale);
color: var(--green);
border-color: var(--green);
```

**Linha de produto:**
```css
display: flex;
align-items: center;
gap: 12px;
padding: 10px 14px;
border-bottom: 1px solid var(--border);
font-size: 12px;
```
Última linha: sem `border-bottom`.

Thumbnail: `36×36px, border-radius: 6px, background: --surface, border: 1px solid --border, font-size: 18px (emoji)`

Nome do produto: `font-weight: 500, color: --dark`
Metadados: `font-size: 11px, color: --gray, margin-top: 1px`

Preço: `font-weight: 600, color: --dark, min-width: 60px, text-align: right`

Ações (ícones): `font-size: 16px, color: --gray` → hover: `color: --green`

**Status dot:**
```css
width: 7px;
height: 7px;
border-radius: 50%;
flex-shrink: 0;
```
Ativo: `background: #27a169`
Rascunho: `background: #d0d4d1`

---

## 6. Ícones

Usar **Tabler Icons** (outline). Importar via CDN:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
```

Uso: `<i class="ti ti-NOME"></i>`

Ícones usados no projeto:

| Contexto | Ícone |
|---|---|
| Navegação geral | `ti-arrow-right`, `ti-chevron-down` |
| Search | `ti-search` |
| Novo item | `ti-plus` |
| Editar | `ti-edit` |
| Link externo | `ti-external-link` |
| Dashboard | `ti-layout-dashboard` |
| Produtos | `ti-package` |
| Categorias | `ti-category` |
| Seções/Layout | `ti-layout` |
| Usuários | `ti-users` |
| Sites | `ti-world` |
| Configurações | `ti-settings` |

---

## 7. Padrões de Interação

- **Hover em cards:** `border-color` muda para `--green-light` (transition 0.2s)
- **Hover em itens do sidebar:** `background: rgba(255,255,255,0.04)`
- **Hover em ações de linha:** ícone muda de `--gray` para `--green`
- **Transições padrão:** `0.15s ease` para cores, `0.2s ease` para bordas
- **Cursor pointer** em todo elemento clicável que não seja `<button>` ou `<a>`

---

## 8. Responsividade (fase inicial)

O foco inicial é **desktop**. Breakpoints a definir em fase posterior. Para mobile, a prioridade será:

1. Home: stacks verticais, hero reduzido, grid de lojas em 1 coluna
2. Admin: sidebar colapsável, tabela com scroll horizontal

---

## 9. Nomenclatura de Classes (sugestão)

Seguir convenção BEM ou prefixo `eco-`:

```
eco-nav, eco-hero, eco-hero__title, eco-hero__cta
eco-stores, eco-store-card
eco-cta-banner
eco-admin, eco-sidebar, eco-sidebar__item, eco-sidebar__item--active
eco-topbar, eco-metrics, eco-metric-card
eco-table, eco-product-row
```
