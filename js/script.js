import { services, responsiveServices } from './services.js';
// Targeting the elements
const carousel_inner = document.querySelector('.carousel-inner');
const carousel_control = document.querySelector('.carousel-indicators');
const navbar = document.querySelector('nav');
const imageLogo = document.querySelector('.logo');
const imagesSlider = document.querySelectorAll('.back');

// Implement the image slider
const slider = (index) => {
	imagesSlider.forEach((image) => {
		image.classList.remove('active');
	});
	imagesSlider[index].classList.add('active');
};
let active = 0;
setInterval(() => {
	if (active == imagesSlider.length - 1) {
		active = 0;
	} else {
		active += 1;
	}
	slider(active);
}, 4000);
// Creating the control buttons for the carousel
const createButton = (index) => {
	carousel_control.innerHTML += `
        <button
		type="button"
			data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="${index}"
			class=${index === 0 ? 'active' : ''}
			aria-current="true"
			aria-label="Slide ${index + 1}"></button>
        `;
};

// Create the item Container for the carousel
const createItemContainer = (index) => {
	const itemContainer = document.createElement('div');
	itemContainer.classList.add('carousel-item');
	if (index === 0) {
		itemContainer.classList.add('active');
	}
	const innerData = document.createElement('div');
	innerData.classList.add('services-data');
	innerData.classList.add('d-flex');
	return itemContainer;
};

// Create the item
const createItem = () => {
	const innerData = document.createElement('div');
	innerData.classList.add('services-data');
	innerData.classList.add('d-flex');
	return innerData;
};

// Create the inner item
const createInnerItem = () => {
	const item = document.createElement('div');
	item.classList.add('item');
	item.classList.add('d-flex');
	item.classList.add('flex-column');

	return item;
};

const createContent = (data) => {
	let content = `
			        <div class="text">
				        <div class="head">
					        <span>
						        <svg
										xmlns="http://www.w3.org/2000/svg"
										width="50"
										height="50"
										fill="#c49a6c"
										class="bi bi-bullseye"
										viewBox="0 0 16 16">
										<path
											d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
										<path
											d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
										<path
											d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
										<path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
									</svg>
					        </span>
					        <h6>${data.title}</h6>
                        </div>
				        <p>
						${data.text}
				        </p>
						<a href="#">
							<svg xmlns="http://www.w3.org/2000/svg" width="50" height="33" fill="#939393" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
						</a>
			        </div>
        `;
	return content;
};
// Create the image
const createImage = (item) => {
	const imageContainer = document.createElement('div');
	let tirangle = `<span
						><svg
							width="54"
							height="47"
							viewBox="0 0 54 47"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M27 0L53.8468 46.5H0.153213L27 0Z"
								fill="#F5F5F5" />
						</svg>
					</span>`;
	imageContainer.classList.add('image');
	const image = document.createElement('img');
	image.src = item.img;
	image.loading = 'lazy';
	imageContainer.appendChild(image);
	imageContainer.innerHTML += tirangle;
	return imageContainer;
};

// Set the data in the wide screens
const setData = (serv) => {
	carousel_inner.innerHTML = '';
	carousel_control.innerHTML = '';
	serv.forEach((el, idx) => {
		// Creat the control buttons
		createButton(idx);

		// Create the item container
		const itemContainer = createItemContainer(idx);

		// create the item
		const innerData = createItem();

		// add one more class to the item
		// innerData.classList.add('justify-content-end');

		itemContainer.appendChild(innerData);
		el.forEach((i, idx) => {
			// create the inner item
			const item = createInnerItem();

			// create the image
			const imageContainer = createImage(i);
			// end of image creation

			// add the image to the inner item
			item.appendChild(imageContainer);

			// create the content
			let content = createContent(i);
			// add the content to the inner item
			item.innerHTML += content;

			// add the inner item to the item
			innerData.appendChild(item);
		});
		// add everything to the carousel
		carousel_inner.appendChild(itemContainer);
	});
};

// Set the data in the small and middle screens
const setResponsiveData = (serv) => {
	carousel_inner.innerHTML = '';
	carousel_control.innerHTML = '';
	serv.forEach((el, idx) => {
		// create the control buttons
		createButton(idx);

		// Create the item container
		const itemContainer = createItemContainer(idx);

		// create the item
		const item = createItem();

		// Add the item to the item container
		itemContainer.appendChild(item);

		// create the inner item
		const innerItem = createInnerItem();

		// add the inner item to the item
		item.appendChild(innerItem);

		// create the image
		const imageContainer = createImage(el);

		// add the image to the inner item
		innerItem.appendChild(imageContainer);

		// create the content
		let content = createContent(el);

		// add the content to the inner item
		innerItem.innerHTML += content;

		// add every thing to the carousel
		carousel_inner.appendChild(itemContainer);
	});
};

const scrollThreshold = 150;
const styleNavbar = () => {
	const scrollY = window.scrollY;

	if (scrollY > scrollThreshold) {
		navbar.classList.add('scrolled');
		imageLogo.src = '../assets/images/image-removebg-preview 2.png';
	} else {
		navbar.classList.remove('scrolled');
		imageLogo.src = '../assets/icons/color-logo.svg';
	}
};

const setChosenService = () => {
	let chosenService = innerWidth <= 992 ? responsiveServices : services;
	const screenWidth = innerWidth;
	if (screenWidth > 992) {
		setData(chosenService);
	} else {
		setResponsiveData(chosenService);
	}
};
window.onload = () => {
	setChosenService();
};
window.onresize = () => {
	setChosenService();
};
window.addEventListener('scroll', styleNavbar);
