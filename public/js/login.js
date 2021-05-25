const SERVER_IP = "192.168.56.1";
const SERVER_PORT = 5000;
const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT ;


let loginProcess=(response,username,pass)=>{
    let datausers= response.data;
    console.log(datausers)
    let isLogin = false;
    for(let user of datausers){
        if(user.name === username && user.password===pass && !isLogin){
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



function login(event){
    let username = document.querySelector('#user').value;
    let password = document.querySelector('#pwd').value;
    console.log(username)
    console.log(password);

    axios
    .get(BASE_URL+'/datausers')
    .then(res=>loginProcess(res,username,password))
}

const btnlogin = document.querySelector('#btn-login');
btnlogin.addEventListener('click',login);