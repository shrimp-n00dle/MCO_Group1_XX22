var popup = document.getElementById("invalidPopUp");

async function ValidateLogIn(){
   var logInForm = document.getElementById("logInForm");
   const formData = new FormData(logInForm);

   try {
       const response = await fetch('/log-in', {
           method: "POST",
           body: formData,
       });
   } catch(e){
       console.log("Username and password do not match.");
       popup.classList.toggle("hiddenPopUp");
   }

}

function ToggleSuccessfulLogIn(event){
    event.preventDefault();
    window.location.href = '/home';
    ValidateLogIn();
}

logInForm.addEventListener("submit", ToggleSuccessfulLogIn);

