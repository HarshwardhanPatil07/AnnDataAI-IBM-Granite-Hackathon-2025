import { app } from './app';
import { config } from './config/config';
import { setupSocketIO } from './socket';
import http from 'http';

const PORT = config.port;

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
setupSocketIO(server);

// Start the server
server.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
}); 