import express, { Express } from 'express';
import cors from 'cors';
import userRouter from './readUsers';
import writeUserRouter from './writeUsers';

const app: Express = express();
const port: number = 8000;

// Middleware we use for CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount modular routes here
app.use('/users', userRouter);
app.use('/users', writeUserRouter);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
