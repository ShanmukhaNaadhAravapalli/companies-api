# Companies Management System

Backend application for managing company data with advanced filtering, search, and CRUD operations. Built with Node.js, Express, MongoDB.

## 🚀 Features

### Backend API
- **RESTful API** with Express.js and MongoDB
- **Advanced Filtering** by industry, country, place, employee count, revenue, and founded year
- **Full-text Search** across company name, industry, country, and place
- **Pagination** with customizable page size
- **Sorting** by multiple fields (name, employees, revenue, founded year)
- **Input Validation** and error handling
- **CORS Support** for frontend integration

## 📋 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn** package manager
- **Postman** (for API testing)

## 🛠️ Installation & Setup

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd companies-management-system
```

### 2. Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### 3. Environment Configuration
Create `.env` file in backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/companies_db
NODE_ENV=development
```

### 4. Database Setup
```bash
# Start MongoDB (if running locally)
mongod

# Seed database with sample data
npm run seed
```

### 5. Start Backend Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will start on `http://localhost:5000`
