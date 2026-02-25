# Shelf Frontend

Frontend client for the **Shelf App** — a vinyl collection manager.

This application handles user authentication and serves as the main UI layer
for interacting with Shelf backend services.

---

## 📌 Current Scope (MVP Foundation)

At this stage the frontend includes:

- Authentication integration with **Shelf Auth Service**
- Access token stored in memory (not localStorage)
- Refresh token handled via httpOnly cookie
- Automatic refresh on 401 responses
- Guarded routes for authenticated areas (`/app`)
- TanStack Query global configuration
- Zustand-based auth state machine
- Docker support for local development

---

## 🔐 Authentication Flow

The frontend integrates with the Shelf Auth Service using the following model:

1. **Login**
   - `POST /login`
   - Returns `access_token`
   - Sets `refresh_token` as httpOnly cookie
   - Access token stored in memory

2. **Authenticated Requests**
   - Access token sent via `Authorization: Bearer`
   - Shelf API validates JWT via JWKS

3. **Token Expiration**
   - If access token expires → 401
   - Frontend automatically calls `POST /refresh`
   - New access token stored in memory
   - Original request retried

4. **Logout**
   - `POST /logout`
   - Clears refresh cookie
   - Clears access token in memory
   - Redirects to `/login`

5. **Route Guard**
   - `/app` is protected
   - Unauthenticated users redirected to `/login`

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- [TailwindCSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)

> UI component system and CI tooling will be introduced in future tasks.

---

## 📂 Project Structure
