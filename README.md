# Paradigm Website

A modern AI assistant platform that provides personal AI assistance with screen viewing, call listening, and contextual understanding capabilities.

## 🚀 Features

- **AI Context Management**: Create and manage AI contexts for different scenarios
- **Activity Tracking**: Monitor and review AI interactions and sessions
- **User Authentication**: Secure login/signup with Firebase Auth (Google, GitHub, Email)
- **Responsive Design**: Modern UI with Tailwind CSS and smooth animations
- **Real-time Updates**: Live activity monitoring and context updates

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: Firebase Auth
- **Icons**: Lucide React, Tabler Icons
- **Animations**: Motion (Framer Motion)

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Authentication**: Firebase Admin SDK
- **Security**: Helmet, CORS, Rate Limiting
- **Validation**: Joi
- **Logging**: Morgan

## 📁 Project Structure

```
website/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── dashboard/   # Dashboard components
│   │   │   ├── home/        # Landing page components
│   │   │   └── UI/          # Reusable UI components
│   │   └── lib/             # Utilities and services
│   └── public/              # Static assets
└── backend/                 # Express.js API server
    ├── src/
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Express middleware
    │   ├── routes/          # API routes
    │   ├── types/           # TypeScript type definitions
    │   └── utils/           # Utility functions
    └── config/              # Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project setup

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# JWT Secret
JWT_SECRET=your_jwt_secret
```

4. Run the development server:
```bash
npm run dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

## 🔐 Authentication

The application supports multiple authentication methods:
- **Email/Password**: Traditional email and password authentication
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account

All authentication is handled through Firebase Auth with backend profile creation.

## 🎨 UI Components

The frontend uses a custom design system with:
- **GradientContainer**: Reusable gradient background component
- **ResizableNavbar**: Responsive navigation with mobile menu
- **Custom Buttons**: Styled buttons with hover effects
- **Dashboard Components**: Activity, Context, and Settings panels

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/social` - Social authentication

### Contexts
- `GET /api/contexts` - Get user contexts
- `POST /api/contexts` - Create new context
- `PUT /api/contexts/:id` - Update context
- `DELETE /api/contexts/:id` - Delete context

### Activities
- `GET /api/activities` - Get user activities
- `GET /api/activities/:id` - Get specific activity
- `POST /api/activities` - Create new activity
- `PUT /api/activities/:id` - Update activity

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Vercel)
1. Configure `vercel.json` for Node.js deployment
2. Set environment variables in Vercel dashboard
3. Deploy using Vercel CLI or GitHub integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, feel free to email or create an issue in the repository.
