import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Helper function to generate JWT token
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  } as jwt.SignOptions);
};

// POST /api/auth/register - Register new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    // Generate token
    const token = generateToken(user.id);

    res.status(201).json({
      success: true,
      token,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to register user'
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Account is inactive'
      });
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      token,
      data: userResponse
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to login'
    });
  }
});

// POST /api/auth/guest - Create guest session for anonymous feedback
router.post('/guest', async (req: Request, res: Response) => {
  try {
    // Generate a temporary session token for anonymous users
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    const token = jwt.sign(
      { id: guestId, isGuest: true },
      secret,
      { expiresIn: '24h' } as jwt.SignOptions
    );

    res.json({
      success: true,
      token,
      data: {
        id: guestId,
        isGuest: true,
        role: 'CITIZEN'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create guest session'
    });
  }
});

export default router;
