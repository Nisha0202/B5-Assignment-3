import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';


const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_DB = process.env.MONGO_DB || 'library';


const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.5cua0xk.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;

const MONGO_URI = uri || 'mongodb://localhost:27017/library';
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });