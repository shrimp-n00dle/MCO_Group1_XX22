var popup = document.getElementById("registerPopUp");

async function RegisterUser() {
    var registerForm = document.getElementById("registerForm");
    const formData = new FormData(registerForm);

    try {
        const response = await fetch('/register', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        popup.innerHTML = "<p>Registration unsuccessful! Email might be taken.</p>";
    }
}

function ToggleSuccessfulRegister(event){
    event.preventDefault();
    popup.classList.toggle("hiddenPopUp");
    RegisterUser();
}

registerForm.addEventListener("submit", ToggleSuccessfulRegister);

