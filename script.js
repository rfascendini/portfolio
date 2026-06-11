const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const navbar = document.querySelector('.navbar');
const currentYear = document.getElementById('current-year');
const revealItems = document.querySelectorAll('.reveal');

if (currentYear) {
	currentYear.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
	const closeMenu = () => {
		navToggle.setAttribute('aria-expanded', 'false');
		navToggle.setAttribute('aria-label', 'Abrir menu de navegacion');
		navMenu.classList.remove('is-open');
		document.body.classList.remove('menu-open');
	};

	navToggle.addEventListener('click', () => {
		const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!isExpanded));
		navToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegacion' : 'Cerrar menu de navegacion');
		navMenu.classList.toggle('is-open');
		document.body.classList.toggle('menu-open', !isExpanded);
	});

	navLinks.forEach((link) => {
		link.addEventListener('click', () => {
			closeMenu();
		});
	});

	window.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
		}
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth >= 960) {
			closeMenu();
		}
	});
}

const syncNavbarState = () => {
	if (!navbar) {
		return;
	}

	navbar.classList.toggle('is-scrolled', window.scrollY > 16);
};

syncNavbarState();
window.addEventListener('scroll', syncNavbarState, { passive: true });

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) {
				return;
			}

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, {
		threshold: 0.18,
		rootMargin: '0px 0px -40px 0px'
	});

	revealItems.forEach((item) => revealObserver.observe(item));
} else {
	revealItems.forEach((item) => item.classList.add('is-visible'));
}
