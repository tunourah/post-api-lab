let input = document.getElementById('inp');
let button = document.getElementById('btn');
let p = document.getElementById('res');
let input2 = document.getElementById('inp2');
let link = document.getElementById('link');

 
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
    .then(data => {
        
        p.textContent = data.name;
        link.textContent = data.image;

        
        let btn = document.createElement('button');
        btn.textContent = 'Delete';

         
        btn2.appendChild(btn);

        btn.addEventListener('click', () => {
            fetch(`https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image/${data.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                input.textContent = '';
                input2.textContent = '';
                p.textContent = '';
                link.textContent = '';
                btn2.innerHTML = '';   
            })
           
        });
    })
    
});
