import express from 'express';
import books from './routes/book.route';
import borrow from './routes/borrow.route';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api', books);
app.use('/api', borrow);

// Error handler (must be last)
app.use(errorHandler);

export default app;