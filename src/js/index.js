import '../styles/styles.scss'
import {createModal} from './modal.js'
import {createFormAddTodo} from './form.js'
import {asyncSetStatus, asyncGetTodo, asyncGetAllTodos} from './database.js'
import {renderAllTodos, renderAndInitTodo} from './todoDom.js'
import {errorMessage} from './error.js'
import {showPreloader, hidePreloader} from './preloader.js'



document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('.addTodo').addEventListener('click', () => {

		const modal = createModal(createFormAddTodo());
		document.body.append(modal);
		document.body.style.overflow = 'hidden';

	});

	showAllTodos();

	document.addEventListener('click', documentClick);

})

function documentClick(e) {
	if (!e.target.classList.contains('todo__details-edit') && !e.target.classList.contains('todo__details-item')) {
		const allDetailsAreas = document.querySelectorAll('.todo__details-edit');
		allDetailsAreas.forEach(detailEditArea => {
			if (detailEditArea.style.display === 'block') {
				const details = detailEditArea.parentElement.querySelector('.todo__details-item');
				details.innerText = detailEditArea.value;
				detailEditArea.style.display = 'none';
				console.log(e.target)
			}
		})
	}
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

export {toggleTodo}


