import express, { Request, Response } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { User } from './types';

const router = express.Router();
const dataFile = path.resolve(__dirname, '../data/users.json');

// Route to add a new user
router.post('/adduser', async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const data = await fsPromises.readFile(dataFile);
    const users: User[] = JSON.parse(data.toString());

    users.push(newUser);

    await fsPromises.writeFile(dataFile, JSON.stringify(users));
    res.status(201).send('User added successfully');
  } catch (err) {
    console.error('Error writing file:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

export default router;
