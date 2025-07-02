import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function checkDatabase() {
  console.log('Testing database connection...');
  
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set');
    process.exit(1);
  }

  console.log(`Database URL: ${process.env.DATABASE_URL.substring(0, 15)}...`);

  const prisma = new PrismaClient();

  try {
    // Try to connect to the database
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Try to query the database
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query successful:', result);
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkDatabase();
