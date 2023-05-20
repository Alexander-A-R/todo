import {toggleTodo} from './index.js'
import {asyncDeleteTodo, asyncSetDetails} from './databaseAPI.js'
import {createConfirmHtml} from './confirm.js'
import {createModal} from './modal.js'
import {closeModal} from './modal.js'
import {errorMessage} from './error.js'
import {showPreloader, hidePreloader} from './preloader.js'



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
					<div class="todo__details">
						<p class="todo__details-item">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim culpa dolore quibusdam expedita repellat quia veniam suscipit tempore cumque assumenda, ipsam architecto. Sit inventore maiores impedit, facilis facere nihil dolore?
						</p>
						<textarea class="todo__details-edit"></textarea>
						<button class="todo__details-btn-save">Редактировать</button>
					</div>
				</div>`
}

//---------------------добавление элемента задачи и инициализация-----------

function renderAndInitTodo({objectId, title, status, createdAt, details}) {

//----------------------добавление в документ----------------------

	const container = document.createElement('div');	//	создаётся обертка для блока задачи
	container.classList.add('todos__item');				// класс .todos__item
	container.innerHTML = (createTodoHtml());			// createTodoHtml() - возвращает HTML задачи в виде строки


	const section = (status == 'current') ?		// выбор секции в зависимости от статуса состояния
		document.querySelector('.current > .todos') :
		document.querySelector('.shedule > .todos');

	section.append(container);							//	вставка блока задачи в секцию


//---------------------добавление аттрибутов-----------------------

	const todo = container.querySelector('.todo');
	todo.dataset.id = objectId;
	todo.dataset.status = status;

//---------------------вставка содержания полей--------------------

	if (status == 'shedule') {
		const icon = todo.querySelector('.todo__icon');
		icon.classList.add('todo__icon_yellow');
	}

	const titleElement = todo.querySelector('.todo__title');		//	название
	titleElement.innerHTML = title;

	const detailsElement = todo.querySelector('.todo__details-item');
	detailsElement.innerText = details;

	const date = todo.querySelector('.todo__date');			//	дата
	date.innerHTML = parseDate(createdAt);

//-----------------------определение контрольной панели-------------------------

	//---------------------добавление кнопки "завершить задачу"-----------------

	let detailsBtn;
	let toggleBtn;

	const controlPanel = todo.querySelector('.todo__control');

	const deleteBtn = controlPanel.lastElementChild;

	if (status == 'current') {
		const completeBtn = document.createElement('button');
		completeBtn.classList.add('todo__button', 'todo__button_complete');
		completeBtn.innerText = '=>'
		todo.querySelector('.todo__control').prepend(completeBtn);
		
		detailsBtn = controlPanel.children[1];
		toggleBtn = controlPanel.children[2];

	} else {
		detailsBtn = controlPanel.children[0];
		toggleBtn = controlPanel.children[1];
	}

	toggleBtn.innerHTML = status == 'current' ? '||' : '>';


//---------------------добавление обработчиков событий---------------------


	const transitionEndHandler = () => todo.style.removeProperty('z-index');

	detailsBtn.addEventListener('click', (e) => {

		const currentTodo = e.target.closest('.todo');
		const currentDetails = currentTodo.querySelector('.todo__details');

		const prevOpenDetails = document.querySelector('.todo__details_show');
		if (prevOpenDetails && prevOpenDetails !== currentDetails) {
			prevOpenDetails.classList.remove('todo__details_show');
			prevOpenDetails.closest('.todo').style.removeProperty('z-index');
			prevOpenDetails.removeEventListener('transitionend', transitionEndHandler);
		}

		todo.querySelector('.todo__details').classList.toggle('todo__details_show');
		const details = todo.querySelector('.todo__details');
		if (todo.style.zIndex != '5') {
			todo.style.zIndex = '5';
			details.removeEventListener('transitionend', transitionEndHandler);
		} else {
				
				details.addEventListener('transitionend', transitionEndHandler);
			}
	})

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

		yes.addEventListener('click', async () => {
			try {
				showPreloader();
				await asyncDeleteTodo(id);
				deleteTodoFromDom(id);
			} catch(err) {
				errorMessage('Не удалось удалить задачу');
				console.error(err);
			} finally {
				closeModal();
				hidePreloader();
			}
		})

		no.addEventListener('click', (e) => closeModal());

	})


	const detSaveBtn = todo.querySelector('.todo__details-btn-save');

	detSaveBtn.addEventListener('click', (e) => {

		const detailsEditArea = e.target.parentElement.querySelector('.todo__details-edit');
		const detailsText = detailsElement.innerText;
		const detailsNewText = detailsEditArea.value || 'Нет записей...';

		if (detailsEditArea.style.display !== 'block') {
			
			const height = getComputedStyle(detailsElement).height;
			const offsetTop = detailsElement.offsetTop;
			const offsetLeft = detailsElement.offsetLeft;
				
			detailsEditArea.value = detailsText;
			detailsEditArea.style.height = height;
			detailsEditArea.style.top = offsetTop + 'px';
			detailsEditArea.style.left = offsetLeft + 'px';
			detailsEditArea.style.display = 'block';

			e.target.innerText = 'Сохранить';
		} else {
			
			if (detailsText !== detailsNewText) {
				showPreloader();
				asyncSetDetails(objectId, detailsNewText)
				.finally(() => hidePreloader())
				.then(() => {
					detailsElement.innerText = detailsNewText;
					detailsEditArea.style.display = 'none';
					e.target.innerText = 'Редактировать'
				})
				.catch(err => {
					errorMessage('Не удалось сохранить запись');
					console.error(err);
				})
			} else {
				detailsEditArea.style.display = 'none';
				e.target.innerText = 'Редактировать'
				console.log('save')
			}
		}
		
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
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();


	return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
}

export {renderAndInitTodo, renderAllTodos, createTodoHtml}