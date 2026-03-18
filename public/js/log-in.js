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
        } else {
            popup.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
        }
   } catch(e){
       console.log("Something went wrong.");
   }

}

function ToggleSuccessfulLogIn(event){
    event.preventDefault();
    ValidateLogIn();
}

var logInForm = document.getElementById("logInForm");
logInForm.addEventListener("submit", ToggleSuccessfulLogIn);

