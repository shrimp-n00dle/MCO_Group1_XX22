const curr_emotion = document.querySelector(".emotion");
const curr_title = document.getElementById("inputTitleID");
const curr_body = document.getElementById("inputBodyID");
var post_button = document.getElementById("postBtnID");
const main_page = document.getElementById("postBodyID");


function addPost()
{
    /*BODY OF THE POST**************************************************/
    let post_template = document.createElement("div");
    post_template.classList.toggle("postContainer");

    let post_header = document.createElement("div");
    post_header.classList.toggle("postHeader");
    post_template.appendChild(post_header);

    /*USER NAME CREATION************************************************/
    let post_user = document.createElement("h3");
    post_user.innerHTML = "[Add username here]";
    post_header.appendChild(post_user);

    /*BODY AND TITLE CREATION*******************************************/
    let post_body = document.createElement("div");
    post_body.innerHTML = curr_body.value;
    /*Title*/
    let post_title = document.createElement("h2");
    post_title.innerHTML = curr_title.value;
    post_header.appendChild(post_title);

    /*FOOTER CREATION***************************************************/
    let post_footer = document.createElement("div");
    post_footer.classList.toggle("postFooter");

    /*LIKES RECEIVED****************************************************/
    let like_count = document.createElement("p");
    like_count.classList.toggle("postLikeCount");
    like_count.innerHTML = 0 + " Like Counts";
    /*Like Button*/
    let like_button = document.createElement("button");
    like_button.classList.toggle("genButton-red");
    like_button.innerHTML = "Like This Post";
    like_count.appendChild(like_button);    
    post_footer.appendChild(like_count);

    /*COMMENTS RECEIVED************************************************/
    let comm_count = document.createElement("p");
    comm_count.classList.toggle("postCommentCount");
    comm_count.innerHTML = 0 + " Comment Counts";
    /*Comment Button*/
    let comm_button = document.createElement("button");
    comm_button.classList.toggle("genButton-red");
    comm_button.innerHTML = "Leave a Comment";
    comm_count.appendChild(comm_button);    
    post_footer.appendChild(comm_count);

    /*DATE AND TIME CREATED*******************************************/
    const date = new Date();
    let date_today = document.createElement("p");
    date_today.classList.toggle("postCommentCount");
    date_today.innerHTML = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + "   " + date.getHours() + ":" + date.getMinutes();
    post_footer.appendChild(date_today);

    /*TEMP ADDING OF COMMENT BODY********************************/
    let reply_body = document.createElement("div");
    reply_body.classList.toggle("commentBody");
    reply_body.innerHTML = "Test";
     /*LIKES RECEIVED*/
    let reply_like = document.createElement("p");
    reply_like.classList.toggle("postLikeCount");
    reply_like.innerHTML = 0 + " Like Counts";
    /*Like Button*/
    let reply_like_button = document.createElement("button");
    reply_like_button.classList.toggle("genButton-red");
    reply_like_button.innerHTML = "Like This Post";
    reply_like.appendChild(reply_like_button);    
    reply_body.appendChild(reply_like);
     /*COMMENTS RECEIVED**/
    let reply_comm_count = document.createElement("p");
    reply_comm_count.classList.toggle("postCommentCount");
    reply_comm_count.innerHTML = 0 + " Comment Counts";
    /*Comment Button*/
    let reply_comm_button = document.createElement("button");
    reply_comm_button.classList.toggle("genButton-red");
    reply_comm_button.innerHTML = "Leave a Comment";
    reply_comm_count.appendChild(reply_comm_button);    
    reply_body.appendChild(reply_comm_count);
    /******************************************************************** */


    /*BINDING*/
    //post_footer.appendChild(reply_body);
    post_body.appendChild(post_footer);
    post_template.appendChild(post_body);
    main_page.appendChild(post_template);



    




    //clear the text entrys
    curr_title.value = "";
    curr_body.value = "";
}

post_button.addEventListener("click",function(p)
{
    addPost();
}, false);




function addComment()
{

}



