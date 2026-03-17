var popup = document.getElementById("invalidPopUp");

async function ValidateLogIn(){
   var logInForm = document.getElementById("logInForm");
   const formData = new FormData(logInForm);

   try {
       const response = await fetch('/log-in', {
           method: "POST",
           body: formData,
       });

        if (response.ok) {
            window.location.href = '/home';
        }
   } catch(e){
       console.log("Something went wrong.");
       popup.classList.toggle("hiddenPopUp");
   }

}

function ToggleSuccessfulLogIn(event){
    event.preventDefault();
    ValidateLogIn();
}

logInForm.addEventListener("submit", ToggleSuccessfulLogIn);

