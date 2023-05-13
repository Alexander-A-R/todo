import '../styles/styles.scss'
import {createModal} from './modal.js'
import {createFormAddTodo} from './form.js'
import {asyncSetStatus, asyncGetTodo, asyncGetAllTodos} from './database.js'
import {renderAllTodos, renderAndInitTodo} from './todoDom.js'
import {errorMessage} from './error.js'

import preloader from '../assets/preloader.svg'



document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('.addTodo').addEventListener('click', () => {

		const modal = createModal(createFormAddTodo());
		document.body.append(modal);
		document.body.style.overflow = 'hidden';

	});

	showAllTodos();

})




//-----------------загружает все задачи и выводит их-----------------------

async function showAllTodos() {
	try {
		const todos = await asyncGetAllTodos();		// acyncGetAllTodos() возвращает массив объектов задачь из БД и передаёт его для 
		renderAllTodos(todos);						// отрисовки в renderAllTodos()
	} catch(err) {
		if (err.name == 'ServerCommunicationError') {
			errorMessage('Ошибка взаимодействия с сервером');
			console.error(err);
		} else throw err;
	}
	
}

//------------------переключает статус задачи в БД и перерисовывает задачу-----------

async function toggleTodo(id) {

	const todoElement = document.querySelector(`.todo[data-id="${id}"]`);
	const todoItem = todoElement.parentElement;

	const status = todoElement.dataset.status == 'current' ? 'shedule' : 'current';

	try {

		const response = await asyncSetStatus(id, status);

		const todo = await asyncGetTodo(id);
		renderAndInitTodo(todo);
		todoItem.remove();

	} catch(err) {

		errorMessage('Ошибка взаимодействия с сервером')
		console.error(err)

	}

}

export {toggleTodo}

document.getElementById('preloader').src = preloader;