function createModal(contentElement) {
	const modal = document.createElement('div');
	modal.addEventListener('click', (e) => {
		if (!e.target.closest('.modal__content')) {
			closeModal();
		}
	})
	modal.classList.add('modal');

	const modalBody = document.createElement('div');
	modalBody.classList.add('modal__body');

	const modalContent = document.createElement('div');
	modalContent.classList.add('modal__content');

	const closeBtn = document.createElement('button');
	closeBtn.addEventListener('click', closeModal);
	closeBtn.classList.add('modal__close', 'close-btn');

	modalContent.append(contentElement);
	modalContent.append(closeBtn);
	modalBody.append(modalContent);
	modal.append(modalBody);

	return modal;
}

function closeModal() {
	const modal = document.querySelector('.modal');
	modal.remove();
	document.body.style.overflow = '';
}

export {createModal, closeModal};