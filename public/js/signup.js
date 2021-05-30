

// const SERVER_IP = "192.168.56.1";
// const SERVER_PORT = 5000;
// const BASE_URL = "http://" + SERVER_IP + ":" + SERVER_PORT ;
const BASE_URL = "https://ktv-chat-app.herokuapp.com";

// Get all information of new user that already sign up
function NewUser(){
    // all information of the user cannot empty
    if(username.value!=="" && password.value!=="" && email.value!==""){
        //get value from input new user
        let getinfo = {
            username:username.value,
            password:password.value,
            color:"color-pink",
            profile:"images/pf.jpg",
            email:email.value
        }
        // create new user
        // the user need to have not the same email
        axios
        .post(BASE_URL+"/newuser",getinfo)
        .then((res)=>{
            if(!res.data){
                window.location.href= BASE_URL+"/index.html"
            }else{
                window.confirm("This email alreay exis!!")
            }
        })
        
    }
    
    
}
//Get all input from user
const username = document.querySelector("#user");
const password = document.querySelector("#pwd");
const email = document.querySelector("#email");
const profile = document.querySelector("#profile");
//give fuction to  the button for the new user sign up
const btnsignup = document.querySelector("#btn-signup");
btnsignup.addEventListener('click',NewUser)