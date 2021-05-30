// const SERVER_IP = "192.168.56.1";
// const SERVER_PORT = 5000;
// const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT ;
const BASE_URL = "https://ktv-chat-app.herokuapp.com";

/**
 * 
 * @param {*} response 
 * @param {*} username 
 * @param {*} pass 
 * 
 *@description : for process of user login to application
 */
let loginProcess=(response,username,pass)=>{
    let datausers= response.data;
    let isLogin = false;
    for(let user of datausers){
        if(user.username === username && user.password===pass && !isLogin ){
            window.location.href = BASE_URL+'/chat.html';
            isLogin = true;
            localStorage.setItem('username',username);
            localStorage.setItem('password',pass);
            localStorage.setItem('color',user.color);
        }
    }
    if(isLogin){
        alert("Success login");
    }else{
        alert('Cannot login');
    }
        
}

// condition for login chat
let isLogined = localStorage.length>0;
if(isLogined){
    window.location.herf = BASE_URL+'/chat.html';
}
/**
 * 
 * @param {*} event 
 * @description : get value from login
 */
function login(event){
    let username = document.querySelector('#user').value;
    let password = document.querySelector('#pwd').value;

    axios
    .get(BASE_URL+'/datausers')
    .then(res=>loginProcess(res,username,password))
}
//give ethe function to do the process login
const btnlogin = document.querySelector('#btn-login');
btnlogin.addEventListener('click',login);