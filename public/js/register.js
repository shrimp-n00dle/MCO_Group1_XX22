var registerForm = document.getElementById("registerForm");
var popup = document.getElementById("registerPopUp");

async function RegisterUser() {
    const formData = new FormData(registerForm);

    try {
        const response = await fetch('/register', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        popup.innerHTML = "<p>Something went wrong.</p>";
    }
}

function ToggleSuccessfulRegister(event){
    event.preventDefault();
    popup.classList.toggle("hiddenPopUp");
    RegisterUser();
}

// function CreateNewUser(regFirstName, regLastName, regEmail, regUsername, regPassword){
//     User.create({
//         firstName: regFirstName,
//         lastName: regLastName,
//         email: regEmail,
//         username: regUsername,
//         password: regPassword,
//         followerCount: 0,
//         profilePicture: '',
//         banner: '',
//         bio: '',
//         interestedGameGenres: [''],
//         employmentStatus: ''
//     }), err => {
//        if(err) return err;
//        console.log("User registered successfully!"); 
//     }
// }

registerForm.addEventListener("submit", ToggleSuccessfulRegister);

