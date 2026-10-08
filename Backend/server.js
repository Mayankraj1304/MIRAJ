import connectDB from './src/config/db.js';
import app from './src/app.js';
import {config} from './src/config/config.js'


// Connect to MongoDB
connectDB();


// Start server
const server = app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
