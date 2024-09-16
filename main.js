let input = document.getElementById('inp');
let button = document.getElementById('btn');
let input2 = document.getElementById('inp2');
let btn2 = document.getElementById('btn2');

button.addEventListener('click', () => {
    fetch("https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image", {
        method: 'POST',
        body: JSON.stringify({ 
            name: input.value,
            image: input2.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
       
        return response.json();
    })
    .then(() => {
        input.value = '';
        input2.value = '';
        fetchAndDisplayImages();
    })
     
});

function fetchAndDisplayImages() {
    btn2.innerHTML = '';

    fetch("https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image")
        .then(response => {
            
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                let container = document.createElement('div');
                container.classList.add('d-flex', 'flex-column', 'align-items-center', 'mb-4', 'p-4', 'border', 'rounded', 'bg-light');
                container.style.maxWidth = '300px';
                container.style.margin = 'auto';

                let nameElement = document.createElement('span');
                nameElement.textContent = item.name;
                nameElement.classList.add('mb-2', 'text-center');

                let urlElement = document.createElement('img');
                urlElement.src = item.image;
                urlElement.alt = item.name;
                urlElement.classList.add('img-fluid');
                urlElement.style.maxWidth = '100%';
                urlElement.style.height = 'auto';

                let btn = document.createElement('button');
                btn.textContent = 'Delete';
                btn.classList.add('btn', 'btn-danger', 'btn-sm', 'mt-2');

                container.appendChild(nameElement);
                container.appendChild(urlElement);
                container.appendChild(btn);

                btn2.appendChild(container);

                btn.addEventListener('click', () => {
                    fetch(`https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image/${item.id}`, {
                        method: 'DELETE'
                    })
                    .then(response => {
                        
                        container.remove();
                    })
                     
                });
            });
        })
        
}

fetchAndDisplayImages();
