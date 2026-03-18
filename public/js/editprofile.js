var popup = document.getElementById("successPopUp");

// Profile edits
async function ValidateUserProfileEdit() {
   var editForm = document.getElementById("EditProfileForm");
   const formData = new FormData(editForm);

   try {
        const response = await fetch('/editProfile', {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            editForm.reset();
            window.location.reload();
        } else {
            popup.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
            console.log("Something went wrong.");
        }
   } catch(e){
       console.log("Something went wrong.");
   }
}

function ToggleEditForm(event){
    event.preventDefault();
    ValidateUserProfileEdit();
}

// Account edits
function ToggleForm() {
    var profileFormContainer = document.getElementById("editProfileFormContainer");
    var accountFormContainer = document.getElementById("editAccountFormContainer");

    profileFormContainer.classList.toggle("hiddenPopUp");
    accountFormContainer.classList.toggle("hiddenPopUp");
}

async function ValidateUserAccEdit() {
   var editForm = document.getElementById("EditAccountForm");
   const formData = new FormData(editForm);

   try {
        const response = await fetch('/editProfile', {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            editForm.reset();
            popup.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
        } else {
            popup.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
            console.log("Something went wrong.");
        }
   } catch(e){
       console.log("Something went wrong.");
   }
}

function ToggleAccEditForm(event){
    event.preventDefault();
    ValidateUserAccEdit();
}

// Profile Delete
function ValidateAccountDeletion() {
    popup.classList.toggle("hiddenPopUp");
    popup.innerHTML = "<p>Are you sure you want to <b><i>permanently delete</b></i> your account? <b><u>This action cannot be undone.</b></u><button class=\"genButton-white\" style=\"float: left; width: 30%;\" onclick=\"TriggerDeleteAccount()\">I'm Sure</button><button class=\"genButton-red\" style=\"float: right; width: 30%;\" onclick=\"TriggerBackOut()\">Nevermind</button>";
}

async function TriggerDeleteAccount() {
    window.location.href = "/deleteAccount";
}

function TriggerBackOut() {
    popup.classList.toggle("hiddenPopUp");
}

var editForm = document.getElementById("EditProfileForm");
editForm.addEventListener("submit", ToggleEditForm);
var editForm2 = document.getElementById("EditAccountForm");
editForm2.addEventListener("submit", ToggleAccEditForm);
