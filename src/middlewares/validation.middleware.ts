import { Request, Response, NextFunction } from 'express';
import { CreateTaskDto, UpdateTaskDto } from '../interfaces/task.interface';

const taskValidation = {
  create: (req: Request, res: Response, next: NextFunction): void => {
    const { description }: CreateTaskDto = req.body;

    if (!description || typeof description !== 'string' || description.trim() === '') {
      res.status(400).json({
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
      return;
    }

    next();
  },

  update: (req: Request, res: Response, next: NextFunction): void => {
    const { description, completed }: UpdateTaskDto = req.body;

    if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
      res.status(400).json({
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
      return;
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      res.status(400).json({
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
      return;
    }

    next();
  }
};

export default taskValidation;