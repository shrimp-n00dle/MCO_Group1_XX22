

async function GiveLike()
{
    var likeCount = document.getElementById("commentLikeCount");
    const formData = new FormData(likeCount);

    try {
        const response = await fetch('/posting', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        //Ur choice Yza if yall wanna add popups on this one, commmented it out since its frontend
        //commentPopUpObj.innerHTML = "<p>Invalid input detected. Please double check and try again!</p>";
    }
}

function ToggleLike(event)
{
    event.preventDefault();
    GiveLike();

}

likeCount.addEventListener("submit", ToggleLike);
