const mongoose = require('mongoose');
const { User } = require('./models/user'); // Adjust path if needed
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    const user = new User({
      email: 'test@example.com',
      password: 'hashedpassword123', // Use bcrypt to hash passwords in production
    });

    await user.save();
    console.log('User seeded successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
