# Scorix — visual contract for agents

**Product:** B2B voice campaigns cabinet + admin (Scorix).
**Stack:** vanilla hash-SPA — `app.js`, `styles.css`, `index.html`.
**Not for:** marketing landing polish (use `public-seo` + `ux-write-design`).

## Intent

Спокойный **рабочий стол**, не дашборд-витрина. Клиент за минуту понимает путь: телефония → кампания → контакты → расписание → запуск → статусы → аналитика.

**Emotional quality:** technical, focused, trustworthy — не startup-playful, не «AI magic purple».

## Brand

| Token | Value |
|---|---|
| Display font | Syne (`--display`) |
| UI font | Manrope (`--font`) |
| Accent (light) | `#2557ff` cobalt |
| Theme default | **Light-first** (v1 screenshots) |

## Spacing scale (only these)

| Token | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 24 |
| `--space-6` | 32 |

Use `gap` with flex/grid. No 10px, 14px, 20px unless handoff explicitly allows.

## Surfaces (light)

| Token | Role |
|---|---|
| `--bg0` `#eef1f6` | cold paper atmosphere around the desk |
| `--bg1` `#e4eaf3` | rail / soft zones |
| `--surface` `#ffffff` | one white content plane |
| `--surface-2` `#f3f6fb` | nested field/table — **no shadow** |
| `--ink` `#0b1220` | primary text |
| `--muted` `#5b6b82` | secondary |
| `--line` `rgba(11,18,32,0.1)` | dividers |
| `--accent` `#2557ff` | CTA / cobalt bar |
| `--ok` / `--ok-soft` | readiness ok |
| `--warn` / `--warn-soft` | missing step, draft |
| `--danger` / `--danger-soft` | errors, destructive |
| `--radius` | 16px sheet |
| `--radius-sm` | 12px control |

Dark theme: same token **names** — values in `styles.css` `[data-theme="dark"]` or equivalent.

## Density rules (VIS-201)

1. **One depth:** page → max one `--surface` panel per block. Inside: spacing + `--line`, not card-in-card.
2. **`--surface-2`** inside open panel only — no second shadow.
3. **Panel/card** only when action or status needs a frame (launch, SIP, upload, confirm).
4. **Vertical rhythm:** section gaps `--space-5` or `--space-6`.
5. **Modal** is the only second layer over page.
6. List height follows content — no giant empty card for one row.

## Shell (cabinet)

- Left sticky **rail ~220px** with character: Syne brand + cobalt inset bar on active (not pill fill) + 5 nav links + Выйти.
- White content **sheet** on paper background (margin + radius + soft shadow).
- Top compact bar: balance chip + theme (mobile: section select).
- Admin: same rail pattern; menu label **Сервисы голоса** for LLM/ASR/TTS.
- Padding: `--space-3` / `--space-4` / `--space-5`

## Components

| Element | Rule |
|---|---|
| Primary button | `--accent` bg, `--accent-ink` text, min 44px touch |
| Secondary | border `--line`, bg transparent/surface |
| Destructive | `--danger` text or soft banner — confirm modal |
| Table | `tabular-nums`; row hover `--surface-2` |
| Banner warn | `--warn-soft` bg, `--warn` ink |
| Status labels | canon only — no rainbow |

## Status copy (canon)

В процессе · Завершён · Недозвон · Отмена

## Anti-patterns (never)

- Purple AI glow / neon on panels
- Cream + terracotta palette
- Dashboard of 10 equal cards
- Card-in-card for decoration
- Stat ribbons / pill clusters without action
- Mobile-first layouts (out of v1 scope)
- Arbitrary spacing / font sizes
- Marketing hero inside operational screens

## Motion

- 120–200ms transitions on `transform`, `opacity`
- `prefers-reduced-motion: reduce` → disable or instant
- Active primary: `scale(0.98)` max — no bounce

## Files

- Tokens live in `styles.css` `:root` and theme block.
- Structure/classes in `app.js` — match BEM-like or existing class names; don't invent parallel systems.

## Source specs (New repo)

- `docs/design/visual/VIS-200-tokens.md`
- `docs/design/visual/VIS-201-density.md`
- `docs/design/visual/VIS-202-shell-brand.md`

**Maintainer:** update this file when VIS-* changes; offer to save after major visual iterations.
