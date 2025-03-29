import listBuilder from "./app/animals/list.js";
import animalBuilder from "./app/animals/index.js";

const app = {
    recordPage: { page: 1, perPage: 10 },
    name: null,
    container: document.querySelector('main'),
    
    init() {
        this.setupRouting();
        this.navigateToHash();
    },

    setupRouting() {
        document.querySelectorAll('[data-route]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const route = e.target.dataset.route;
                window.location.hash = route;
            });
        });

        window.addEventListener('hashchange', () => this.navigateToHash());
    },

    navigateToHash() {
        const hash = window.location.hash.slice(1) || 'list';
        this.container.innerHTML = '';
        
        if (hash === 'list') {
            const list = listBuilder(this.recordPage);
            this.container.appendChild(list.element);
        } else if (hash === 'add') {
            const animal = animalBuilder();
            this.container.appendChild(animal.element);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
