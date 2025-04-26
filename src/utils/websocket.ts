import { WebSocketServer } from 'ws';
import { Task } from '../interfaces/task.interface';

export enum TaskEvent {
  CREATED = 'task_created',
  UPDATED = 'task_updated',
  DELETED = 'task_deleted'
}

export interface TaskEventMessage {
  event: TaskEvent;
  payload: Task | { id: string };
}

class WebSocketService {
  private wss: WebSocketServer;

  constructor(server: any) {
    this.wss = new WebSocketServer({ server });
    this.setupConnection();
  }

  private setupConnection() {
    this.wss.on('connection', ws => {
      console.log('New WebSocket client connected');
      
      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  public broadcast(message: TaskEventMessage) {
    this.wss.clients.forEach(client => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

export default WebSocketService;