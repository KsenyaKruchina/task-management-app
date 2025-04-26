import { Request, Response } from 'express';
import TasksService from '@services/tasks.service';
import { Task, CreateTaskDto, UpdateTaskDto } from '@interfaces/task.interface';

class TasksController {
  private tasksService = new TasksService();

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks: Task[] = this.tasksService.findAll();
      res.status(200).json({ data: tasks, message: 'findAll' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;
      const task: Task | undefined = this.tasksService.findById(taskId);

      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json({ data: task, message: 'findOne' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskData: CreateTaskDto = req.body;
      const newTask: Task = this.tasksService.create(taskData);
      res.status(201).json({ data: newTask, message: 'created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;
      const taskData: UpdateTaskDto = req.body;
      const updatedTask: Task | undefined = this.tasksService.update(taskId, taskData);

      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(200).json({ data: updatedTask, message: 'updated' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;
      const isDeleted = this.tasksService.delete(taskId);

      if (!isDeleted) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default TasksController;