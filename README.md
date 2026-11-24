# JobTrack
Full-stack career application tracker. React/Vite, Express, MongoDB, JWT and bcrypt. Responsive dashboard, search, filters, per-user CRUD, interview scheduling fields and notes. Accounts have separate application records. Session tokens are kept in memory; refreshing requires signing in again.

## Local setup (Windows PowerShell)
Install Node.js 20+ and MongoDB Community Server (running locally), or obtain a MongoDB Atlas connection string.

Terminal 1:
```powershell
cd server
npm install
Copy-Item .env.example .env
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```
Paste the generated secret into JWT_SECRET in server/.env; adjust MONGODB_URI if using Atlas. Then run `npm run dev`.

Terminal 2 (from project root):
```powershell
cd client
npm install
npm run dev
```
Open http://localhost:5173. Register an account, add an application, edit status, search, delete, sign out and sign in to verify persistence. Register a second account to verify isolation.

## Deployment
Deploy server to a Node hosting provider with MongoDB Atlas. Set MONGODB_URI, JWT_SECRET and CLIENT_ORIGIN to the actual frontend origin. Deploy client on Vercel with root directory client, Vite preset, build npm run build, output dist, and VITE_API_URL set to the HTTPS backend URL ending in /api. Never commit .env. For production add rate limiting, email verification, password recovery, operational monitoring and security testing. This is a portfolio starter, not a hardened production service.
