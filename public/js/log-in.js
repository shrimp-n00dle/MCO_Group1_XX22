const logInForm = document.getElementById("logInForm");

function ValidateLogIn(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    //Code for log-in validation here

    //should be an if statement where if email && password are valid and match, then:
    GoToHome();
}

function GoToHome(event){
    logInForm.requestSubmit();
}

logInForm.addEventListener("submit", GoToHome);

