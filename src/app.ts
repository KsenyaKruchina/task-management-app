import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import TasksController from './controllers/tasks.controller';
import errorMiddleware from './middlewares/error.middleware';
import taskValidation from './middlewares/validation.middleware';

class App {
  public app: express.Application;
  public tasksController: TasksController;

  constructor() {
    this.app = express();
    this.tasksController = new TasksController();

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    const router = express.Router();

    router.get('/tasks', this.tasksController.getAll);
    router.get('/tasks/:id', this.tasksController.getById);
    router.post('/tasks', [taskValidation.create, this.tasksController.create.bind(this.tasksController)]);
    router.put('/tasks/:id', [taskValidation.update, this.tasksController.update.bind(this.tasksController)]);
    router.delete('/tasks/:id', this.tasksController.delete.bind(this.tasksController));

    this.app.use('/', router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;