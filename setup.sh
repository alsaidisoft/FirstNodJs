#!/bin/bash

echo "🚀 Starting Citizen Feedback Platform Development Environment"
echo "============================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You can still run the application without Docker."
    echo "   To use Docker, please install Docker and Docker Compose."
fi

echo "📦 Installing dependencies..."

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo "🔧 Setting up environment..."

# Copy environment files if they don't exist
if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo "✅ Created .env.local file. Please update with your configuration."
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env file. Please update with your configuration."
fi

echo "🗄️  Setting up database..."
cd backend

# Generate Prisma client
npx prisma generate

# Check if DATABASE_URL is configured
if grep -q "postgresql://username:password@localhost:5432/citizen_feedback" .env; then
    echo "⚠️  Please update your DATABASE_URL in backend/.env with your actual database credentials."
    echo "   You can use Docker to start a PostgreSQL database:"
    echo "   docker run --name citizen-feedback-db -e POSTGRES_PASSWORD=postgres123 -e POSTGRES_DB=citizen_feedback -p 5432:5432 -d postgres:15"
fi

cd ..

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update environment variables in .env.local and backend/.env"
echo "2. Start your PostgreSQL database"
echo "3. Run database migrations: cd backend && npx prisma db push"
echo "4. Start the development server:"
echo "   Option A (with Docker): docker-compose up --build"
echo "   Option B (without Docker): npm run dev:full"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   API Health: http://localhost:5000/health"
echo ""
echo "Happy coding! 🎯"
