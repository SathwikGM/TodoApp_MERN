import mongoose from 'mongoose';
import Todo from './todoSchema.js';

mongoose.connect('mongodb://127.0.0.1:27017/todosapp', {

})
  .then(() => {
    console.log('Connected to MongoDB');
    // Proceed to the next step after the connection is established
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const seedDb = async () => {
  await Todo.deleteMany({});
  const todos = [
    { task: 'Complete assignment', completed: true },
    { task: 'Buy groceries', completed: false },
    // Add more todo objects as needed
  ];
  await Todo.create(todos);

}
seedDb();