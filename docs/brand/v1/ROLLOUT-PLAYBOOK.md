# Playbook de Reformulacao Visual · Ecossistema Numera

Guia tecnico passo a passo para migrar **`Numera`**, **`Monno`** e **`Cronos`** ao sistema visual unificado já em produção no **`NYOT`**. Todo ativo necessário para replicação está contido nesta pasta (`docs/brand/v1/`).

---

## 1. Preparacao de Fontes e HTML Shell

Substituir fontes serifadas ou variações pesadas (`700/800`) no `index.html` de cada projeto:

```html
<meta name="theme-color" content="#0A0A09" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600&family=DM+Mono:wght@400&display=swap"
  rel="stylesheet"
/>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

Atualizar `manifest.webmanifest` (`background_color` e `theme_color` para `#0A0A09`) e script pre-paint de tema (`#0A0A09` escuro / `#F4F3EF` claro).

---

## 2. Importacao de Tokens CSS e Preset Tailwind

1. Copiar [numera-tokens.css](./tokens/numera-tokens.css) para `src/styles/` ou substituir as variáveis `:root` e `html.light` em `src/index.css`.
2. Adotar [tailwind-preset.js](./tokens/tailwind-preset.js) via `presets: [numeraThemePreset]` no `tailwind.config.js` do repositório alvo.
3. Garantir que a classe de rótulo editorial (ex: `.label-ui`) use `Figtree 500` (`11px/15px`, `0.12em`), nunca `DM Mono`.

---

## 3. Geracao de Favicon e Icones PWA PNG (`192`, `512`, `180`)

Copiar o arquivo `*-app-icon.svg` da marca (`docs/brand/v1/logos/<marca>-app-icon.svg`) e derivar os PNGs com fundo opaco `#0A0A09` (`(10, 10, 9, 255)`) e ícone `#F4F3EF` (`(244, 243, 239)`), sempre usando supersampling `4x` com `Image.Resampling.LANCZOS`:

- `public/favicon.svg`: retângulo `64x64 rx="14"` em `#0A0A09` + grupo `<g transform="translate(10 10) scale(0.6875)" color="#F4F3EF">` com o símbolo `64x64` da marca.
- `public/icon-192.png` (`192x192`), `public/icon-512.png` (`512x512`) e `public/apple-touch-icon.png` (`180x180`). Importante: manter o canvas PNG 100% opaco em `#0A0A09` para evitar cantos pretos no recorte nativo do iOS (`apple-touch-icon`).

---

## 4. Padrao de Componente Logo em React

Cada app deve padronizar seu componente (`NumeraLogo`, `MonnoLogo`, `CronosLogo`, `NyotLogo`) com:

- `viewBox="0 0 64 64"` usando `currentColor` (`100%` no elemento principal e `opacity="0.36"` no elemento complementar).
- Wordmark com `font-sans font-semibold leading-none tracking-[-0.03em] text-fg` (`Figtree 600`).
- Title Case para `Numera`, `Monno`, `Cronos`; caixa alta apenas para `NYOT`.
- Sub-linha opcional de endosso `Um app Numera` em `text-[11px] font-medium text-fg-3` (sem `font-mono`).

---

## 5. Animacao, Splash e Easing Unificado

1. Curva padrão do ecossistema: `--ease-numera: cubic-bezier(0.22, 1, 0.36, 1)` (`[0.22, 1, 0.36, 1]` no Framer Motion).
2. Proibido `transition: all` / `transition-all`. Declarar explicitamente `transition-[background-color,border-color,color,transform,opacity]`.
3. Evitar springs quicantes (`stiffness/damping` baixos). Substituir por `duration` entre `0.24s` e `0.58s` com `[0.22, 1, 0.36, 1]`.
4. Toda tela de entrada ou splash deve animar o próprio símbolo `64x64` oficial da marca (nunca ícones antigos) e retornar `null` quando `prefers-reduced-motion: reduce` estiver ativo.

---

## 6. Auditoria e Limpeza Especifica por Marca

