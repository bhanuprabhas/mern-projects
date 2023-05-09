const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }
}, { collection: 'Tasks' });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
