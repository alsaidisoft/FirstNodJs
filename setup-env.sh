#!/bin/bash

# Create .env file from Heroku environment variables
echo "Creating .env file from Heroku environment variables..."

# Backend .env
cd backend
echo "PORT=$PORT" > .env
echo "NODE_ENV=production" >> .env
echo "DATABASE_URL=$DATABASE_URL" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "JWT_EXPIRES_IN=$JWT_EXPIRES_IN" >> .env
echo "CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME" >> .env
echo "CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY" >> .env
echo "CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET" >> .env
echo "EMAIL_HOST=$EMAIL_HOST" >> .env
echo "EMAIL_PORT=$EMAIL_PORT" >> .env
echo "EMAIL_USER=$EMAIL_USER" >> .env
echo "EMAIL_PASS=$EMAIL_PASS" >> .env
echo "EMAIL_FROM=$EMAIL_FROM" >> .env
echo "TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID" >> .env
echo "TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN" >> .env
echo "TWILIO_PHONE_NUMBER=$TWILIO_PHONE_NUMBER" >> .env
echo "FRONTEND_URL=$FRONTEND_URL" >> .env

# Root .env for Next.js
cd ..
echo "NEXT_PUBLIC_API_URL=/api" > .env.local

echo "Environment files created successfully."
