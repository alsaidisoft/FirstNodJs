import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/feedback - Get all feedback (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = category;
    if (status) where.status = status;

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true }
          },
          responses: {
            include: {
              user: {
                select: { id: true, name: true, role: true }
              }
            }
          },
          votes: true,
          tags: {
            include: { tag: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.feedback.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        feedbacks,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feedback'
    });
  }
});

// POST /api/feedback - Create new feedback
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      category,
      location,
      images,
      isAnonymous,
      userId
    } = req.body;

    // Validation
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        error: 'Title, description, and category are required'
      });
    }

    const feedback = await prisma.feedback.create({
      data: {
        title,
        description,
        category,
        location,
        images: images || [],
        isAnonymous: isAnonymous || false,
        userId: isAnonymous ? null : userId
      },
      include: {
        user: {
          select: { id: true, name: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create feedback'
    });
  }
});

// GET /api/feedback/:id - Get single feedback
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true }
        },
        responses: {
          include: {
            user: {
              select: { id: true, name: true, role: true }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        votes: true,
        tags: {
          include: { tag: true }
        }
      }
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        error: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      data: feedback
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feedback'
    });
  }
});

// GET /api/feedback/stats - Get feedback statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const [
      totalFeedbacks,
      pendingFeedbacks,
      inProgressFeedbacks,
      resolvedFeedbacks
    ] = await Promise.all([
      prisma.feedback.count(),
      prisma.feedback.count({ where: { status: 'PENDING' } }),
      prisma.feedback.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.feedback.count({ where: { status: 'RESOLVED' } })
    ]);

    res.json({
      success: true,
      data: {
        total: totalFeedbacks,
        pending: pendingFeedbacks,
        inProgress: inProgressFeedbacks,
        resolved: resolvedFeedbacks
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics'
    });
  }
});

export default router;
