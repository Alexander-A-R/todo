import {closeModal} from './modal.js'
import {renderAndInitTodo} from './todoDom.js'
import {asyncAddTodo} from './database.js'

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
	inputTitle.maxLength = 20;
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
		const newTodoData = getTodoFromForm();
		newTodoData.status = 'shedule';

		asyncAddTodo(newTodoData).then(data => {
			newTodoData.objectId = data.objectId;
			newTodoData.createdAt = data.createdAt;
			renderAndInitTodo(newTodoData);
			closeModal();
		})
		
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

function getTodoFromForm() {

	const formData = {};	
	const form = document.querySelector('.form').firstElementChild;
	const formElements = form.elements;
	
	formData.title = formElements.title.value;
	formData.description = formElements.description.value;

	form.reset();
	
	return formData;
}


export {createFormAddTodo};