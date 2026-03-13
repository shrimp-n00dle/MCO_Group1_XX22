var commentPopUpObj = document.getElementById("commentPopUp");

async function AddComment()
{
    var commentForm = document.getElementById("commentForm");
    const formData = new FormData(commentForm);

    try {
        const response = await fetch('/posting', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        //commentPopUpObj.innerHTML = "<p>Invalid input detected. Please double check and try again!</p>";
    }
}

function ToggleAddComment(event)
{
    event.preventDefault();
    AddComment();

}
commentForm.addEventListener("submit", ToggleAddComment);
