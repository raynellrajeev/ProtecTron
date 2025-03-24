# ProtecTron

A modern desktop security application built with Electron with React for the frontend and Django for the backend, featuring system scanning, RAM optimization, and security education.

## Features

- 🛡️ System Security Scanning
- 🚀 RAM Optimization
- 📊 System Resource Monitoring
- 📝 Security Education Quizzes
- ⚙️ Customizable Settings
- 👤 User Profile Management

## Tech Stack

### Frontend:

- **Electron** (with React)
- **Tailwind CSS**, **Framer Motion**, **Material-UI**, **Shadcn UI**, **Aceternity UI**

### Backend:

- **Django (DRF)**
- **SQLite**
- **django-cors-headers**

## Prerequisites

- **Node.js** (v14 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd electron-app
```

2. Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

## Building

Build for your target platform:

```bash
# For Windows
npm run build:win

# For macOS
npm run build:mac

# For Linux
npm run build:linux
```

## Project Structure

```
protecTron-App/
├── django-app/         # Django backend
│   ├── api/            # Django REST Framework APIs
|   ├── backend/
|   ├── .gitignore
│   ├── manage.py       # Django CLI
│   └── db.sqlite3      # Database
│
├──  electron-app/
|   ├── src/
|   │   ├── main/           # Electron main process
|   │   ├── preload/        # Preload scripts
|   │   └── renderer/       # React application
|   │       ├── src/
|   |       |   ├── App.jsx
|   |       |   ├── main.jsx
|   │       │   ├── assets/     # Static assets
|   │       │   ├── components/ # React components
|   |       |   ├── context/
|   │       │   ├── pages/      # Application pages
|   │       │   └── lib/        # Utility functions
|   │       ├──index.html
|   |       └──index.js
|   ├── .gitignore
|   └── package.json
│
├── venv/               # Virtual environment (ignored in Git)
├── .gitignore
├── README.md
└── requirements.txt
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is Open Source.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
