let input = document.getElementById('inp');
let button = document.getElementById('btn');
let p = document.getElementById('res');
let input2 = document.getElementById('inp2');
let link = document.getElementById('link');

// Assuming 'btn2' is a container in your HTML, e.g., a <div> to hold the "Delete" button
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
        // Display the response data
        p.textContent = data.name;
        link.textContent = data.image;

        // Create and show the "Delete" button after the POST request is successful
        let btn = document.createElement('button');
        btn.textContent = 'Delete';

        // Clear the container to ensure only one "Delete" button is shown
        btn2.innerHTML = '';  
        btn2.appendChild(btn);

        btn.addEventListener('click', () => {
            fetch(`https://66e7e6b3b17821a9d9da6ff8.mockapi.io/hold-image/${data.id}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Clear the UI elements after deletion
                p.textContent = '';
                link.textContent = '';
                btn2.innerHTML = '';  // Remove the delete button
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
