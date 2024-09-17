/*=============== SEARCH ===============*/
const searchButton = document.getElementById('search-button'),
    searchClose = document.getElementById('search-close'),
    searchContent = document.getElementById('search-content');

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Array of all books (you'll need to populate this with all the books from your website)
const books = [
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-1.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-2.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-3.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-4.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-5.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-6.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-7.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-8.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-9.png" },
    { title: "გამორჩეული წიგნები", price: "20₾", discountPrice: "12₾", image: "assets/img/book-10.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-1.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-2.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-3.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-4.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-5.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-6.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-7.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-8.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-2.png" },
    { title: "ახალი წიგნი", price: "20₾", discountPrice: "8₾", image: "assets/img/book-10.png" },
];

// Search functionality
searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm)
    );

    displayResults(filteredBooks);
});

function displayResults(results) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
        searchResults.innerHTML = '<p>No results found</p>';
        return;
    }

    results.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('search__result');
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="search__result-img">
            <div class="search__result-info">
                <h3>${book.title}</h3>
                <p>${book.discountPrice} <span>${book.price}</span></p>
            </div>
        `;
        searchResults.appendChild(bookElement);
    });
}

/*==== Search SHOW ====*/
if (searchButton) {
    searchButton.addEventListener('click', () => {
        searchContent.classList.add('show-search')
    })
}

/*===== Search HIDDEN =====*/
if (searchClose) {
    searchClose.addEventListener('click', () => {
        searchContent.classList.remove('show-search')
        searchInput.value = '';
        searchResults.innerHTML = '';
    })
}

// Prevent form submission
const searchForm = document.querySelector('.search__form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
    });
}

/*=============== FAVORITES ===============*/
const favoritesButton = document.getElementById('favorites-button');
const favoritesClose = document.getElementById('favorites-close');
const favoritesContent = document.getElementById('favorites-content');
const favoritesContainer = document.querySelector('.favorites__container');
let favorites = [];

// Show/Hide favorites
if (favoritesButton) {
    favoritesButton.addEventListener('click', () => {
        favoritesContent.classList.add('show-favorites');
    });
}

if (favoritesClose) {
    favoritesClose.addEventListener('click', () => {
        favoritesContent.classList.remove('show-favorites');
    });
}

// Function to create a simple hash from the book's title and image URL
function createBookHash(title, image) {
    return title.toLowerCase().replace(/\s/g, '') + '_' + image.split('/').pop();
}

// Load favorites from localStorage
function loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
        updateFavoritesUI();
        updateAllHeartIcons(); // Add this line
    }
}
// Save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Add to favorites
function addToFavorites(book) {
    const bookHash = createBookHash(book.title, book.image);
    if (!favorites.some(fav => fav.id === bookHash)) {
        favorites.push({ ...book, id: bookHash });
        updateFavoritesUI();
        saveFavorites();
    } else {
        alert(`"${book.title}" უკვე ფავორიტებშია!`);
    }
}

// Remove from favorites
function removeFromFavorites(id) {
    favorites = favorites.filter(book => book.id !== id);
    updateFavoritesUI();
    saveFavorites();
}

function updateAllHeartIcons() {
    document.querySelectorAll('.book__favorite i, #atheart i').forEach(icon => {
        const bookElement = icon.closest('.book__card, .featured__card, .new__card');
        if (bookElement) {
            const title = bookElement.querySelector('.book__title, .featured__title, .new__title').textContent;
            const image = bookElement.querySelector('img').src;
            const bookHash = createBookHash(title, image);

            if (favorites.some(fav => fav.id === bookHash)) {
                icon.classList.remove('ri-heart-line');
                icon.classList.add('ri-heart-fill');
            } else {
                icon.classList.remove('ri-heart-fill');
                icon.classList.add('ri-heart-line');
            }
        }
    });
}
// Update favorites UI
function updateFavoritesUI() {
    favoritesContainer.innerHTML = '';
    favorites.forEach(book => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite__item');
        favoriteItem.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="favorite__img">
            <div class="favorite__data">
                <h3 class="favorite__title">${book.title}</h3>
                <span class="favorite__price">${book.discountPrice}</span>
            </div>
            <i class="ri-close-line favorite__remove" onclick="removeFromFavorites('${book.id}')"></i>
        `;
        favoritesContainer.appendChild(favoriteItem);
    });
    updateAllHeartIcons(); // Add this line
}

