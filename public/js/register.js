import User from "../../db/models/user";

const registerForm = document.getElementById("registerForm");

function RegisterUser(){
    var regFirstName = document.getElementById("firstName").required;
    var regLastName = document.getElementById("lastName").required;
    var regEmail = document.getElementById("email").required;
    var regUsername = document.getElementById("username").required;
    var regPassword = document.getElementById("password").required;

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

