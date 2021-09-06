import https from 'https';
import fs from 'fs';
import { Server } from 'socket.io';

import { logger } from './logger.js';

const PORT = process.env.PORT || 3000;

const localHostSSL = {
  key: fs.readFileSync('./certificates/key.pem'),
  cert: fs.readFileSync('./certificates/cert.pem'),
};

const server = https.createServer(localHostSSL, (request, response) => {
  response.end('Hello, World!');
});

const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: false,
  },
});

io.on('connection', (socket) => logger.info(`${socket.id} connected.`));

const startServer = () => {
  const { address, port } = server.address();
  logger.info(`app running at https://${address}:${port}`);
};

server.listen(PORT, startServer);
