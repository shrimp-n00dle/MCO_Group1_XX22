// function CheckClick() {

// }
var popUp = document.getElementById("homePopUp");

async function ToggleLike(postID) {
    const response = await fetch('/home', {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ 
            postID: postID
        })
    });

    if (response.ok) {
        window.location.reload();
    } else {
        popUp.classList.toggle("hiddenPopUp");
        popUp.innerHTML = (await response.text()).toString();
    }
}

function ToggleComment(postID) {
    var id = postID;
    var url = `/home/${postID}/comment`;
    window.location.href = url;
}