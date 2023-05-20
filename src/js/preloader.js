import preloader from '../assets/preloader.svg'
import preloader_black from '../assets/preloader_black.svg'


function showPreloader(color = undefined) {
	const preloaderElement = document.createElement('img');
	preloaderElement.src = color == 'black' ? preloader_black : preloader;
	preloaderElement.classList.add('preloader');
	document.body.append(preloaderElement);
}

function hidePreloader() {
	const preloaderElement = document.querySelector('.preloader');
	preloaderElement.remove();
}

export {showPreloader, hidePreloader}