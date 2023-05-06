import {closeModal} from './modal.js';
import {getTodoFromForm} from './todo.logic.js'
import {addTodo, createTodoHtml, getNewId} from './index.js'

function createFormAddTodo() {
	const formDiv = document.createElement('div');
	formDiv.classList.add('form');
	const form = document.createElement('form');
	const table = document.createElement('table');
	table.classList.add('form__table');

	const trTitle = document.createElement('tr');
	const tdLabel = document.createElement('td');
	const labelTitle = document.createElement('label');
	labelTitle.for = 'title';
	labelTitle.innerHTML = 'Название';
	tdLabel.append(labelTitle);
	const inputTitle = document.createElement('input');
	inputTitle.type = 'text';
	inputTitle.name = 'title';
	inputTitle.id = 'title';
	inputTitle.maxlength = 20;
	const tdInput = document.createElement('td');
	tdInput.append(inputTitle);
	trTitle.append(tdLabel);
	trTitle.append(tdInput);

	const trDescr = document.createElement('tr');

	const tdLabelDescr = document.createElement('td');
	const labelDescr = document.createElement('label');
	labelDescr.for = 'description';
	labelDescr.innerHTML = 'Описание';
	tdLabelDescr.append(labelDescr);

	const descr = document.createElement('textarea');
	descr.name = 'description';
	descr.id = 'description';
	const tdDescr = document.createElement('td');
	tdDescr.append(descr);

	trDescr.append(tdLabelDescr);
	trDescr.append(tdDescr);


	table.append(trTitle);
	table.append(trDescr);

	form.append(table);

	const buttonAdd = document.createElement('button');
	buttonAdd.type = 'button';
	buttonAdd.innerHTML = 'Создать';
	buttonAdd.classList.add('form__button');
	buttonAdd.addEventListener('click', () => {
		const todo = getTodoFromForm();
		todo.id = getNewId();
		todo.status = 'shedule';
		addTodo(todo);
		const container = document.createElement('div');
		container.classList.add('todos__item');
		container.append(createTodoHtml(todo));

		document.querySelector('.shedule > .todos').append(container);

		closeModal();
	})

	const buttonCancel = document.createElement('button');
	buttonCancel.type = 'button';
	buttonCancel.innerHTML = 'Отменить';
	buttonCancel.classList.add('form__button');
	buttonCancel.addEventListener('click', closeModal);

	const controlDiv = document.createElement('div');
	controlDiv.classList.add('form__control');

	controlDiv.append(buttonAdd);
	controlDiv.append(buttonCancel);

	form.append(controlDiv);

	formDiv.append(form);

	return formDiv;
}

export {createFormAddTodo};