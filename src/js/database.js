
async function asyncAddTodo(todoFromForm) {
	
	const response = await fetch('https://parseapi.back4app.com/classes/todo', {
		method: 'post',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todoFromForm)
	})

	if (!response.ok) {
		const error = new Error(`status: ${response.status}`)
		error.name = 'ServerCommunicationError';
		throw error;
	} else return response.json();

}



async function asyncGetTodo(id) {

	const response = await fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'get',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})

	if (!response.ok) {
		const error = new Error(`status: ${response.status}`)
		error.name = 'ServerCommunicationError';
		throw error;
	} else return response.json();

}


async function asyncGetAllTodos() {

	const response = await fetch('https://parseapi.back4app.com/classes/todo', {
		method: 'get',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})
		if (!response.ok) {
		const error = new Error(`status: ${response.status}`)
		error.name = 'ServerCommunicationError';
		throw error;
	} else {
		const data = await response.json()
		return data.results;
	}

}

async function asyncDeleteTodo(id) {
	const response = await fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'delete',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5'
		}
	})
	if (!response.ok) {
		const error = new Error(`status: ${response.status}`)
		error.name = 'ServerCommunicationError';
		throw error;
	} else return response;
}


async function asyncSetStatus(id, status) {

	const response = await fetch(`https://parseapi.back4app.com/classes/todo/${id}`, {
		method: 'put',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({status})
	});

	if (!response.ok) {
		const error = new Error(`status: ${response.status}`)
		error.name = 'ServerCommunicationError';
		throw error;
	} else return response.json();

}


export {asyncAddTodo, asyncGetTodo, asyncGetAllTodos, asyncSetStatus, asyncDeleteTodo}