const socket = io();
let user;
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresa tu nombre de usuario",
    allowOutsideClick: false,
    inputValidator: (value)=>{
        return !value && "Necsitas identificarte"
    }
}).then(result=>{
    user = result.value
    socket.emit("registered", user)
})

let chatBox = document.getElementById("chatBox");

chatBox.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        if(chatBox.value.trim().length>0){
            socket.emit("message",{
                userName: user,
                message:chatBox.value
            })
            chatBox.value=""
        }
    }
})


//SOCKETS
socket.on('newUser',(data)=>{
    Swal.fire({
        icon: "success",
        text: "Usuario conectada",
        toast: true,
        position:"top-right"
    })
})

socket.on("log",data=>{
    let log = document.getElementById("log");
    let messages = "";
    data.forEach(msg => {
        messages = messages + `${msg.userName} dice: ${msg.message} </br>`
    });
    log.innerHTML = messages;
})