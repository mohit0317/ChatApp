const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRouter = require('./routes/userRoute');
const chatRouter = require('./routes/chatRoute');
const messageRouter = require('./routes/messageRoute');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error);
  });

  
app.use('/api/users', userRouter);
app.use('/api/chats',chatRouter);
app.use('/api/messages',messageRouter);


app.use((err, req, res, next) => {
  console.error('Server Error:', err); 
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
});
