import request from 'supertest';
import App from '../app';
import TasksService from '../services/tasks.service';

describe('Tasks API', () => {
  let app: any;
  let tasksService: TasksService;

  beforeAll(() => {
    app = new App().app;
    tasksService = new TasksService();
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const response = await request(app).get('/tasks');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', async () => {
      const taskData = { description: 'Test task' };
      const response = await request(app).post('/tasks').send(taskData);
      
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.description).toBe(taskData.description);
      expect(response.body.data.completed).toBe(false);
    });

    it('should return 400 if description is empty', async () => {
      const response = await request(app).post('/tasks').send({ description: '' });
      expect(response.status).toBe(400);
      expect(response.body.errors[0].field).toBe('description');
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task by id', async () => {
      const task = tasksService.create({ description: 'Test task' });
      const response = await request(app).get(`/tasks/${task.id}`);
      
      expect(response.status).toBe(200);
      expect(response.body.data.id).toBe(task.id);
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app).get('/tasks/non-existent-id');
      expect(response.status).toBe(404);
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task', async () => {
      const task = tasksService.create({ description: 'Test task' });
      const updateData = { description: 'Updated task', completed: true };
      const response = await request(app).put(`/tasks/${task.id}`).send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body.data.description).toBe(updateData.description);
      expect(response.body.data.completed).toBe(updateData.completed);
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app).put('/tasks/non-existent-id').send({ description: 'Updated' });
      expect(response.status).toBe(404);
    });

    it('should return 400 if validation fails', async () => {
      const task = tasksService.create({ description: 'Test task' });
      const response = await request(app).put(`/tasks/${task.id}`).send({ description: '' });
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const task = tasksService.create({ description: 'Test task' });
      const response = await request(app).delete(`/tasks/${task.id}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 if task not found', async () => {
      const response = await request(app).delete('/tasks/non-existent-id');
      expect(response.status).toBe(404);
    });
  });
});