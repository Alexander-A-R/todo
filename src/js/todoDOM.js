import {toggleTodo} from './index.js'
import {asyncDeleteTodo} from './database.js'
import {createConfirmHtml} from './confirm.js'
import {createModal} from './modal.js'
import {closeModal} from './modal.js'



function createTodoHtml() {
	return `<div class="todo">
					<div class="todo__icon"></div>
					<span class="todo__title"></span>
					<span class="todo__date"></span>
					<div class="todo__control">
						<button class="todo__button">...</button>
						<button class="todo__button"></button>
						<button class="todo__button todo__button_close">X</button>
					</div>
				</div>`
}

//---------------------добавление элемента задачи и инициализация-----------

function renderAndInitTodo(todoObj) {

//----------------------добавление в документ----------------------

	const container = document.createElement('div');
	container.classList.add('todos__item');
	container.innerHTML = (createTodoHtml());


	const section = (todoObj.status == 'current') ?		// выбор секции в зависимости от статуса состояния
		document.querySelector('.current > .todos') :
		document.querySelector('.shedule > .todos');

	section.append(container);

//---------------------добавление аттрибутов-----------------------

	const todo = container.querySelector('.todo');
	todo.dataset.id = todoObj.objectId;
	todo.dataset.status = todoObj.status;

//---------------------вставка содержания полей--------------------

	const title = todo.querySelector('.todo__title');		//	название
	title.innerHTML = todoObj.title;

	const date = todo.querySelector('.todo__date');			//	дата
	date.innerHTML = parseDate(todoObj.createdAt);

	const toggleBtn = todo.querySelector('.todo__control').children[1];		//	кнопка переключения статуса
	toggleBtn.innerHTML = todoObj.status == 'current' ? '||' : '>';

//---------------------добавление обработчиков событий---------------------

	const datailsBtn = todo.querySelector('.todo__button:first-child');
	const deleteBtn = todo.querySelector('.todo__button.todo__button_close');

	toggleBtn.addEventListener('click', (e) => {
		toggleTodo(e.target.closest('.todo').dataset.id);
	});

	deleteBtn.addEventListener('click', (e) => {
		const todo = e.target.closest('.todo');
		const id = todo.dataset.id;

		const modal = createModal(createConfirmHtml());

		document.body.append(modal);
		document.body.style.overflow = 'hidden';

		const yes = document.querySelector('.confirm__buttons').firstElementChild;
		const no = document.querySelector('.confirm__buttons').lastElementChild;

		yes.addEventListener('click', (e) => {
			asyncDeleteTodo(id).then( () => {
				deleteTodoFromDom(id)
				closeModal();
			} );
		})

		no.addEventListener('click', (e) => closeModal());
	})

}

//----------------------------------------------------------------------

function renderAllTodos(todosList) { // выводит все задачи
	todosList.forEach(todo => {
		renderAndInitTodo(todo);
	});
}

function deleteTodoFromDom(id) {
	const todo = document.querySelector(`.todo[data-id="${id}"]`);
	todo.parentElement.remove();
}


function parseDate(dateFromDataBase) {
	const timestamp = Date.parse(dateFromDataBase);
	const date = new Date(timestamp);

	return `${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export {renderAndInitTodo, renderAllTodos, createTodoHtml}