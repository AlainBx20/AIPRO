# AI Chat Application

A modern chat application with AI integration built using React, TypeScript, and Node.js.

## Features

- Real-time chat interface
- AI-powered responses using OpenRouter API
- User authentication
- Chat history
- Responsive design
- Modern UI with glassmorphism effects

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenRouter API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-chat-app
```

2. Install dependencies:
```bash
npm run install-all
```

3. Create environment files:

For backend (backend/.env):
```
PORT=3001
OPENROUTER_API_KEY=your_api_key_here
```

For frontend (frontend/.env):
```
VITE_API_URL=http://localhost:3001
```

## Development

To run both frontend and backend in development mode:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3001`

## Production Build

To create production builds:
```bash
npm run build
```

## Deployment

### Backend Deployment

1. Set up your production environment variables
2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production server:
```bash
npm start
```

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the contents of the `dist` folder to your hosting service

## Project Structure

```
ai-chat-app/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.tsx
│   └── package.json
├── backend/            # Node.js backend
│   ├── src/
│   │   ├── routes/
│   │   └── server.ts
│   └── package.json
├── package.json        # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 