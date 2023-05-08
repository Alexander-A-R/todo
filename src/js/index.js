import '../styles/styles.css'
import '../styles/style.scss'
import {createModal} from './modal.js'
import {createFormAddTodo} from './form.js'
import {toggleStatus, getAllTodos, parseFromBack} from './database.js'
import {renderAllTodos, renderTodo} from './todoDom.js'


showAllTodos();


document.querySelector('.addTodo').addEventListener('click', () => {
	const modal = createModal(createFormAddTodo());
	document.body.append(modal);
});


function showAllTodos() {
	getAllTodos().then((todos) => renderAllTodos(todos));
}

function toggleTodo(id) {

	const todoItem = document.querySelector(`.todo[data-id=${id}]`).parentElement;

	toggleStatus(id).then(todo => {
		renderTodo(parseFromBack(todo));
		todoItem.remove();
	})

}


export {toggleTodo}