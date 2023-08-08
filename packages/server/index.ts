import cors from 'cors';
import express from 'express';

import cookieParser from 'cookie-parser';

import { CLIENT_ORIGIN, PORT } from './config';
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

app.use('/api/checkout', checkoutRouter);

app.listen(PORT, () => {
  console.log('Your app is listening on port', PORT);
});
