# 🚀 CI/CD Pipeline with TurboRepo, Docker & PostgreSQL

A complete **monorepo-based CI/CD pipeline** built with **TurboRepo**, **Docker**, **PostgreSQL**, and **GitHub Actions** — for modern full-stack apps using best practices.

---

## 📁 Project Structure

```
ci-cd-pipeline/
├── apps/                # Frontend/backend applications
├── packages/            # Shared packages (utils, config, etc)
├── docker/              # Dockerfiles and configs
├── .github/workflows/   # GitHub Actions workflows
├── .env.example         # Environment variable templates
├── turbo.json           # TurboRepo configuration
├── package.json         # Root package config
```

---

## 🛠️ Getting Started

### 🔄 Clone the Repo

```bash
git clone https://github.com/Waqar-ahmedkhan/ci-cd-pipeline.git
cd ci-cd-pipeline
```

### 📦 Install Dependencies

```bash
npm install
```

### 🐘 Start PostgreSQL (Local or Cloud)

#### Option 1: Local Docker

```bash
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

#### Option 2: Use [Neon](https://neon.tech/) (Cloud DB)

---

### 🔐 Setup Environment Variables

Copy `.env.example` in all apps/packages to `.env`, then update values:

```bash
cp .env.example .env
```

---

### 🧬 Prisma Setup (DB Migrations)

```bash
cd packages/db
npx prisma migrate dev
npx prisma db seed
```

---

### 🚀 Run the App

```bash
cd apps/user-app
npm run dev
```

Try logging in:

* **Phone:** `1111111111`
* **Password:** `alice`

(See `seed.ts` for more test users)

---

## 🧪 Run with Docker (Production Ready)

```bash
docker build -t my-fullstack-app .
docker run -p 3000:3000 my-fullstack-app
```

---

## ⚙️ GitHub Actions CI/CD

* Located in `.github/workflows`
* Automated build, test, deploy on push
* Linting & formatting integrated

---

## 📚 Technologies Used

* 🧱 **TurboRepo** — Monorepo management
* 🐳 **Docker** — Containerization
* 🐘 **PostgreSQL** — Relational Database
* 🛠️ **Prisma** — ORM
* ☁️ **GitHub Actions** — CI/CD
* 🧑‍💻 **Next.js / Express** — App layer (based on app type)

---

## 👤 Author

**Waqar Ahmed Khan**
🔗 GitHub: [@Waqar-ahmedkhan](https://github.com/Waqar-ahmedkhan)
🌍 Location: Islamabad, Pakistan
🧠 Building: ML models, Agentic AI, and full-stack DevOps systems

---

## 📄 License

This project is licensed under the MIT License.

---

## ⭐️ Support & Contributions

Star ⭐️ this repo and feel free to fork/PR if you'd like to contribute!

---
