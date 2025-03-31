import listBuilder from "./app/animals/list.js";
import animalBuilder from "./app/animals/index.js";
import twitterIcon from './img/twitter.png';
import instagramIcon from './img/instagram.png';

// Create app context
const app = {
    recordPage: {
        page: 1,
        perPage: 5
    },
    name: null,
    listBuilder,
    animalBuilder
};

// Set copyright year
document.getElementById('copyrightYear').textContent = new Date().getFullYear();

// Add social media icons
const twitterLink = document.querySelector('.me-3 a img');
if (twitterLink) {
    twitterLink.src = twitterIcon;
    twitterLink.alt = 'Twitter';
    twitterLink.width = 24;
}

const instagramLink = document.querySelector('.ms-3 a img');
if (instagramLink) {
    instagramLink.src = instagramIcon;
    instagramLink.alt = 'Instagram';
    instagramLink.width = 24;
}

// Router configuration
const router = async () => {
    const main = document.querySelector('main');
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);

    switch(true) {
        case path === '/' || path === '/list' || path === '/animals' || path === '/list.html':
            main.replaceChildren(listBuilder(app).element);
            break;
        case path === '/animal' || path === '/animal.html' || path.includes('/animals/edit'):
            app.name = params.get('name');
            main.replaceChildren(animalBuilder(app).element);
            break;
        default:
            main.innerHTML = '<h1>404 - Page Not Found</h1>';
            console.log('No route match for:', path);
    }
};

// Handle navigation
window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);

// Export for use in other modules if needed
export { app };
