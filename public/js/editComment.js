
var commentPopUpObj = document.getElementById("commentPopUp");
var commentPopUpObj2 = document.getElementById("commentPopUp2");

async function EditComment()
{
    var commentForm = document.getElementById("commentEditForm");
    const formData = new FormData(commentForm);

    var commentID = formData.get('commentID');
    var postID = formData.get('postID');
    var url = `/viewPost/${postID}/${commentID}/edit`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            var url = `/viewPost/${postID}`;
            window.location.href = url;
        } else {
            commentPopUpObj.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
        }
    } catch (e) {
        commentPopUpObj.classList.toggle("hiddenPopUp");
        commentPopUpObj.innerHTML = "<p>Something went wrong... Please try again!</p>";
    }
}

function ToggleEditComment(event)
{
    event.preventDefault();
    EditComment();
}

async function DeleteComment(postID, commentID) {
    var url = `/viewPost/${postID}/${commentID}/edit`;

    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ 
            delete: "true",
            postID: postID,
            commentID: commentID
        })
    });

    if (response.ok) {
        var url = `/viewPost/${postID}`;
        window.location.href = url;
    } else {
        commentPopUpObj.classList.toggle("hiddenPopUp");
        commentPopUpObj.innerHTML = (await response.text()).toString();
    }
}

function ValidateCommentDeletion() {
    commentPopUpObj2.classList.toggle("hiddenPopUp");
}

var commentForm = document.getElementById("commentEditForm");
commentForm.addEventListener("submit", ToggleEditComment);


