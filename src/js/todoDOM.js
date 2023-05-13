import {toggleTodo} from './index.js'
import {asyncDeleteTodo} from './database.js'
import {createConfirmHtml} from './confirm.js'
import {createModal} from './modal.js'
import {closeModal} from './modal.js'
import {errorMessage} from './error.js'



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
						<p class="todo__details-item todo__details-item_description">
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim culpa dolore quibusdam expedita repellat quia veniam suscipit tempore cumque assumenda, ipsam architecto. Sit inventore maiores impedit, facilis facere nihil dolore?
						</p>
						<p class="todo__details-item todo__details-item_comments">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta sint fugiat nostrum hic tempore porro suscipit eveniet ut inventore laboriosam esse accusamus harum est adipisci, officia ad blanditiis velit dolores?</p>
					</div>
				</div>`
}

//---------------------добавление элемента задачи и инициализация-----------

function renderAndInitTodo(todoObj) {

//----------------------добавление в документ----------------------

	const container = document.createElement('div');	//	создаётся обертка для блока задачи
	container.classList.add('todos__item');				// класс .todos__item
	container.innerHTML = (createTodoHtml());			// createTodoHtml() - возвращает HTML задачи в виде строки


	const section = (todoObj.status == 'current') ?		// выбор секции в зависимости от статуса состояния
		document.querySelector('.current > .todos') :
		document.querySelector('.shedule > .todos');

	section.append(container);							//	вставка блока задачи в секцию

//---------------------добавление аттрибутов-----------------------

	const todo = container.querySelector('.todo');
	todo.dataset.id = todoObj.objectId;
	todo.dataset.status = todoObj.status;

//---------------------вставка содержания полей--------------------

	if (todoObj.status == 'shedule') {
		const icon = todo.querySelector('.todo__icon');
		icon.classList.add('todo__icon_yellow');
	}

	const title = todo.querySelector('.todo__title');		//	название
	title.innerHTML = todoObj.title;

	const date = todo.querySelector('.todo__date');			//	дата
	date.innerHTML = parseDate(todoObj.createdAt);

	const toggleBtn = todo.querySelector('.todo__control').children[1];		//	кнопка переключения статуса
	toggleBtn.innerHTML = todoObj.status == 'current' ? '||' : '>';

//---------------------добавление обработчиков событий---------------------


	const transitionEndHandler = () => todo.style.removeProperty('z-index');

	const detailsBtn = todo.querySelector('.todo__button:first-child');
	const deleteBtn = todo.querySelector('.todo__button.todo__button_close');

	detailsBtn.addEventListener('click', () => {
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
				await asyncDeleteTodo(id);
				deleteTodoFromDom(id);
			} catch(err) {
				errorMessage('Не удалось удалить задачу');
				console.error(err);
			} finally {
				closeModal();
			}
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

	return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

export {renderAndInitTodo, renderAllTodos, createTodoHtml}