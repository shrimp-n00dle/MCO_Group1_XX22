
async function GiveLike()
{
    var likeCount = document.getElementById("likeCount");
    const formData = new FormData(likeCount);

    try {
        const response = await fetch('/posting', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        //commentPopUpObj.innerHTML = "<p>Invalid input detected. Please double check and try again!</p>";
    }
}

function ToggleLike(event)
{
    event.preventDefault();
    GiveLike();

}

likeCount.addEventListener("submit", ToggleLike);
