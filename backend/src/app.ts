import express from 'express';
import cors from 'cors';
import path from 'path';
import { appConfig } from './Utils/appConfig';
import authController from './Controllers/auth-controller';
import vacationsController from './Controllers/vacations-controller';
import followersController from './Controllers/followers-controller';
import { catchAll } from './Middleware/catch-all';


const server = express();

// Middleware
server.use(cors());

server.use(express.json());

// Routes
server.use('/api', authController);
server.use('/api', vacationsController);
server.use('/api', followersController);

// Static files
server.use('/Assets', express.static(path.join(__dirname, 'Assets')));

// Catch-all error handler
server.use(catchAll);

// Start server
server.listen(appConfig.port, appConfig.host, () => {
  console.log(`Server listening on http://${appConfig.host}:${appConfig.port}`);
});
