const currEmotion = document.querySelector(".emotion");
const currTitle = document.getElementById("inputTitleID");
const currBody = document.getElementById("inputBodyID");
var postButton = document.getElementById("postBtnID");
const mainPage = document.getElementById("postBodyID");


function addPost()
{
    /*BODY OF THE POST**************************************************/
    let postTemplate = document.createElement("div");
    postTemplate.classList.toggle("postContainer");

    let postHeader = document.createElement("div");
    postHeader.classList.toggle("postHeader");
    postTemplate.appendChild(postHeader);

    /*USER NAME CREATION************************************************/
    let postUser = document.createElement("h3");
    postUser.innerHTML = "[Add username here]";
    postHeader.appendChild(postUser);

    /*BODY AND TITLE CREATION*******************************************/
    let postBody = document.createElement("div");
    postBody.innerHTML = currBody.value;
    /*Title*/
    let postTitle = document.createElement("h2");
    postTitle.innerHTML = currTitle.value;
    postHeader.appendChild(postTitle);

    /*FOOTER CREATION***************************************************/
    let postFooter = document.createElement("div");
    postFooter.classList.toggle("postFooter");

    /*LIKES RECEIVED****************************************************/
    let likeCount = document.createElement("p");
    likeCount.classList.toggle("postLikeCount");
    likeCount.innerHTML = 0 + " Like Counts";
    /*Like Button*/
    let likeButton = document.createElement("button");
    likeButton.classList.toggle("genButton-red");
    likeButton.innerHTML = "Like This Post";
    likeCount.appendChild(likeButton);    
    postFooter.appendChild(likeCount);

    /*COMMENTS RECEIVED************************************************/
    let commCount = document.createElement("p");
    commCount.classList.toggle("postCommentCount");
    commCount.innerHTML = 0 + " Comment Counts";
    /*Comment Button*/
    let commButton = document.createElement("button");
    commButton.classList.toggle("genButton-red");
    commButton.innerHTML = "Leave a Comment";
    commCount.appendChild(commButton);    
    postFooter.appendChild(commCount);

    /*DATE AND TIME CREATED*******************************************/
    const date = new Date();
    let dateToday = document.createElement("p");
    dateToday.classList.toggle("postCommentCount");
    dateToday.innerHTML = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + "   " + date.getHours() + ":" + date.getMinutes();
    postFooter.appendChild(dateToday);

    /*TEMP ADDING OF COMMENT BODY********************************/
    let replyBody = document.createElement("div");
    replyBody.classList.toggle("commentBody");
    replyBody.innerHTML = "Test";
     /*LIKES RECEIVED*/
    let replyLike = document.createElement("p");
    replyLike.classList.toggle("postLikeCount");
    replyLike.innerHTML = 0 + " Like Counts";
    /*Like Button*/
    let replyLikeButton = document.createElement("button");
    replyLikeButton.classList.toggle("genButton-red");
    replyLikeButton.innerHTML = "Like This Post";
    replyLike.appendChild(replyLikeButton);    
    replyBody.appendChild(replyLike);
     /*COMMENTS RECEIVED**/
    let replyCommCount = document.createElement("p");
    replyCommCount.classList.toggle("postCommentCount");
    replyCommCount.innerHTML = 0 + " Comment Counts";
    /*Comment Button*/
    let replyCommButton = document.createElement("button");
    replyCommButton.classList.toggle("genButton-red");
    replyCommButton.innerHTML = "Leave a Comment";
    replyCommCount.appendChild(replyCommButton);    
    replyBody.appendChild(replyCommCount);
    /******************************************************************** */

    /*BINDING*/
    //postFooter.appendChild(replyBody);
    postBody.appendChild(postFooter);
    postTemplate.appendChild(postBody);
    main_page.appendChild(postTemplate);

    //clear the text entrys
    currTitle.value = "";
    currBody.value = "";
}

post_button.addEventListener("click",function(p)
{
    addPost();
}, false);




function addComment()
{

}



