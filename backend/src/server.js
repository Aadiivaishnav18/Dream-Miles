import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  ✈️  DREAM MILES BACKEND SERVER RUNNING         `);
  console.log(`  🌐  PORT: ${PORT}                               `);
  console.log(`  🔗  API: http://localhost:${PORT}/api/v1       `);
  console.log(`=================================================`);
});
