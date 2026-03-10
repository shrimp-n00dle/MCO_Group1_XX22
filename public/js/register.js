const registerPopUp = document.getElementById("registerPopUp");
const registerForm = document.getElementById("registerForm").addEventListenter('submit', ToggleSuccessfulRegister(event)){
    event.preventDefault();
    registerPopUp.classList.toggle("hiddenPopUp");
    this.submit();
}

function RegisterUser(){
    var firstName = document.getElementById("firstName").required;
    var lastName = document.getElementById("lastName").required;
    var email = document.getElementById("email").required;
    var username = document.getElementById("username").required;
    var password = document.getElementById("password").required;

    ToggleSuccessfulRegister();
}

function ToggleSuccessfulRegister(){
    var popup = document.getElementById("registerPopUp");
    popup.classList.toggle("hiddenPopUp");
}
