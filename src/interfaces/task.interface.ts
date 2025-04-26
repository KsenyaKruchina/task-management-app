export interface Task {
    id: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTaskDto {
    description: string;
}

export interface UpdateTaskDto {
    description?: string;
    completed?: boolean;
}