#!/bin/bash

# Print environment for debugging (without sensitive values)
echo "Node environment: $NODE_ENV"
echo "PORT: $PORT"
echo "Has DATABASE_URL: $(if [ -n "$DATABASE_URL" ]; then echo "Yes"; else echo "No"; fi)"
echo "Has JWT_SECRET: $(if [ -n "$JWT_SECRET" ]; then echo "Yes"; else echo "No"; fi)"

# Install ts-node globally for the db check
echo "Installing ts-node globally..."
npm install -g typescript ts-node

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

# Print environment file for debugging (without sensitive values)
echo "Created .env with the following variables:"
echo "PORT: $(grep PORT .env | cut -d= -f2)"
echo "NODE_ENV: $(grep NODE_ENV .env | cut -d= -f2)"
echo "Has DATABASE_URL: $(if grep -q DATABASE_URL .env; then echo "Yes"; else echo "No"; fi)"
echo "Has JWT_SECRET: $(if grep -q JWT_SECRET .env; then echo "Yes"; else echo "No"; fi)"

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Try to run database check if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Running database check..."
  ts-node src/dbCheck.ts || echo "Database check failed but continuing"
else
  echo "Skipping database check because DATABASE_URL is not set"
fi

# Return to root directory
cd ..

# Create Next.js environment file
echo "Creating Next.js .env.production file..."
cat > .env.production << EOL
NEXT_PUBLIC_API_URL=/api
EOL

echo "Setup completed."
