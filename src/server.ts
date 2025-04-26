import App from './app';
import dotenv from 'dotenv';
import { createServer } from 'http';
import WebSocketService from '@utils/websocket';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = new App().app;
const server = createServer(app);

const wss = new WebSocketService(server);

app.set('wss', wss);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});