// Function to toggle favorite state and update UI
function toggleFavorite(bookElement) {
    const title = bookElement.querySelector('.book__title, .featured__title, .new__title').textContent;
    const price = bookElement.querySelector('.book__price, .featured__price, .new__price').textContent;
    const discountPrice = bookElement.querySelector('.book__discount, .featured__discount, .new__discount').textContent;
    const image = bookElement.querySelector('img').src;
    const favoriteButton = bookElement.querySelector('.book__favorite i, #atheart i');

    const bookHash = createBookHash(title, image);

    if (favorites.some(fav => fav.id === bookHash)) {
        // Remove from favorites
        removeFromFavorites(bookHash);
        favoriteButton.classList.remove('ri-heart-fill');
        favoriteButton.classList.add('ri-heart-line');
    } else {
        // Add to favorites
        addToFavorites({ title, price, discountPrice, image });
        favoriteButton.classList.remove('ri-heart-line');
        favoriteButton.classList.add('ri-heart-fill');
    }
}

// Update the click event listener
document.addEventListener('click', function (e) {
    if (e.target && (e.target.classList.contains('book__favorite') || e.target.closest('.book__favorite') || e.target.id === 'atheart' || e.target.closest('#atheart'))) {
        const bookElement = e.target.closest('.book__card') || e.target.closest('.featured__card') || e.target.closest('.new__card');
        if (bookElement) {
            toggleFavorite(bookElement);
        }
    }
});
function updateNewSectionHearts() {
    document.querySelectorAll('.new__card').forEach(bookElement => {
        const title = bookElement.querySelector('.new__title').textContent;
        const image = bookElement.querySelector('img').src;
        const favoriteButton = bookElement.querySelector('#atheart i');
        const bookHash = createBookHash(title, image);

        if (favorites.some(fav => fav.id === bookHash)) {
            favoriteButton.classList.remove('ri-heart-line');
            favoriteButton.classList.add('ri-heart-fill');
        } else {
            favoriteButton.classList.remove('ri-heart-fill');
            favoriteButton.classList.add('ri-heart-line');
        }
    });
}

// Load favorites when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    updateAllHeartIcons();
    updateNewSectionHearts();
});
/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
    const header = document.getElementById('header')
    this.scrollY >= 50 ? header.classList.add('shadow-header')
        : header.classList.remove('shadow-header')
}
window.addEventListener('scroll', shadowHeader)

/*=============== HOME SWIPER ===============*/
let swiperHome = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        1220: {
            spaceBetween: -32,
        }
    }
});

/*=============== FEATURED SWIPER ===============*/
let swiperFeatured = new Swiper('.featured__swiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        1150: {
            slidesPerView: 3,
            centeredSlides: false,
        }
    }
});

/*=============== NEW SWIPER ===============*/
let swiperNew = new Swiper('.new__swiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 'auto',

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        1150: {
            slidesPerView: 3,
        }
    }
});

/*=============== TESTIMONIAL SWIPER ===============*/
let swiperTestimonial = new Swiper('.testimonial__swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    breakpoints: {
        1150: {
            slidesPerView: 3,
            centeredSlides: false,
        }
    }
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})
sr.reveal('.home__data, .featured__container, .new__container, .join__data, .testimonial__container, .footer')
sr.reveal('.home__images', { delay: 600 })
sr.reveal('.services__card', { interval: 100 })
sr.reveal('.discount__data', { origin: 'left' })
sr.reveal('.discount__images', { origin: 'right' })
sr.reveal('.about__data', { origin: 'left' })
sr.reveal('.about__img-wrapper', { origin: 'right' })

/*=============== BOOKS FILTER ===============*/
const booksContainer = document.getElementById('books-container')
const filterButtons = document.querySelectorAll('.books__filter-btn')

const bookss = [
    { title: "ბავშვების წიგნი 1", price: "12₾", discountPrice: "20₾", image: "assets/img/book-1.png", category: "kids" },
    { title: "მოზარდების წიგნი 1", price: "25₾", discountPrice: "30₾", image: "assets/img/book-2.png", category: "mature" },
    { title: "ჩვილების წიგნი 1", price: "10₾", discountPrice: "15₾", image: "assets/img/book-3.png", category: "baby" },
]

function displayBooks(filter) {
    booksContainer.innerHTML = ''
    const filteredBooks = filter === 'all' ? bookss : bookss.filter(book => book.category === filter)

    filteredBooks.forEach(book => {
        const bookElement = document.createElement('article')
        bookElement.classList.add('book__card')
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="book__img">
            <h3 class="book__title">${book.title}</h3>
            <span class="book__price">${book.price}</span>
            <span class="book__discount">${book.discountPrice}</span>
            
        `
        booksContainer.appendChild(bookElement)
    })
}

// Initial display of all books
displayBooks('all')

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        const filter = button.getAttribute('data-filter')
        displayBooks(filter)

        // Add reveal animation
        ScrollReveal().reveal('.book__card', {
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 400,
            interval: 100
        })
    })
})

// Add initial reveal animation
ScrollReveal().reveal('.book__card', {
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    interval: 100
})

// Initialize favorites on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFavorites();
    displayBooks('all'); // This will now include the correct heart icon state
});