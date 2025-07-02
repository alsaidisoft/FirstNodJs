import { Request, Response, NextFunction } from 'express';

export interface ErrorResponse {
  success: false;
  error: string;
  details?: any;
  stack?: string;
}

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new AppError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message).join(', ');
    error = new AppError(message, 400);
  }

  // Prisma errors
  if (err.code && err.code.startsWith('P')) {
    switch (err.code) {
      case 'P2002':
        error = new AppError('Duplicate field value entered', 400);
        break;
      case 'P2025':
        error = new AppError('Record not found', 404);
        break;
      default:
        error = new AppError('Database error', 500);
    }
  }

  const response: ErrorResponse = {
    success: false,
    error: error.message || 'Server Error'
  };

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
    response.details = error;
  }

  res.status(error.statusCode || 500).json(response);
};
