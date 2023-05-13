import {createModal, closeModal} from './modal.js'

export function errorMessage(message) {
	const messageHtml = `<div class="error">
							<h5 class="error__text">${message}</h5>
							<button class="error__ok">OK</button>
						</div>`

	const modal = createModal(messageHtml);
	document.body.append(modal);

	const buttonOk = document.querySelector('.error__ok');
	buttonOk.addEventListener('click', () => closeModal());
}