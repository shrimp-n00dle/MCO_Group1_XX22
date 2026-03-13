async function ValidateLogIn(){
    var logInForm = document.getElementById("logInForm");
    const formData = new FormData(logInForm);

    try{
        const response = await fetch('/log-in', {
            method: "POST",
            body: formData,
        });
    } catch(e){
        //console.log("Username or password is incorrect.")
    }

}

function ToggleSuccessfulLogIn(event){
    event.preventDefault();
    ValidateLogIn();
}

logInForm.addEventListener("submit", ToggleSuccessfulLogIn);

