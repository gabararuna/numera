# Guia de Migração · NYOT (`nyot.gruponumera.com`)

## Diagnóstico Antes vs Depois

| Superfície | Antes (Legado) | Depois (Numera Design System v1) |
|---|---|---|
| **Navegação Desktop** | Sidebar lateral esquerda fixa (`md:w-56 lg:w-64 border-r`) | **Top Bar unificada** em grade de 3 zonas (`max-w-5xl focused`) com cápsula centrada deslizante (`Início · Hábitos · Peso`) |
| **Header Esquerdo** | Divisão acoplada à largura da sidebar (`md:w-56 border-r`) | Zona fluida alinhada ao container `max-w-5xl` com `<NyotLogo variant="full" />` clicável para `/app` |
| **Header Direito** | Check-in + Share + Engrenagem solta para Configurações (sem avatar/tema/sair) | Check-in (`Atualização Diária`) + Share + **`AccountMenu` unificado** com monograma, nome, `Ajustes`, `Tema claro/escuro`, `Administração`, **Ecossistema Numera** e `Sair` |
| **Dock Mobile** | Exibia também `Ajustes` e `Admin` em rolagem horizontal | Focado apenas nos módulos primários (`Início · Hábitos · Peso`), oculto se `<= 1` módulo |

## Escopo Aplicado Agora (Shell & Tokens)
- `src/index.css`: ajuste `--dock-space: 0px` em `@media (min-width: 768px)` removendo folga artificial de dock no desktop.
- `src/components/layout/Header.tsx`: nova barra superior de 3 zonas, nav centrada desktop (`hidden md:flex`), trigger + `AccountMenu` completo (tema com persistência + perfil, `Ajustes`, `Administração`, `Ecossistema Numera`, `Sair`), mantendo compatibilidade integral de testes com `HEADER_CHECKIN_HINT_SEEN_KEY`, `data-hint-open` e botão `Compartilhar evolução`.
- `src/components/layout/AppShell.tsx` & `FloatingDock.tsx`: remoção do `<Sidebar />`, simplificação do dock para itens `primary`, remoção do arquivo obsoleto `Sidebar.tsx`.

## Backlog Recomendado (Fase 2 — Evolução)
1. Quando novos módulos entrarem (ex.: `/app/pace`) e as configurações crescerem além de 5 seções, adotar o componente `SecondaryTwoPane` dentro de `/app/configuracoes` mantendo o shell global em Top Bar.
