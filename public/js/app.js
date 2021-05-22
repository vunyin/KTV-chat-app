

const SERVER_IP = "192.168.56.1";
const SERVER_PORT = 5000;
const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT + "/text";

function displayText(res){
   let message = res.data;
   console.log(message)
   let removeText= document.querySelectorAll('.alert');
   for(let textSend of removeText){
       textSend.remove()
   }
   for(let text of message){
       const sendText=document.createElement('div');
       sendText.classList.add('alert');
       sendText.classList.add('alert-info')

       const userName = document.createElement('strong');
       const texts = document.createElement('span');

       userName.textContent= text.username+': ';
       texts.textContent=text.message;

       sendText.appendChild(userName);
       sendText.appendChild(texts);
       boxChat.appendChild(sendText);
   }
    
}

function addText(event){
    event.preventDefault();
    const message = document.querySelector('#text').value;
    let sendmessage ={username:'Unknown',message:message};
    axios
    .post(BASE_URL,sendmessage)
    .then(displayText);

}
function loadData(){
    axios.get(BASE_URL).then(displayText)

}

const sendText = document.querySelector('.send-btn');
sendText.addEventListener('click',addText);
const boxChat=document.querySelector('.my-chat');
setInterval(loadData,2000);
