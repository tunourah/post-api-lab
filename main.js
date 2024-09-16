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
    .then(response => response.json())
    .then(() => {
         
        input.value = '';
        input2.value = '';
        
        fetchAndDisplayImages();
    })
    
});


function fetchAndDisplayImages() {
    
    btn2.innerHTML = '';
 
    fetch("https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image")
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
              
                let container = document.createElement('div');
                container.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-4', 'p-4', 'border', 'rounded');
                container.style.backgroundColor = '#f8f9fa';

               
                let nameElement = document.createElement('span');
                nameElement.textContent = item.name;
                nameElement.classList.add('mr-2');

                 
                let urlElement = document.createElement('img');
                urlElement.src = item.image;
                urlElement.textContent = item.image;
                urlElement.height = 100;
                urlElement.width = 100;
                urlElement.target = '_blank';
                urlElement.classList.add('mr-2');

                
                let btn = document.createElement('button');
                btn.textContent = 'Delete';
                btn.classList.add('btn', 'btn-danger', 'btn-sm');

                 
                container.appendChild(nameElement);
                container.appendChild(urlElement);
                container.appendChild(btn);

                
                btn2.appendChild(container);

                
                btn.addEventListener('click', () => {
                    fetch(`https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image/${item.id}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                         
                        container.remove();
                    })
                   
                });
            });
        })
        
}

 fetchAndDisplayImages();
