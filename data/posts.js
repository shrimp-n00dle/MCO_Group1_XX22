let posts = [
    {
        id: 1,
        username: "user1",
        body: "Hey there im so cool",
        likeCount: "0",
        commentCount: "0",
    },
    {
        id: 2,
        username: "user2",
        body: "mannnnn does anyone here ever think abt the complexities of life and stuff like lowk life beautiful fr. #learner",
        likeCount: "10000",
        commentCount: "0",
    },
];

function nextID() {
    return posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
}

module.exports = {posts, nextID};