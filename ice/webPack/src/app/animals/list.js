
import animalService from '../services/animalService.js';

export default function listBuilder(app) {
    const container = document.createElement('div');
    
    function createPagination(total) {
        const pagination = document.createElement('nav');
        pagination.innerHTML = `
            <ul class="pagination justify-content-center">
                <li class="page-item ${app.recordPage.page === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${app.recordPage.page - 1}">Previous</a>
                </li>
                ${Array.from({ length: Math.ceil(total / app.recordPage.perPage) }, (_, i) => i + 1)
                    .map(page => `
                        <li class="page-item ${page === app.recordPage.page ? 'active' : ''}">
                            <a class="page-link" href="#" data-page="${page}">${page}</a>
                        </li>
                    `).join('')}
                <li class="page-item ${app.recordPage.page >= Math.ceil(total / app.recordPage.perPage) ? 'disabled' : ''}">
                    <a class="page-link" href="#" data-page="${app.recordPage.page + 1}">Next</a>
                </li>
            </ul>
        `;
        
        pagination.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.dataset.page) {
                app.recordPage.page = parseInt(e.target.dataset.page);
                loadAnimals();
            }
        });
        
        return pagination;
    }

    async function loadAnimals() {
        try {
            const animals = await animalService.getAnimals();
            const start = (app.recordPage.page - 1) * app.recordPage.perPage;
            const end = start + app.recordPage.perPage;
            const paginatedAnimals = animals.slice(start, end);

            container.innerHTML = `
                <h1>Animal List</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${paginatedAnimals.map(animal => `
                            <tr>
                                <td>${animal.name}</td>
                                <td>${animal.breed}</td>
                                <td>
                                    <button class="btn btn-primary btn-sm" data-action="edit" data-name="${animal.name}">Edit</button>
                                    <button class="btn btn-danger btn-sm" data-action="delete" data-name="${animal.name}">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            container.append(createPagination(animals.length));

            // Setup event listeners for actions
            container.querySelectorAll('[data-action]').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const action = e.target.dataset.action;
                    const name = e.target.dataset.name;

                    if (action === 'edit') {
                        window.location.hash = 'edit';
                        app.name = name;
                    } else if (action === 'delete') {
                        if (confirm('Are you sure you want to delete this animal?')) {
                            await animalService.deleteAnimal(name);
                            loadAnimals();
                        }
                    }
                });
            });
        } catch (error) {
            container.innerHTML = `<div class="alert alert-danger">Error loading animals: ${error.message}</div>`;
        }
    }

    // Initial load
    loadAnimals();

    return { element: container };
}
