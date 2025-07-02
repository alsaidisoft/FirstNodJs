#!/bin/bash

# Print environment for debugging (without sensitive values)
echo "Node environment: $NODE_ENV"
echo "PORT: $PORT"
echo "Has DATABASE_URL: $(if [ -n "$DATABASE_URL" ]; then echo "Yes"; else echo "No"; fi)"
echo "Has JWT_SECRET: $(if [ -n "$JWT_SECRET" ]; then echo "Yes"; else echo "No"; fi)"

# Create .env file from environment variables
cd backend
echo "Creating backend .env file..."
cat > .env << EOL
PORT=${PORT:-5000}
NODE_ENV=${NODE_ENV:-production}
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET:-default_jwt_secret_replace_in_production}
JWT_EXPIRES_IN=${JWT_EXPIRES_IN:-7d}
FRONTEND_URL=${FRONTEND_URL:-*}
EOL

# Run database check
echo "Running database check..."
npm run db:check || echo "Database check failed but continuing"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Return to root directory
cd ..

# Create Next.js environment file
echo "Creating Next.js .env.production file..."
cat > .env.production << EOL
NEXT_PUBLIC_API_URL=/api
EOL

echo "Setup completed."