### 6.1 Numera (`gruponumera.com`)
- Substituir fundos frios/gradientes coloridos anteriores pela base `Ônix` (`#0A0A09`) com glass `.glass-2` e highlight quente (`rgb(var(--c-ov) / 0.045)`).
- Consolidar cards de ecossistema apontando para `Monno`, `Cronos` e `NYOT` usando exatamente os lockups em `docs/brand/v1/logos/`.
- Conferir se os domínios (`gruponumera.com`, `nyot.gruponumera.com`) são os únicos pontos além de specs técnicas usando fonte monoespaçada.

### 6.2 Monno (`monno.gruponumera.com`)
- **Remoção crítica de cor legada:** eliminar escalas `turq-*` (`#00BFA5`, `#14CCB1`, etc.) e `gray-*` frios do `tailwind.config.js` e CSS. Substituir realces positivos por `Sálvia` (`#8EB89F` escuro / `#2E6447` claro) e neutros `Ônix & Algodão Cru`.
- **Paleta editorial de categorias e contas:** usar os 10 tons minerais/terrosos suaves (`#8EB89F`, `#91B8D6`, `#D1B886`, `#E0A39D`, `#A799C4`, `#C99778`, `#6B947C`, `#B88AA4`, `#7C98A6`, `#96948D`) no seletor de cores e categorias padrão, sem neons.
- **Símbolo atualizado e abertura:** adotar `monno-mark.svg` com 3 pílulas branco/cinza (`36%` nas colunas laterais, `100%` na central) e `MonnoIntroSplash` animado no mesmo grid `64x64` com `--ease-numera`.
- **Anatomia monetária (`Money`), `StatusDot` e `PillBarChart`:** valores usam `Figtree 300` + `tabular-nums`, centavos em `0.5em` (`fg-3`) e sinal explícito `+` / `−`; gráficos em pílulas de `6px` herdam a geometria da marca; status usam ponto de `6px` + texto sem preencher cartões inteiros.
- **Contraste obrigatório em switches monocromáticos:** como `--c-accent` no escuro é `#F4F3EF`, todo botão `role="switch"` ativo com `bg-accent` DEVE usar `bg-accent-on` no pino deslizante (nunca `bg-white`).

### 6.3 Cronos (`cronos.com.br`)
- Substituir logotipo anterior pelo `cronos-mark.svg` (`C1 Semicircular`, bulbo superior `100%`, inferior `36%`).
- Atualizar cantos de cards e seletores de quadrimestre/ciclo para a escala `6/10/14/18/26px`.
- Horários (`08:15`), saldos de banco de horas e contadores de quadrimestre usam `Figtree` + `tabular-nums`; exportar relatórios mantendo estética limpa e zero fontes serifadas.

---

## 7. Script de Auditoria Antes do Deploy

Rodar no diretório do app migrado para confirmar zero regressões de sistema:

```bash
python3 -c "
import pathlib, re
root = pathlib.Path('src')
bad_mono = []
bad_all = []
bad_heavy = []
for p in list(root.rglob('*.ts')) + list(root.rglob('*.tsx')) + list(root.rglob('*.css')):
    for i, line in enumerate(p.read_text(encoding='utf-8').splitlines(), 1):
        if re.search(r'transition-all|transition:\s*all', line): bad_all.append(f'{p}:{i}')
        if re.search(r'font-mono|DM Mono', line): bad_mono.append(f'{p}:{i}: {line.strip()[:80]}')
        if re.search(r'font-(bold|extrabold|black)|font-weight:\s*(700|800|900)', line): bad_heavy.append(f'{p}:{i}')
print('transition-all:', bad_all)
print('font-mono:', bad_mono)
print('heavy-weight:', bad_heavy)
"
```

Somente aprovar a publicação quando `transition-all` e `heavy-weight` forem `0` (salvo exceção explícita em componentes terceiros) e `font-mono` aparecer apenas em URLs técnicas ou confirmações literais digitadas pelo usuário.
