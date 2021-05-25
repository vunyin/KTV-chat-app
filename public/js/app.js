

// const SERVER_IP = "192.168.56.1";
// const SERVER_PORT = 5000;
// const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT + "/text";
const BASE_URL = "https://ktv-chat-app.herokuapp.com/text"

function displayText(res) {
    let message = res.data;
    console.log(message)
    const boxChat = document.querySelectorAll('.my-chat');
    //    let removeText= document.querySelectorAll('.alert');
    //    for(let textSend of removeText){
    //        textSend.remove()
    //    }
    for (let textSend of boxChat) {
        textSend.remove()
    }
    for (let text of message) {
        console.log(text.color)
        const newBox = document.createElement('div');
        newBox.classList.add("my-chat")
        newBox.classList.add('right')
        // const sendText = document.createElement('div');
        //    sendText.classList.add('alert');
        //    sendText.classList.add('alert-info')

        const userName = document.createElement('strong');
        const texts = document.createElement('span');
        texts.classList.add(text.color)

        userName.textContent = text.username + ': ';
        texts.textContent = text.message;

        newBox.appendChild(userName);
        newBox.appendChild(texts);
        listChat.appendChild(newBox);
    }

}


function addText(event) {
    event.preventDefault();
    const message = document.querySelector('#text').value;
    let user = localStorage.getItem('username');
    let color = localStorage.getItem('color');
    let sendmessage = { username: user, message: message, color: color };
    axios
        .post(BASE_URL, sendmessage)
        .then(displayText);

}
function loadData() {
    axios.get(BASE_URL).then(displayText)

}

const sendText = document.querySelector('.send-btn');
const listChat = document.querySelector('.chats');
sendText.addEventListener('click', addText);
setInterval(loadData, 2000);
