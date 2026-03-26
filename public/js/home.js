var popUp = document.getElementById("homePopUp");

async function ToggleLike(postID) {
    const response = await fetch('/home', {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ 
            postID: postID
        })
    });

    if (response.ok) {
        window.location.reload();
    } else {
        popUp.classList.toggle("hiddenPopUp");
        popUp.innerHTML = (await response.text()).toString();
    }
}

function ToggleComment(postID) {
    var id = postID;
    var url = `/home/${postID}/comment`;
    window.location.href = url;
}

function ToggleSearch(event) {
    event.preventDefault();
    var searchForm = document.getElementById("searchBarForm");
    var formData = new FormData(searchForm);

    var searchQuery = formData.get("searchQuery");
    if (searchQuery !== "" ) {
        var trimmed = searchQuery.trim();
        var keyword = trimmed.replace(/\s/g, "_");
        var url = `/home/search/${keyword}`
        window.location.href = url;
    } else {
        popUp.classList.toggle("hiddenPopUp");
        popUp.innerHTML = "<p>Search cannot be empty!</p>";
    }
}

var searchForm = document.getElementById("searchBarForm");
searchForm.addEventListener("submit", ToggleSearch);