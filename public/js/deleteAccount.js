var popup = document.getElementById("deletePopUp");

async function TriggerRealDeleteAccount() {
    try {
        const response = await fetch('/deleteAccount', {
            method: "POST"
        });

        if (response.ok) {
            window.location.href = "/welcome";
        } else {
            popup.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
            console.log("Something went wrong.");
        }
   } catch(e){
       console.log("Something went wrong.");
   }
}