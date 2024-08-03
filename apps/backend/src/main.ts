/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

//Setting up low DB
const userFile = path.join(__dirname, 'db', 'users.json');
const productFile = path.join(__dirname, 'db', 'products.json');
const categoryFile = path.join(__dirname, 'db', 'categories.json');

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
