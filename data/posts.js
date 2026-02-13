let posts = [
    {
        id: 1,
        username: "JAN-VINGNO",
        profilePicture: "/img/PFP_1.png",
        body: "Hey there im so cool",
        likeCount: "20",
        commentCount: "0",
    },
    {
        id: 2,
        username: "Ayze",
        profilePicture: "/img/PFP_3.png",
        body: "mannnnn does anyone here ever think abt the complexities of life and stuff like lowk life beautiful fr. #learner",
        likeCount: "10000",
        commentCount: "0",
    },
];

function nextID() {
    return posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
}

module.exports = {posts, nextID};