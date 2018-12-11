'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const TodoItem = require('./todo.model.js');

module.exports.hello = (event, context, callback) => {
	console.log('Hello World');
	callback(null, 'Hello World');
};

module.exports.create = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		TodoItem.create(JSON.parse(event.body))
			.then(todoitem =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(todoitem)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not create the item.'
				})
			);
	});
};

module.exports.getOne = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		TodoItem.findById(event.pathParameters.id)
			.then(todoitem =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(todoitem)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not fetch the item.'
				})
			);
	});
};

module.exports.getAll = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		TodoItem.find()
			.then(todoitems =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(todoitems)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not fetch the items.'
				})
			);
	});
};

module.exports.update = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		TodoItem.findByIdAndUpdate(
			event.pathParameters.id,
			JSON.parse(event.body),
			{
				new: true
			}
		)
			.then(todoitem =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify(todoitem)
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not update the items.'
				})
			);
	});
};

module.exports.delete = (event, context, callback) => {
	context.callbackWaitsForEmptyEventLoop = false;

	connectToDatabase().then(() => {
		TodoItem.findByIdAndRemove(event.pathParameters.id)
			.then(todoitem =>
				callback(null, {
					statusCode: 200,
					body: JSON.stringify({
						message: 'Removed note with id: ' + todoitem._id,
						todoitem: todoitem
					})
				})
			)
			.catch(err =>
				callback(null, {
					statusCode: err.statusCode || 500,
					headers: { 'Content-Type': 'text/plain' },
					body: 'Could not delete the item.'
				})
			);
	});
};
