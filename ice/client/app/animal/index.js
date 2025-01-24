import animalService from "./animal.service.mock.js";

function animal() {
    const form = document.createElement('form');
    let description = 'Add Animal';

    function createContent() {
        const container = document.createElement('div');
        container.classList.add('mb-2');

        const label = document.createElement('label');
        label.textContent = 'Animal Name:';
        label.setAttribute('for', 'animalName');

        const input = document.createElement('input');
        input.id = 'animalName';
        input.name = 'animalName';
        input.type = 'text';
        input.required = true;

        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add Animal';

        container.append(label, input, submitButton);
        form.append(container);
        return form;
    }

    function validate() {
        const animalName = form.querySelector('#animalName');
        if (!animalName.value.trim()) {
            alert('Animal Name is required.');
            return false;
        }
        return true;
    }

    function submit() {
        if (validate()) {
            const animalName = form.querySelector('#animalName').value;
            animalService.addAnimal({ name: animalName })
                .then(() => alert('Animal added successfully!'))
                .catch(err => alert('Error adding animal: ' + err.message));
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        submit();
    });

    return {
        description,
        element: createContent()
    };
}

export default animal;
