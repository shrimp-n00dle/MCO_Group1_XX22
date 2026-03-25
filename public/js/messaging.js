async function MakeMessage() {
    var messageForm = document.getElementById("messageForm");
    const formData = new FormData(messageForm);

    var profileID = formData.get("reciever");
    const url = `/message/${profileID}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            window.location.reload();
        } else {
            // window.location.href = "/message";
        }
    } catch (e) {
        console.log("Oopsie");
    }
}

function ToggleMakeMessage(event) {
    event.preventDefault();
    MakeMessage();
}

var messageForm = document.getElementById("messageForm");
if (messageForm) {
    messageForm.addEventListener("submit", ToggleMakeMessage);
}