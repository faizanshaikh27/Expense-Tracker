const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/connectDb');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5002;

connectDb()
app.use(express.json());
app.use(errorHandler);
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});