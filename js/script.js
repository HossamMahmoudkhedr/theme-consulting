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
                                    width="50"
                                    height="50"
                                    viewBox="0 0 50 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="&#240;&#159;&#166;&#134; icon &#34;target&#34;">
									<path
                                            id="Vector"
                                            d="M24.9065 0C11.2079 0 0 11.2079 0 24.9065C0 38.605 11.2079 49.8129 24.9065 49.8129C38.605 49.8129 49.8129 38.605 49.8129 24.9065C49.8129 11.2079 38.605 0 24.9065 0ZM24.9065 6.22661C35.2426 6.22661 43.5863 14.5703 43.5863 24.9065C43.5863 35.2426 35.2426 43.5863 24.9065 43.5863C14.5703 43.5863 6.22661 35.2426 6.22661 24.9065C6.22661 14.5703 14.5703 6.22661 24.9065 6.22661ZM24.9065 12.4532C18.0572 12.4532 12.4532 18.0572 12.4532 24.9065C12.4532 31.7557 18.0572 37.3597 24.9065 37.3597C31.7557 37.3597 37.3597 31.7557 37.3597 24.9065C37.3597 18.0572 31.7557 12.4532 24.9065 12.4532ZM24.9065 18.6798C28.3934 18.6798 31.1331 21.4196 31.1331 24.9065C31.1331 28.3934 28.3934 31.1331 24.9065 31.1331C21.4196 31.1331 18.6798 28.3934 18.6798 24.9065C18.6798 21.4196 21.4196 18.6798 24.9065 18.6798Z"
                                            fill="#C49A6C"
                                        />
										</g>
						        </svg>
					        </span>
					        <h6>${data.title}</h6>
                        </div>
				        <p>
						${data.text}
				        </p>
			        </div>
        `;
	return content;
};
// Create the image
const createImage = (item) => {
	const imageContainer = document.createElement('div');
	imageContainer.classList.add('image');
	const image = document.createElement('img');
	image.src = item.img;
	image.loading = 'lazy';
	imageContainer.appendChild(image);
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
		innerData.classList.add('justify-content-end');

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
		imageLogo.src = '../assets/images/image-removebg-preview 1.png';
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
