# Streak Tracker

A full-stack application to track daily learning streaks with interactive IQ questions and random facts.

## Features

- 📊 Daily streak tracking
- 🧩 Interactive IQ questions
- 📚 Random interesting facts
- 🌓 Light/Dark mode support
- 📱 Responsive design

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas
- **Authentication**: JWT

## Prerequisites

- Node.js (v18.16.1 or higher)
- MongoDB Atlas account
- npm or yarn

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyalgattani/streak-tracker.git
   cd streak-tracker
   ```

2. **Set up MongoDB Atlas**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - In "Network Access", add your IP address or allow all IPs (0.0.0.0/0)
   - In "Database Access", create a user with read/write permissions
   - Get your connection string from "Connect" button

3. **Configure Environment Variables**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_jwt_secret
   ```

4. **Install Dependencies**

   Server:
   ```bash
   cd server
   npm install
   ```

   Client:
   ```bash
   cd client
   npm install
   ```

5. **Seed the Database**
   ```bash
   cd server
   node scripts/seedIQQuestions.js
   ```

6. **Start the Application**

   Start the server:
   ```bash
   cd server
   node index.js
   ```

   In a new terminal, start the client:
   ```bash
   cd client
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Usage

1. **Create an Account**
   - Sign up with your email and username
   - Log in to access your dashboard

2. **Track Your Streak**
   - Answer daily IQ questions or read random facts
   - Maintain your streak by logging in daily
   - View your progress in the calendar

3. **Features**
   - Switch between IQ questions and random facts
   - View your current and longest streaks
   - Track your daily progress
   - Toggle between light and dark modes

## API Endpoints

- `GET /api/questions/random` - Get random questions
- `GET /api/streak/:userId` - Get user's streak info
- `POST /api/streak/:userId` - Update user's streak
- `POST /api/users` - Create new user
- `GET /api/users` - Get all users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors
- Inspired by learning and productivity apps
- Built with ❤️ using modern web technologies 