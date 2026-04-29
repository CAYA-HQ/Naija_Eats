import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mealsRoutes from './routes/meals';

const app: Application = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/', mealsRoutes)

// Routes
pp.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

export default app;
