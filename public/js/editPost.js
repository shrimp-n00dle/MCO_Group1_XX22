
var postPopUpObj = document.getElementById("postPopUp");
var postPopUpObj2 = document.getElementById("postPopUp2");

async function EditPost()
{
    var postForm = document.getElementById("postEditForm");
    const formData = new FormData(postForm);

    var postid = formData.get('postID');
    var url = `/viewPost/${postid}/edit`;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            window.location.href = "/home";
        } else {
            postPopUpObj.classList.toggle("hiddenPopUp");
            popup.innerHTML = (await response.text()).toString();
        }
    } catch (e) {
        postPopUpObj.classList.toggle("hiddenPopUp");
        postPopUpObj.innerHTML = "<p>Something went wrong... Please try again!</p>";
    }
}

function ToggleEditPost(event)
{
    event.preventDefault();
    EditPost();
}

async function DeletePost(postID) {
    var url = `/viewPost/${postID}/edit`;

    const response = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ 
            delete: "true",
            postID: postID
        })
    });

    if (response.ok) {
        window.location.href = "/home";
    } else {
        postPopUpObj.classList.toggle("hiddenPopUp");
        postPopUpObj.innerHTML = (await response.text()).toString();
    }
}

function ValidatePostDeletion() {
    postPopUpObj2.classList.toggle("hiddenPopUp");
}

var postForm = document.getElementById("postEditForm");
postForm.addEventListener("submit", ToggleEditPost);


