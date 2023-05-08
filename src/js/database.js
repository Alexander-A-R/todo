Parse.initialize("8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO", "6UVmjTt70CtVpH02CQw3VF7Mll9C99kKQ8hz43ji"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
const Todo = Parse.Object.extend('todo');

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

function getAllTodos() {

	const allTodos = {};
	const query = new Parse.Query(Todo);

	return query.find().then(todos => {
		for (let todo of todos) {
			allTodos[todo.id] = {
				id: todo.id,
				title: todo.get('title'),
				description: todo.get('description'),
				status: todo.get('status')
			}
		}
		return allTodos;
	})

}

function parseFromBack(fromBack) {
	return {
		status: fromBack.get('status'),
		description: fromBack.get('description'),
		title: fromBack.get('title'),
		id: fromBack.id
	}
}

export {toggleStatus, asyncAddTodo, getAllTodos, parseFromBack}