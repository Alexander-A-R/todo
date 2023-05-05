function createModal(contentElement) {
	const modal = document.createElement('div');
	modal.classList.add('modal', 'modal_active');

	const modalBody = document.createElement('div');
	modalBody.classList.add('modal__body');

	const modalContent = document.createElement('div');
	modalContent.classList.add('modal__content');

	modalContent.append(contentElement);
	modalBody.append(modalContent);
	modal.append(modalBody);

	return modal;
}

export {createModal};