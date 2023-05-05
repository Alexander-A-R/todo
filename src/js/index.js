import '../styles/styles.css';
import {createModal} from './modal.js';

const todosList = {
	1: {
		title: 'Задачник',
		description: 'сделать задачник',
		comments: [
			'данные нужно хранить в JSON файле',
			'комментарии должны храниться в массиве'
		 ],
		status: 'current',
		id: 1
	},
	2: {
		title: 'Слайдер',
		description: 'сделать слайдер, с возможностью загружать разные картинки',
		comments: [
			'.........',
		],
		status: 'shedule',
		id: 2
	},
	3: {
		title: 'задача',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis sequi, accusamus amet rerum exercitationem, veritatis ratione fuga culpa similique deleniti explicabo consequuntur unde a perspiciatis facilis animi expedita assumenda!',
		status: 'current',
		id: 3
	},
	4: {
		title: 'задача',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis sequi, accusamus amet rerum exercitationem, veritatis ratione fuga culpa similique deleniti explicabo consequuntur unde a perspiciatis facilis animi expedita assumenda!',
		status: 'current',
		id: 4
	},
	5: {
		title: 'задача',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium reiciendis sequi, accusamus amet rerum exercitationem, veritatis ratione fuga culpa similique deleniti explicabo consequuntur unde a perspiciatis facilis animi expedita assumenda!',
		status: 'shedule',
		id: 5
	}
}



renderAllTodos(todosList);

document.querySelector('.addTodo').addEventListener('click', showModalAddTodo);
document.querySelector('.modal__close').addEventListener('click', closeModalAddTodo);

document.querySelector('.modal').addEventListener('click', (e) => {
	if (!e.target.closest('.modal__content')) {
		closeModalAddTodo();
	}
})

document.querySelector('.form__control')
	.lastElementChild
	.addEventListener('click', closeModalAddTodo); // установка обработчика на ккнопку отмена

document.querySelector('.form__control')		// установка обработчика на кнопку добавить в модальном окне
	.firstElementChild
	.addEventListener('click', () => {
		const todo = getTodoFromForm();
		todo.id = getNewId();
		todo.status = 'shedule';
		addTodo(todo);
		const container = document.createElement('div');
		container.classList.add('todos__item');
		container.append(createTodoHtml(todo));

		document.querySelector('.shedule > .todos').append(container);;

		closeModalAddTodo();
});

function deleteTodo(id) {
	delete todosList[id];
	const todo = document.querySelector(`.todo[data-id="${id}"]`);
	todo.parentElement.remove();
}

function toggleTodo(todoElement, section = 'current') {
	const todoItem = todoElement.parentElement;
	const id = todoElement.dataset.id;
	const todoObj = todosList[id];

	if (todoObj.status == 'current') {
		const todos = document.querySelector('.shedule').firstElementChild;
		todos.append(todoItem);
		todoObj.status = 'shedule';
	} else {
		const todos = document.querySelector('.current').firstElementChild;
		todos.append(todoItem);
		todoObj.status = 'current';
	}
}



function showModalAddTodo() {
	
	document.body.append(createModal(form));


	/*const modal = document.querySelector('.modal');
	modal.classList.add('modal_active');*/
	document.body.classList.add('hidden');
}

function closeModalAddTodo() {
	const modal = document.querySelector('.modal');
	modal.classList.remove('modal_active');
	document.body.classList.remove('hidden');
	document.querySelector('.form').firstElementChild.reset();
}

function addTodo(todo) {
	todosList[todo.id] = todo;
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

		const container = document.createElement('div');
		container.classList.add('todos__item');
		container.append(createTodoHtml(todo));

		const section = (todo.status == 'current') ?
			document.querySelector('.current > .todos') :
			document.querySelector('.shedule > .todos');

		section.append(container);
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
		document.body.append(createModal('Удалить?'));
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


