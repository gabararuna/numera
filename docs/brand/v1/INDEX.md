# Ecossistema Numera · Centro de Marca v1

Pacote central do sistema visual compartilhado entre **`Numera`** (marca-mãe) e os aplicativos **`Monno`**, **`Cronos`** e **`NYOT`**. Estrutura organizada em camada global herdada por todas as marcas e áreas dedicadas por produto para facilitar a reformulação de cada repositório.

## 1. Brand Books Interativos

| Escopo | Arquivo | Público / Foco |
|---|---|---|
| **Global (Hub Mestre)** | [Numera Global Brand Book & Design System.html](./Numera%20Global%20Brand%20Book%20%26%20Design%20System.html) | Fundações compartilhadas, governança, tokens globais e portal para cada marca |
| **`Numera` (Marca-mãe)** | [numera-brand-book.html](./brands/numera-brand-book.html) | Plataforma-mãe (`gruponumera.com`), dois eixos (B2B + Produtos), loops N, endosso institucional, taxonomia de calculadoras e padrão audiovisual (`9:16` / `4:5`) |
| **`Monno` (Finanças)** | [monno-brand-book.html](./brands/monno-brand-book.html) | Planejamento e projeção financeira (`monno.gruponumera.com`), 3 pílulas monocromáticas |
| **`Cronos` (Ponto e Ciclos)** | [cronos-brand-book.html](./brands/cronos-brand-book.html) | Gestão de ponto CLT, múltiplos ciclos, planejamento de folgas e conciliação (`cronos.gruponumera.com`), bulbos semicirculares |
| **`NYOT` (Modular Diário)** | [nyot-brand-book.html](./brands/nyot-brand-book.html) | Hábitos, peso, marcos e protocolo de canetas (`nyot.gruponumera.com`), Eclipse |

## 2. Base Técnica para Reformulação das Demais Marcas

- **Playbook de migração:** [ROLLOUT-PLAYBOOK.md](./ROLLOUT-PLAYBOOK.md)
- **Tokens CSS portáteis:** [numera-tokens.css](./tokens/numera-tokens.css)
- **Preset Tailwind CSS:** [tailwind-preset.js](./tokens/tailwind-preset.js)
- **Kit vetorial (16 SVGs):** [logos/README.md](./logos/README.md)

## 3. Design System de Produto (Shell, Navegação e Componentes)

- **Portal Interativo:** [Numera Design System.html](../../system/Numera%20Design%20System.html)
- **Índice & Especificações:** [docs/system/INDEX.md](../../system/INDEX.md)
- **Tokens Estruturais de Shell:** [numera-system.css](../../system/tokens/numera-system.css)

## 4. Invariantes da Família

1. **Hierarquia:** `Numera`, `Monno` e `Cronos` sempre em Title Case; apenas `NYOT` em caixa alta por ser sigla. No NYOT, usar ou `NYOT` ou `Not Your Ordinary Tracker`, nunca os dois juntos. Apps exibem o endosso `Um app Numera`.
2. **Tipografia:** `Figtree` (`300/400/500/600`) como voz única; wordmarks em `Figtree 600` com `letter-spacing: -0.03em`; zero serifas.
3. **Restrição de `DM Mono`:** apenas em tokens CSS, códigos hex, specs técnicas (`64x64`, `cubic-bezier(0.22, 1, 0.36, 1)`), domínios técnicos (`nyot.gruponumera.com`, `monno.gruponumera.com`, `cronos.gruponumera.com`, `gruponumera.com`) e termos literais de confirmação (`RESETAR`, `EXCLUIR`).
4. **Forma e cor:** `Ônix` (`#0A0A09`) e `Algodão Cru` (`#F4F3EF`) com contraste AA (`>= 4.95:1`), sem cores vibrantes nem cantos de 90 graus (`6/10/14/18/26/9999px`), usando curva `--ease-numera` (`cubic-bezier(0.22, 1, 0.36, 1)`).
