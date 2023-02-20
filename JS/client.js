// const { url } = require("inspector");

const socket = io('https://suraj-021.github.io/Chatting-App.git.io/');

const form = document.querySelector('form');
const messageContainer = document.querySelector('.container');
const messageinput = document.getElementById('send_messagein');


var audio = new Audio('Notification.mp3');

// append function for message
const append = (message, position) => {

    // for create the element
    const messageElement = document.createElement('div');

    // for inserting the message into messageElement
    messageElement.innerText = message;

    // for adding the list of class 'message'
    messageElement.classList.add('message');

    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    // for playing the audio
    if(position == 'left'){
        audio.play();
    }

}

// for sending the message

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you : ${message}`,'right');
    socket.emit('send',message); 
    messageinput.value = '';
});

const name = prompt("Enter Your Name to Join the Chat");

socket.emit('new-user-joint', name);

socket.on('user-joint', name => {
    append(`${name} : join the chat`, 'right')
});

socket.on('received', data => {
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('leave', name=>{
    append(`${name}: left the chat`, 'left');
});


// for enable more features
// const smily = document.getElementById("smily");
// const m_box = document.getElementById("m_box");
// smily.addEventListener('click',()=>{
    
    
// })

