

function asyncAddTodo(todoFromForm) {

	return fetch('https://parseapi.back4app.com/classes/todo', {
		method: 'post',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key' : 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todoFromForm)
	})
		.then(response => response.json())
		.catch(err => console.log(err));
		
}



function asyncGetTodo(id) {

	return fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'get',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key' : 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})
		.then(response => response.json());

}


function asyncGetAllTodos() {

	return fetch('https://parseapi.back4app.com/classes/todo', {
		method: 'get',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key' : 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})
		.then(response => response.json())
		.then(data => data.results);

}

function asyncDeleteTodo(id) {
	return fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'delete',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key' : 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})
		.then(response => response.json());
}


function asyncSetStatus(id, status) {

	return fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'put',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key' : 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({status})
	});

}


export {asyncAddTodo, asyncGetTodo, asyncGetAllTodos, asyncSetStatus, asyncDeleteTodo}