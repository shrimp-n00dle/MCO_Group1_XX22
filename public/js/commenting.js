var commentPopUpObj = document.getElementById("commentPopUp");

async function MakeComment()
{
    var commentForm = document.getElementById("commentForm");
    const formData = new FormData(commentForm);

    var postID = formData.get('postID');
    var url = `/home/${postID}/comment`;
    console.log(postID);
    console.log(url);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            commentPopUpObj.classList.toggle("hiddenPopUp");
            commentPopUpObj.innerHTML = "<p>Comment posted.</p>";
            var url = `/viewPost/${postID}`
            window.location.href = url;
        } else {
            commentPopUpObj.classList.toggle("hiddenPopUp");
            commentPopUpObj.innerHTML = "<p>Could not make comment.</p>";
        }
    } catch (e) {
        commentPopUpObj.classList.toggle("hiddenPopUp");
        commentPopUpObj.innerHTML = "<p>Something went wrong.</p>";
    }
}

function ToggleAddComment(event)
{
    event.preventDefault();
    MakeComment();
}

var commentForm = document.getElementById("commentForm");
commentForm.addEventListener("submit", ToggleAddComment);
