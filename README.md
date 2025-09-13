# Shelf Frontend

Frontend client for the **Shelf App** — a vinyl collection manager.  
This app allows users to authenticate, browse their albums, and visualize storage shelves in a simple 2D grid layout.

---

## 📌 Features (MVP)
- User authentication (integrates with Shelf Auth service).
- CRUD UI for shelves, storage items, and slots.
- CRUD UI for albums, releases, mediums, and user albums.
- 2D visualization of shelves using `react-konva`.
- Global state management with TanStack Query + Zustand.
- Form handling with React Hook Form + Zod validation.

---

## 🛠 Tech Stack
- [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) for UI
- [TanStack Query](https://tanstack.com/query/latest) for server state
- [Zustand](https://github.com/pmndrs/zustand) for local state
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) for validation
- [react-konva](https://konvajs.org/docs/react/index.html) for shelf visualization
- [next-intl](https://next-intl-docs.vercel.app/) for i18n (planned)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 20
- npm (or pnpm/yarn)

### Install
```bash
cd frontend
npm install
