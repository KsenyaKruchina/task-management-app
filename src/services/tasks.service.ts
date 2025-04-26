import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDto, UpdateTaskDto } from '../interfaces/task.interface';

class TasksService {
    private tasks: Task[] = [];

    public findAll(): Task[] {
        return this.tasks;
    }

    public findById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    public create(taskData: CreateTaskDto): Task {
        const now = new Date().toISOString();
        const newTask: Task = {
            id: uuidv4(),
            completed: false,
            createdAt: now,
            updatedAt: now,
            ...taskData,
        };

        this.tasks.push(newTask);
        return newTask;
    }

    public update(id: string, taskData: UpdateTaskDto): Task | undefined {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) return undefined;

        const updatedTask = {
            ... this.tasks[index],
            ...taskData,
            updatedAt: new Date().toISOString(),
        };

        this.tasks[index] = updatedTask;
        return updatedTask;
}

public delete(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) return false;

    this.tasks.splice(index, 1);
    return true;
}
}
export default TasksService;