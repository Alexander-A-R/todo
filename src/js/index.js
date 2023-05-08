import '../styles/styles.css';
import '../styles/style.scss';
import {createModal, closeModal} from './modal.js';
import {createFormAddTodo} from './form.js';
import {toggleStatus} from './database.js';


Parse.initialize("8t5ZKASH24D5ML6z49AYtS9zUJRzwtRtQIL6IHkO", "6UVmjTt70CtVpH02CQw3VF7Mll9C99kKQ8hz43ji"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
const Todo = Parse.Object.extend('todo');

function getAllTodos() {

	const allTodos = {};
	const query = new Parse.Query(Todo);

	query.find().then(todos => {
		for (let todo of todos) {
			allTodos[todo.id] = {
				id: todo.id,
				title: todo.get('title'),
				description: todo.get('description'),
				status: todo.get('status')
			}
		}
	}).then(() => renderAllTodos(allTodos));

}

getAllTodos();

document.querySelector('.addTodo').addEventListener('click', () => {
	const modal = createModal(createFormAddTodo());
	document.body.append(modal);
});

function deleteTodo(id) {
	const todo = document.querySelector(`.todo[data-id="${id}"]`);
	todo.parentElement.remove();
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

function parseFromBack(fromBack) {
	return {
		status: fromBack.get('status'),
		description: fromBack.get('description'),
		title: fromBack.get('title'),
		id: fromBack.id
	}
}

function toggleTodo(todoElement) {
	const todoItem = todoElement.parentElement;
	const id = todoElement.dataset.id;
	toggleStatus(id).then(todo => {
		renderTodo(parseFromBack(todo));
		todoItem.remove();
	})
}



function getTodoFromForm() {
	const formData = {};
	const formElements = document.querySelector('.form').firstElementChild.elements;
	
	formData.title = formElements.title.value;
	formData.description = formElements.description.value;

	document.querySelector('.form').firstElementChild.reset();
	
	return formData;
}

function getNewId() {
	let newId = 0;
	
	while(todosList[newId] != undefined) {
		newId++;
	}

	return newId;
}

function renderAllTodos(todosList) { // выводит все задачи
	for (let id in todosList) {
		const todo = todosList[id];

		renderTodo(todo);
	}
}

function createTodoHtml(todoObj) { // создаёт html задачи
	const todo = document.createElement('div');
	todo.dataset.id = todoObj.id;
	todo.classList.add('todo');

	const title = document.createElement('h1');
	title.classList.add('todo__title');
	title.innerHTML = todoObj.title;

	const close = document.createElement('button');
	close.addEventListener('click', (e) => {
		//document.body.append(createModal('Удалить?'));
		const todo = e.target.closest('.todo');
		const id = todo.dataset.id;
		deleteTodo(id);
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
			toggleTodo(e.target.closest('.todo'));
		});
		buttons.push(btnStop);

	} else if (todoObj.status == 'shedule') {
		const btnStart = document.createElement('button');
		btnStart.innerHTML = 'начать';
		btnStart.addEventListener('click', (e) => {
			toggleTodo(e.target.closest('.todo'));
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

function showFullDescription(event) { // показывает полное описание, если оно не влазиет
	event.target.style.height = 'auto';
	const height = getComputedStyle(event.target).height;
	event.target.style.height = '';

	if (parseInt(height) > 40) {
		requestAnimationFrame(() => {
			event.target.style.height = height;
		})
	}
}

function hideFullDescription(event) { // скрывает полное описание
	event.target.style.height = '';
}

export {Todo, parseFromBack, createTodoHtml, getNewId, renderTodo}