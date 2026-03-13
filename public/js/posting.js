// const currEmotion = document.querySelector(".emotion");
// const currTitle = document.getElementById("inputTitleID");
// const currBody = document.getElementById("inputBodyID");
// var postButton = document.getElementById("postBtnID");
// const mainPage = document.getElementById("postBodyID");


var postPopUpObj = document.getElementById("postPopUp");
async function AddPost()
{
    var postForm = document.getElementById("postForm");
    const formData = new FormData(postForm);

    try {
        const response = await fetch('/posting', {
            method: "POST",
            body: formData,
        });
    } catch (e) {
        //Ur choice Yza if yall wanna add popups on this one, commmented it out since its frontend
        //postPopUpObj.innerHTML = "<p>Invalid input detected. Please double check and try again!</p>";
    }
}

function ToggleAddPost(event)
{
    event.preventDefault();
    AddPost();
}

postForm.addEventListener("submit", ToggleAddPost);


