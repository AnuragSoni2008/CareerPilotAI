# CareerPilot AI 🚀

CareerPilot AI is an AI-powered career preparation platform that helps students and job seekers become interview-ready and career-ready.

## ✨ Features

- 📄 AI-powered Resume Builder
- 🤖 AI Resume Analysis
- 🎯 AI Technical & HR Interview Practice
- 🗺️ Personalized Career Roadmaps
- 📊 Career Progress Dashboard
- 💳 Credit-based AI usage system
- 🔐 Firebase Authentication

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Redux
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Redis
- Docker
- Docker Compose

### AI & Services
- Groq API
- LangGraph
- Firebase Authentication
- Razorpay
- YouTube API

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         │     Web Browser      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      FRONTEND        │
                         │    React + Vite      │
                         │      Port 5173       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     API GATEWAY      │
                         │      Port 8000       │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
       ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
       │    AUTH     │       │   RESUME    │       │  INTERVIEW  │
       │   :6001     │       │   :6002     │       │   :6003     │
       └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
              │                     │                     │
              └─────────────────────┼─────────────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │                         │
                       ▼                         ▼
                ┌─────────────┐           ┌─────────────┐
                │   ROADMAP   │           │   BILLING   │
                │    :6004    │           │    :6005    │
                └──────┬──────┘           └──────┬──────┘
                       │                         │
                       └────────────┬────────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │  External Services   │
                         │                      │
                         │ MongoDB • Redis      │
                         │ Groq • Firebase      │
                         │ Razorpay • YouTube   │
                         └──────────────────────┘
```

## 📁 Project Structure

```text
CareerPilotAI/
├── backend/
│   ├── gateway/
│   ├── services/
│   │   ├── auth/
│   │   ├── billing/
│   │   ├── interview/
│   │   ├── resume/
│   │   └── roadmap/
│   └── shared/
│
├── frontend/
└── README.md
```

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/AnuragSoni2008/CareerPilotAI.git
cd CareerPilotAI
```

### 2. Install dependencies

Install dependencies for the frontend and backend services using `npm install`.

### 3. Configure environment variables

Create the required `.env` files using the provided `.env.example` files.

Never commit API keys, passwords, Firebase credentials, database credentials, or other secrets to GitHub.

### 4. Start the backend

```bash
cd backend
docker compose up
```

### 5. Start the frontend

```bash
cd frontend
npm run dev
```

## 🔌 Development Ports

| Service | Port |
|---|---:|
| Frontend | 5173 |
| API Gateway | 8000 |
| Auth Service | 6001 |
| Resume Service | 6002 |
| Interview Service | 6003 |
| Roadmap Service | 6004 |
| Billing Service | 6005 |

## 🔐 Environment Variables

Environment files containing secrets are intentionally excluded from the repository.

Each relevant service includes an `.env.example` file showing the required configuration.

Do not expose or commit:

- API keys
- MongoDB credentials
- Redis credentials
- Firebase private keys
- Razorpay secrets
- Other production credentials

## 👨‍💻 Author

**Anurag Soni**

B.Tech Computer Science Engineering Student

## 📜 License

This project is currently intended for educational and portfolio purposes.
