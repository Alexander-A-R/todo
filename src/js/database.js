import {Todo} from './index.js'

function toggleStatus(id) {
	const query = new Parse.Query(Todo);

	query.equalTo('objectId', id);

	return query.first().then(todo => {
		const status = todo.get('status') == 'shedule' ? 'current' : 'shedule';

		todo.set('status', status);
		return todo.save();
		
	}).catch(err => console.log(err));
}

function asyncAddTodo(todoFromForm) {
	const todo = new Todo();

	todo.set('title', todoFromForm.title);
	todo.set('description', todoFromForm.description);
	todo.set('status', todoFromForm.status);

	return todo.save();
}

export {toggleStatus, asyncAddTodo}