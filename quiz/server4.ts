import express, { Express } from 'express';

const app: Express = express();
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
