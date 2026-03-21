async function Follow(userID) {
    var urlID = userID;
    var url = `/viewProfile/${urlID}`;

    const response = await fetch(url,  {
        method: "POST",
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({ 
            userID: userID
        })
    });

    if (response.ok) {
        window.location.reload();
    } else {
        console.log("Something went wrong: ");
    }
}