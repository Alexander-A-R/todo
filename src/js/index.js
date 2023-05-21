import '../styles/styles.scss'
import {createModal} from './modal.js'
import {createFormAddTodo} from './form.js'
import {asyncSetStatus, asyncGetTodo, asyncGetAllTodos} from './databaseAPI'
import {renderAllTodos, renderAndInitTodo} from './todoDom.js'
import {errorMessage} from './error.js'
import {showPreloader, hidePreloader} from './preloader.js'
import {LoginPage} from './login.js'



document.addEventListener('DOMContentLoaded', () => {

	if (!localStorage.getItem('sessionToken')) {
		const loginPage = new LoginPage();
		loginPage.open();
	} else {
		todoInit();
	}

	

})


function todoInit() {
	document.body.querySelector('.header__addTodo').addEventListener('click', () => {

		const modal = createModal(createFormAddTodo());
		document.body.append(modal);
		document.body.style.overflow = 'hidden';

	});

	document.body.querySelector('.header__logout').addEventListener('click', () => {
		localStorage.clear();
		window.location.reload();
	})

	showAllTodos();
}

//-----------------загружает все задачи и выводит их-----------------------

async function showAllTodos() {
	try {
		showPreloader();
		const todos = await asyncGetAllTodos();		// acyncGetAllTodos() возвращает массив объектов задачь из БД и передаёт его для 
		renderAllTodos(todos);						// отрисовки в renderAllTodos()
	} catch(err) {
		if (err.name == 'ServerCommunicationError') {
			errorMessage('Ошибка взаимодействия с сервером');
			console.error(err);
		} else throw err;
	} finally {hidePreloader()}
	
}

//------------------переключает статус задачи в БД и перерисовывает задачу-----------

async function toggleTodo(id) {

	const todoElement = document.querySelector(`.todo[data-id="${id}"]`);
	const todoItem = todoElement.parentElement;

	const status = todoElement.dataset.status == 'current' ? 'shedule' : 'current';

	try {

		showPreloader();
		const response = await asyncSetStatus(id, status);

		const todo = await asyncGetTodo(id);
		renderAndInitTodo(todo);
		todoItem.remove();

	} catch(err) {

		errorMessage('Ошибка взаимодействия с сервером')
		console.error(err)

	} finally {hidePreloader()}

}

export {toggleTodo, todoInit}


const body = {
	password: 'qwerty',
	username: 'Alex',
	email: 'alex@mail.com'
}


function createUser() {
	fetch('https://parseapi.back4app.com/users', {
		method: 'post',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(response => response.json())
		.then(data => console.log(data))
}

	/*fetch('https://parseapi.back4app.com/login?username=Alex&password=qwerty', {
		method: 'get',
		headers: {
			'X-Parse-Application-Id': '8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO',
			'X-Parse-REST-API-Key': 'pcTtwjZ1vW2tdIhlizzzKrAb7pBMDR1QJ2f81lO5',
			'X-Parse-Revocable-Session': '1'
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))*/


//window.user = new Login('Alex', 'qwerty');
//window.user.sendLogin().then(() => console.log(user._sessionToken));
