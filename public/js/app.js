// const e = require("express");


// const SERVER_IP = "192.168.56.1";
// const SERVER_PORT = 5000;
// const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT + "/text";
const BASE_URL = "https://ktv-chat-app.herokuapp.com/text"
let autoScroll = true;

/**
 * 
 * @param {*} res 
 * @description: for the display message
 */
function displayText(res) {
    let messager = res.data;
    const boxChat = document.querySelectorAll('.my-chat');
    const clientChat = document.querySelectorAll('.client-chat');
    for (let textSend of boxChat) {
        textSend.remove()
    }
    for (let textSend of clientChat) {
        textSend.remove();
    }
    for (let text of messager) {

        const newBox = document.createElement('div');
        const userName = document.createElement('strong');
        const texts = document.createElement('span');
        const time = document.createElement('div')
        time.classList.add('pro')
        texts.classList.add(text.color)

        texts.textContent = covertEmoji(text.message);
        texts.appendChild(time);
        time.textContent = text.time;
        userName.textContent = text.username + ":";

        newBox.appendChild(userName)
        newBox.appendChild(texts);
        newBox.appendChild(time)
        //bold message
        if(text.bold===true){
            texts.style.fontWeight="bold";
        }else{
            texts.style.fontWeight="normal";
        }
        //italic message
        if(text.italic===true){
            texts.style.fontStyle="italic";
        }else{
            texts.style.fontStyle="normal";
        }
        if (text.username === "Vun Yin" || text.username === "Kunthy Sen") {
            newBox.classList.add("my-chat")
            newBox.classList.add('right')
        } else {
            newBox.classList.add("client-chat")
            newBox.classList.add('left')
        }
        listChat.appendChild(newBox);
    }

}

/**
 * 
 *@descriptio : for Convert message to bold
 */
let boldClick = false;
let number = -1;
function convertBold(){
    boldClick=true;
    document.querySelector("#text").style.fontWeight= "bold";
    number+=1;
    if(number===2){
        document.querySelector("#text").style.fontWeight= "normal";
        boldClick=false;
        number=-1;

    }
}
const btnbold = document.querySelector("#bold")
btnbold.addEventListener('click',convertBold)


/**
 * @description : for Convert message to italic
 */
let italicClick = false;
let count = -1;
function convertItalic(){
    italicClick=true;
    document.querySelector("#text").style.fontStyle= "italic";
    count+=1;
    if(count===2){
        document.querySelector("#text").style.fontStyle= "normal";
        italicClick=false;
        count=-1;

    }
}
const btnItalic = document.querySelector("#italic")
btnItalic.addEventListener('click',convertItalic)

/**
 * 
 * @param {*} res 
 * @param {*} username 
 * @description : for display the profile picture of the user 
 */
function showImage(res, username) {
    let image = res.data;
    for (let im of image) {
        if (im.username === username) {
            let img = document.createElement('img');
            img.src = im.profile;
            images.appendChild(img)
            usernames.textContent = im.username;

        }
    }
}

/**
 * 
 * @description : for get picture from dataUsers in json file
 */
function getImage() {
    let user = localStorage.getItem('username');
    axios
        .get("http://192.168.56.1:5000/datausers")
        .then(res => showImage(res, user))
}

/**
 * 
 * @description : for convert message to emoji if have the same sign Example: <3 = ❤️
 */
let emojiList = {
    '<3': '❤️', ':)': '🙂', ':>': '👽', ':(': '😟', ':o': '😲', ':D': '😄', '><': '😆',
    '3:)': '😈', ':`': '😢', '-_-': '😑', ':p': '😝', '<(")': '🐁', '8)': '😎', 'o:)': '😇',
    '>:o': '😡', ':*': '😗'
};
function covertEmoji(emoji) {
    let textEmoji = emoji.split(" ");
    let newText = "";
    for (let word of textEmoji) {
        let isFound = false;
        for (let txt in emojiList) {
            if (word === txt) {
                newText += emojiList[txt];
                isFound = true
            }
        }
        if (!isFound) {
            newText += word
        }
        newText += " ";
    }
    return (newText)
}

/**
 * 
 * @param {*} event 
 * @description : for Send the message to client
 */
function addText(event) {
    event.preventDefault();
    if(document.querySelector('#text').value!==""){
        autoScroll=true;
        const message = document.querySelector('#text').value;
        let user = localStorage.getItem('username');
        let color = localStorage.getItem('color');
        let newTime = new Date();
        let setTime = newTime.getHours() + ":" + newTime.getMinutes();
        let sendmessage = { 
            username: user, 
            message: message, 
            color: color, 
            time: setTime,
            bold:boldClick,
            italic:italicClick
        }
        //sound alert when send message
        x.play();
        axios
        .post(BASE_URL, sendmessage)
        .then(displayText);
        document.querySelector("#text").value="";
    
    };
    
}
function loadData() {
    if(autoScroll){
        listChat.scrollTop = listChat.scrollHeight - listChat.clientHeight;
    }
    axios.get(BASE_URL).then(displayText)

}

//
function logout() {
    // localStorage.clear();
    window.location.href = url + '/index.html';
}
const url = "http://192.168.56.1:5000/";

const x=document.querySelector(".myAudio");
const usernames = document.querySelector('h2');
const images = document.querySelector("#img");
const sendText = document.querySelector('.send-btn');
const listChat = document.querySelector('.chats');
const btnSign = document.querySelector('.sign-up');
btnSign.addEventListener('click', logout);
sendText.addEventListener('click', addText);
listChat.addEventListener('scroll',()=>{
    autoScroll=false
})
setInterval(loadData, 2000);
getImage();
