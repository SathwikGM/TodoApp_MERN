import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),// Assign a default value using mongoose.Types.ObjectId
  },
  task: String,
  completed: Boolean,

})

// Create the Mongoose model
export default mongoose.model('Todo', todoSchema);



