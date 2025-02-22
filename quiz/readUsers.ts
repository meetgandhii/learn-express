import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { User } from './types';

const router = express.Router();
const dataFile = path.resolve(__dirname, '../data/users.json');

// Middleware to load users
router.use(async (req: Request, res: Response, next) => {
  try {
    const data = await fsPromises.readFile(dataFile);
    req.body.users = JSON.parse(data.toString());
    next();
  } catch (err) {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

// Route to get usernames
router.get('/usernames', (req: Request, res: Response) => {
  const users: User[] = req.body.users;
  const usernames = users.map(user => ({ id: user.id, username: user.username }));
  res.json(usernames);
});

export default router;
