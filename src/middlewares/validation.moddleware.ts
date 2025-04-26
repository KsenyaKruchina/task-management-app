import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto, UpdateTaskDto } from '@interfaces/task.interface';

const taskValidation = {
  create: (req: Request, res: Response, next: NextFunction) => {
    const { description }: CreateTaskDto = req.body;

    if (!description || typeof description !== 'string' || description.trim() === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [
          {
            field: 'description',
            rule: 'isNotEmpty',
            message: 'Description cannot be empty'
          }
        ]
      });
    }

    next();
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    const { description, completed }: UpdateTaskDto = req.body;

    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [
          {
            field: 'description',
            rule: 'isNotEmpty',
            message: 'Description cannot be empty'
          }
        ]
      });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: [
          {
            field: 'completed',
            rule: 'isBoolean',
            message: 'Completed must be a boolean'
          }
        ]
      });
    }

    next();
  }
};

export default taskValidation;