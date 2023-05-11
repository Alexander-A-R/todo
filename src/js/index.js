import '../styles/styles.scss'
import {createModal} from './modal.js'
import {createFormAddTodo} from './form.js'
import {asyncSetStatus, asyncGetTodo, asyncGetAllTodos} from './database.js'
import {renderAllTodos, renderAndInitTodo} from './todoDom.js'


showAllTodos();


document.querySelector('.addTodo').addEventListener('click', () => {
	const modal = createModal(createFormAddTodo());
	document.body.append(modal);
	document.body.style.overflow = 'hidden';
});


function showAllTodos() {
	asyncGetAllTodos().then((todos) => renderAllTodos(todos));
}

function toggleTodo(id) {

	const todoElement = document.querySelector(`.todo[data-id="${id}"]`);
	const todoItem = todoElement.parentElement;

	const status = todoElement.dataset.status == 'current' ? 'shedule' : 'current';

	asyncSetStatus(id, status)
		.then(date => {
			asyncGetTodo(id)
				.then(todo => {
					renderAndInitTodo(todo);
					todoItem.remove();
		})
	})

}

export {toggleTodo}