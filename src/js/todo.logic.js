function getTodoFromForm() {
	const formData = {};

	const form = document.querySelector('.form').firstElementChild;
	const formElements = form.elements;
	
	formData.title = formElements.title.value;
	formData.description = formElements.description.value;

	form.reset();
	
	return formData;
}

export {getTodoFromForm}