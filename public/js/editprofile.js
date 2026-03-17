async function Validate(){
   var editForm = document.getElementById("EditProfileForm");
   const formData = new FormData(editForm);

   try {
       const response = await fetch('/editProfile', {
           method: "POST",
           body: formData,
       });

        if (response.ok) {
            console.log("Successful update");
        } else {
            console.log("Something went wrong.");
        }
   } catch(e){
       console.log("Something went wrong.");
   }

}

function ToggleEditForm(event){
    event.preventDefault();
    Validate();
    window.location.reload();
}

editForm.addEventListener("submit", ToggleEditForm);