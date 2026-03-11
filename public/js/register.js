import User from "../../db/models/user";

const registerForm = document.getElementById("registerForm");

function RegisterUser(){
    var regFirstName = document.getElementById("firstName").value;
    var regLastName = document.getElementById("lastName").value;
    var regEmail = document.getElementById("email").value;
    var regUsername = document.getElementById("username").value;
    var regPassword = document.getElementById("password").value;

    ToggleSuccessfulRegister();
    CreateNewUser(regFirstName, regLastName, regEmail, regUsername, regPassword);
}

function ToggleSuccessfulRegister(event){
    event.preventDefault();
    var popup = document.getElementById("registerPopUp");
    popup.classList.toggle("hiddenPopUp");
    registerForm.requestSubmit();
}

function CreateNewUser(regFirstName, regLastName, regEmail, regUsername, regPassword){
    User.create({
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        username: regUsername,
        password: regPassword,
        followerCount: 0,
        profilePicture: '',
        banner: '',
        bio: '',
        interestedGameGenres: [''],
        employmentStatus: ''
    }), err => {
       if(err) return err;
       console.log("User registered successfully!"); 
    }
}

registerForm.addEventListener("submit", ToggleSuccessfulRegister);

