const curr_emotion = document.querySelector(".emotion");
const curr_title = document.getElementById("inputTitleID");
const curr_body = document.getElementById("inputBodyID");

var post_button = document.getElementById("postBtnID");

const main_page = document.getElementById("postBodyID");

function addPost()
{
    let post_template = document.createElement("div");
    post_template.classList.toggle("contentCard-light");
    post_template.innerHTML = curr_body.value;
    main_page.appendChild(post_template);


    //clear the text entrys
    curr_title.value = "";
    curr_body.value = "";
}

post_button.addEventListener("click",function(p)
{
    addPost();
}, false);

