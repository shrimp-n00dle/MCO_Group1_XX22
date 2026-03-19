
var postPopUpObj = document.getElementById("postPopUp");

async function EditPost()
{
    var postForm = document.getElementById("postEditForm");
    const formData = new FormData(postForm);

    var url = `/viewPost/${formData.get("postID")}/edit`;

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

var postForm = document.getElementById("postEditForm");
postForm.addEventListener("submit", ToggleEditPost);


