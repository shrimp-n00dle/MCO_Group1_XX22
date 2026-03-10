const curr_emotion = document.querySelector(".emotion");
const curr_title = document.getElementById("inputTitleID");
const curr_body = document.getElementById("inputBodyID");

var post_button = document.getElementById("postBtnID");

const main_page = document.getElementById("postBodyID");

function addPost()
{
    /*BODY OF THE POST*/
    let post_template = document.createElement("div");
    post_template.classList.toggle("postContainer");

    let post_header = document.createElement("div");
    post_header.classList.toggle("postHeader");
    post_template.appendChild(post_header);

    /*USER NAME CREATION*/
    let post_user = document.createElement("h3");
    post_user.innerHTML = "[Add username here]";
    post_header.appendChild(post_user);

    /*BODY AND TITLE CREATION*/
    let post_body = document.createElement("div");
    post_body.innerHTML = curr_body.value;

    /*Title*/
    let post_title = document.createElement("h2");
    post_title.innerHTML = curr_title.value;
    post_header.appendChild(post_title);

    /*FOOTER CREATION*/
    let post_footer = document.createElement("div");
    post_footer.classList.toggle("postFooter");
     
                // <p class="postLikeCount">0</p>
                // <a href="">Like</a>
                // <p class="postCommentCount">0</p>
                // <a href="">Comment</a>


    /*LIKES RECEIVED*/
    let like_count = document.createElement("p");
    like_count.classList.toggle("postLikeCount");
    like_count.innerHTML = 0 + " Like Counts";
    post_footer.appendChild(like_count);

    /*COMMENTS RECEIVED*/
    let comm_count = document.createElement("p");
    comm_count.classList.toggle("postCommentCount");
    comm_count.innerHTML = 0 + " Comment Counts";
    post_footer.appendChild(comm_count);

    /*DATE AND TIME CREATED*/
    const date = new Date();
    let date_today = document.createElement("p");
    date_today.classList.toggle("postCommentCount");
    date_today.innerHTML = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + "   " + date.getHours() + ":" + date.getMinutes();
    post_footer.appendChild(date_today);


    post_body.appendChild(post_footer);


    post_template.appendChild(post_body);



    /*BINDING*/
    main_page.appendChild(post_template);


    //clear the text entrys
    curr_title.value = "";
    curr_body.value = "";
}

post_button.addEventListener("click",function(p)
{
    addPost();
}, false);

