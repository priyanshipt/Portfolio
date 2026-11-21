# Priyanshi Trivedi: Portfolio

A dark, minimal MERN portfolio. React, Vite and Tailwind CSS on the frontend; Node, Express and MongoDB on the backend.
Deploys to **Vercel** (frontend), **Railway** (backend) and **MongoDB Atlas** (database).

All content comes from Priyanshi's resume and public GitHub profile. Nothing is invented.

## What the backend does

| Route | Purpose |
|---|---|
| `GET /api/health` | Health check for Railway |
| `GET /api/github` | Public repo count, followers and language mix. Cached for 15 minutes on the server, so the GitHub token (if any) never reaches the browser |
| `POST /api/contact` | Validates, rate limits (5 per hour per IP), saves to MongoDB, then emails Priyanshi if SMTP is configured |

Profile and project content lives in `frontend/src/data/portfolio.js`. It is static, so the page loads instantly and works even if the API is asleep. A database table for it would add nothing.

## Folder structure

```
portfolio/
├── backend/            Express API (Railway)
│   ├── config/         env.js, db.js
│   ├── controllers/    contact, github, health
│   ├── middleware/     validation, rate limits, error handling
│   ├── models/         Contact.js
│   ├── routes/         index.js
│   ├── utils/          mailer.js, cache.js
│   ├── server.js
│   ├── railway.json
│   └── .env.example
└── frontend/           React + Vite + Tailwind (Vercel)
    ├── public/         favicon, robots.txt  (put profile.jpg here)
    ├── src/
    │   ├── components/ Navbar, Footer, Avatar, ProjectCard, ...
    │   ├── sections/   Hero, About, Skills, Projects, Education, GithubActivity, Contact
    │   ├── pages/      Home, NotFound
    │   ├── hooks/      useGithubStats, useInView, useActiveSection
    │   ├── services/   api.js (Axios)
    │   └── data/       portfolio.js  <-- edit content here
    ├── vercel.json
    └── .env.example
```

## Run locally

Requires Node 18.17 or newer.

```bash
# Terminal 1: backend
cd backend
cp .env.example .env        # fill in MONGODB_URI (a local Mongo or an Atlas string works)
npm install
npm run dev                 # http://localhost:5000/api/health

# Terminal 2: frontend
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

## Customize

- **Profile photo:** save a portrait as `frontend/public/profile.jpg` (about 800x1000). The placeholder swaps automatically; the layout does not change.
- **Project screenshots:** save images in `frontend/public/projects/` and add `image: '/projects/name.png'` to the project in `portfolio.js`.
- **Live demo or repo links:** set `demo` or add to `repos` in `portfolio.js`. A button only appears when a link exists.
- **Content:** every text block, skill, project and date is in `frontend/src/data/portfolio.js`.

## Deployment guide

### 1. Push to GitHub

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/priyanshipt/portfolio.git   # create this empty repo on GitHub first
git push -u origin main
```

`.env` files are git-ignored. Never commit them.

### 2. MongoDB Atlas

1. Create a free account and a free **M0** cluster at cloud.mongodb.com.
2. **Database Access** > Add a database user (username and password; save the password).
3. **Network Access** > Add IP address > **Allow access from anywhere** (`0.0.0.0/0`). Railway uses changing IPs, so this is required on the free setup.
4. **Connect** > Drivers > copy the connection string. Replace `<password>` and add the database name before the `?`:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

### 3. Gmail app password (for contact emails)

1. Turn on 2-Step Verification for the Gmail account.
2. Go to myaccount.google.com/apppasswords and create an app password.
3. Use it as `SMTP_PASS`. Never use the normal Gmail password.

Skip this and messages are still saved in MongoDB, just not emailed.

### 4. Backend on Railway

1. railway.com > **New Project** > **Deploy from GitHub repo** > pick the repo.
2. Open the service > **Settings** > **Root Directory** = `backend`.
3. **Variables** tab > add:

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | your Atlas string |
| `CLIENT_ORIGINS` | `https://your-site.vercel.app` (fill in after step 5, then redeploy) |
| `GITHUB_USERNAME` | `priyanshipt` |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `priyanshitrivedi51@gmail.com` |
| `SMTP_PASS` | the app password |
| `MAIL_TO` | `priyanshitrivedi51@gmail.com` |

Railway sets `PORT` itself. Do not add it.

4. **Settings** > **Networking** > **Generate Domain**. Copy the URL, for example `https://portfolio-api-production.up.railway.app`.
5. Check `https://YOUR-RAILWAY-URL/api/health`. You should see `{"status":"ok","database":"connected",...}`.

### 5. Frontend on Vercel

1. vercel.com > **Add New** > **Project** > import the repo.
2. **Root Directory** = `frontend`. Framework preset: Vite (detected). Build command `npm run build`, output `dist`.
3. **Environment Variables**: `VITE_API_URL` = `https://YOUR-RAILWAY-URL/api`
4. Deploy. Copy the Vercel URL.

### 6. Connect them (CORS)

Back in Railway, set `CLIENT_ORIGINS` to the exact Vercel URL, no trailing slash. For a custom domain, list both separated by a comma. Railway redeploys automatically.

Preview deployments on Vercel have different URLs and will be blocked by CORS unless you add them.

### 7. Verify the live site

- [ ] Site loads and every nav link scrolls to its section
- [ ] "Hire me" opens your mail app with a prefilled subject
- [ ] GitHub, LinkedIn and Resume open in a new tab
- [ ] GitHub section shows repo count, followers and languages (needs the API)
- [ ] Send a test message: success text appears, a document appears in Atlas > Browse Collections > `contacts`, and the email arrives
- [ ] Refresh on `/some-bad-url`: you see the 404 page, not a Vercel error
- [ ] Test on a phone

## Security notes

Helmet headers, strict CORS allow-list, 10 KB body limit, input validation and escaping, honeypot field, per-IP rate limiting on contact (5/hour) and on the whole API, plain-text emails only, no secrets in the frontend, generic error messages in production.
