import {toggleTodo} from './index.js'
import {asyncDeleteTodo} from './database.js'
import {createConfirmHtml} from './confirm.js'
import {createModal} from './modal.js'
import {closeModal} from './modal.js'

function createTodoHtml(todoObj) { // создаёт html задачи
	const todo = document.createElement('div');
	todo.dataset.id = todoObj.objectId;
	todo.dataset.status = todoObj.status;
	todo.classList.add('todo');

	const title = document.createElement('h1');
	title.classList.add('todo__title');
	title.innerHTML = todoObj.title;

	const close = document.createElement('button');
	close.addEventListener('click', (e) => {
		
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

	});


	close.classList.add('todo__delete', 'close-btn');

	const description = document.createElement('p');
	description.classList.add('todo__description');
	description.innerHTML = todoObj.description;
	description.addEventListener('mouseover', showFullDescription);
	description.addEventListener('mouseout', hideFullDescription);

	const control = document.createElement('div');
	control.classList.add('todo__control');

	let buttons = [];

	if (todoObj.status == 'current') {
		const btnFullfilled = document.createElement('button');
		btnFullfilled.innerHTML = 'выполнено';
		buttons.push(btnFullfilled);

		const btnStop = document.createElement('button');
		btnStop.innerHTML = 'остановть';
		btnStop.addEventListener('click', (e) => {
			toggleTodo(e.target.closest('.todo').dataset.id);
		});
		buttons.push(btnStop);

	} else if (todoObj.status == 'shedule') {
		const btnStart = document.createElement('button');
		btnStart.innerHTML = 'начать';
		btnStart.addEventListener('click', (e) => {
			toggleTodo(e.target.closest('.todo').dataset.id);
		});
		buttons.push(btnStart);
	}

	const btnComments = document.createElement('button');
	btnComments.innerHTML = 'комментарии';
	buttons.push(btnComments);

	buttons.forEach(button => {
		button.classList.add('todo__button');
		control.append(button);
	});

	todo.append(title);
	todo.append(close);
	todo.append(description);
	todo.append(control);

	return todo;
}

function renderTodo(todoObj) {
	const container = document.createElement('div');
	container.classList.add('todos__item');
	container.append(createTodoHtml(todoObj));

	const section = (todoObj.status == 'current') ?
		document.querySelector('.current > .todos') :
		document.querySelector('.shedule > .todos');

	section.append(container);
}

function renderAllTodos(todosList) { // выводит все задачи
	todosList.forEach(todo => renderTodo(todo));
}

function deleteTodoFromDom(id) {
	const todo = document.querySelector(`.todo[data-id="${id}"]`);
	todo.parentElement.remove();
}



function showFullDescription(event) { // показывает полное описание, если оно не влазиет
	event.target.style.height = 'auto';
	const height = event.target.offsetHeight;
	event.target.style.height = '';

	if (height > 40) {
		requestAnimationFrame(() => {
			event.target.style.height = height + 'px';
		})
	}
}

function hideFullDescription(event) { // скрывает полное описание
	event.target.style.height = '';
}

export {renderTodo, renderAllTodos, createTodoHtml}