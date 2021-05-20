const SERVER_IP = "192.168.56.1";
const SERVER_PORT = 5000;
const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT + "/text";

function addText(event){
    event.preventDefault();

    let Datatext =[{
        text: textInput.value,
    }]
    const NewUl = document.querySelector('ul');
    if(NewUl !== null){
        NewUl.remove();
    }
    for (let mess of Datatext){
        let newtext = document.createElement('li');
        newtext.className = 'chats';
        newtext.textContent = mess["text"].value;
        NewUl.appendChild(newtext)


    }
    axios.post(BASE_URL,Datatext)

}

function loadText(){

    axios.get(BASE_URL).then(displayText)
}


function displayText(res){
    let text = res.data;
    let char = text.text
    textMessage.textContent = char;



}



const sendText = document.querySelector('.send-btn');
sendText.addEventListener('click',addText)

const textInput = document.querySelector('#text');
const textMessage = document.querySelector('.chats');

// const textPara = document.querySelector('p');

loadText();