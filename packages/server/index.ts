import cors from 'cors';
import path from 'path';
import express from 'express';

import cookieParser from 'cookie-parser';

import { PORT, CLIENT_ORIGIN } from './config';
import { checkoutRouter } from './routes';

export const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Issue is here, I am only sending back index.html when I should send back an file requested

const root = path.join(__dirname, '../client', 'build');
app.use(express.static(root));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root });
  console.log('requested index.html');
});
app.get('/:component', (req, res) => {
  res.sendFile('index.html', { root });
  console.log('requested component page');
});

app.use('/api/checkout', checkoutRouter);

app.listen(PORT, () => {
  console.log('Your app is listening on port', PORT);
  console.log('Client origin', CLIENT_ORIGIN);
});
