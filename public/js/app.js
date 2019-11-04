console.log('Client side javascript is loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value;
    messageOne.textContent='Loading...'
    fetch(`/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return false;
            }
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        })
    })
})