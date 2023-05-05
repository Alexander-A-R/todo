function createAnalythics() {
	let count = 0;
	let destroyed = false;

	let counter = () => count++;

	document.addEventListener('click', counter);

	return {
		getClicks() {
			if (destroyed) console.log('analythics destroyed.' + `Total clicks: ${count}`);
			return count;
		},
		destroy() {
			document.removeEventListener('click', counter);
			destroyed = true;
		}
	}

}


window.analythics = createAnalythics();