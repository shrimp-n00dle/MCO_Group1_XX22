const registerForm = document.getElementById("registerForm");

function RegisterUser(){
    var firstName = document.getElementById("firstName").required;
    var lastName = document.getElementById("lastName").required;
    var email = document.getElementById("email").required;
    var username = document.getElementById("username").required;
    var password = document.getElementById("password").required;

    ToggleSuccessfulRegister();
}

function ToggleSuccessfulRegister(event){
    event.preventDefault();
    var popup = document.getElementById("registerPopUp");
    popup.classList.toggle("hiddenPopUp");
    registerForm.requestSubmit();
}

registerForm.addEventListener("submit", ToggleSuccessfulRegister);

