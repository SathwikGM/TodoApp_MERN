import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
import Todo from './todoSchema.js';

import cors from 'cors';

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// Connect to MongoDB server
mongoose.connect('mongodb://127.0.0.1:27017/todosapp', {

})
  .then(() => {
    console.log('Connected to MongoDB');
    // Proceed to the next step after the connection is established
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });



app.get('/', function (req, res) {
  res.send('Hello World');
})


app.get('/todos', async (req, res) => {
  const todos = await Todo.find({});
  res.json(todos);
})

// Creating new Todo
app.post('/addTodo', async (req, res) => {
  const { task, completed } = req.body;
  try {
    const newTodo = await new Todo({
      task,
      completed
    });

    await newTodo.save();
    res.sendStatus(204);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
})

// updating existing todo

app.put('/todos/update', async (req, res) => {
  const { id, task, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, { task, completed }, { new: true });
    res.sendStatus(204);
    // return updatedTodo;
    console.log(updatedTodo)
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
})

// Deleting Todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = await req.params;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }

});

app.listen(port, () => {
  console.log(`listening on ${port}`);
})