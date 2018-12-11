const mongoose = require('mongoose');
const TodoItemSchema = new mongoose.Schema({
	title: String,
	description: String
});
module.exports = mongoose.model('TodoItem', TodoItemSchema);
