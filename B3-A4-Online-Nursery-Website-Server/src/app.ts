import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//Using json parser by express and cors parser
app.use(express.json());

// app.use(cors({ origin: '*' }));

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://blooms-and-beyond.vercel.app',
      'https://b3-a4-online-nursery-website-client.vercel.app',
    ],
    credentials: true,
  }),
);

//application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server Started');
});

//not found route
app.all('*', notFound);

//Using global error handler
app.use(globalErrorHandler);

export default app;
