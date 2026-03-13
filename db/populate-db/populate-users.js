const { mongoose } = require('mongoose');

async function PopulateUsers() {
    var newUser = require('./models/user.js');
    await newUser.create({
        firstName: "Megan Florence Sophia",
        lastName: "Sadio",
        email: "megan_florence_sadio@dlsu.edu.ph",
        username: "si_szas",
        password: "VERYscureP@SSW0rd",
        followerCount: 2458,
        profilePicture: "/img/PFP_2.png", 
        banner: "/img/banner_2.png", 
        bio: "Project Manager | Quality Assurance | Game Developer | Gengar Enjoyer",
        interestedGameGenres: ["Roguelike", "Action", "Hack and Slash"],
        employmentStatus: "FREELANCE"
    });

    await newUser.create({
        firstName: "Yzabelle Anne",
        lastName: "Malabuyoc",
        email: "yzabelle_montuerto@dlsu.edu.ph",
        username: "solarsalvation",
        password: "sleepisGOODIWANTTOZZZ",
        followerCount: 130,
        profilePicture: "/img/PFP_3.png", 
        banner: "/img/banner_3.png", 
        bio: "MunDos Writing Lead / UI Programmer / White-hair, short-bangs women enjoyer",
        interestedGameGenres: ["Casual"],
        employmentStatus: "FREELANCE"
    });

    await newUser.create({
        firstName: "Jan",
        lastName: "Vingno",
        email: "jan_vingno@dlsu.edu.ph",
        username: "alternativerchic",
        password: "ThisIsaT0tallYR3alPASS",
        followerCount: 81,
        profilePicture: "/img/PFP_1.png",
        banner: "/img/banner_1.png",
        bio: "Game Developer || 23 || Bill Cipher Defender",
        interestedGameGenres: ["Puzzle", "Detective"],
        employmentStatus: "FREELANCE"
    });

    await newUser.create({
        firstName: "Evelot",
        lastName: "Bartynewl",
        email: "evelot.bartynewl@gmail.com",
        username: "EV-Lot",
        password: "evelot&eithmirDABEST!",
        followerCount: 218543,
        profilePicture: "/img/PFP_4.png", 
        banner: "/img/banner_4.png", 
        bio: "Just a silly 3D & VFX Artist girl",
        interestedGameGenres: ["Horror", "Fantasy", "Action"],
        employmentStatus: "FULL-TIME"
    });

    await newUser.create({
        firstName: "Valfyn",
        lastName: "Irosor",
        email: "Valfyn_Irosor@gmail.com",
        username: "TheRealValfyn",
        password: "3ldritchBLAAAST",
        followerCount: 169210,
        profilePicture: "/img/PFP_5.png", 
        banner: "/img/banner_5.png", 
        bio: "Quality Assurance // Back-end Developer // Loves swimming",
        interestedGameGenres: ["Fitness", "Underwater"],
        employmentStatus: "NOT AVAILABLE"
    });

    await newUser.create({
        firstName: "Julianne",
        lastName: "Malabuyoc",
        email: "jolyan_email@gmail.com",
        username: "J2Uhmmm",
        password: "mmmUH2J_",
        followerCount: 1001603,
        profilePicture: "/img/Garnet_Logo.png", 
        banner: "/img/Garnet_Logo.png",
        bio: "jus a girl",
        interestedGameGenres: ["Detective", "Point and Click", "Simulation"],
        employmentStatus: "FREELANCE"
    });

    await newUser.create({
        firstName: "Rommel",
        lastName: "Lapuz",
        email: "rommel_DG@gmail.com",
        username: "RommeL",
        password: "servillanoWASH3re",
        followerCount: 1001,
        profilePicture: "/img/Garnet_Logo.png", 
        banner: "/img/Garnet_Logo.png",
        bio: "One of the six Disidensiyang Giyala Leaders.",
        interestedGameGenres: ["Realtime Simulation", "Romance"],
        employmentStatus: "FULL-TIME"
    });
}

module.exports = {
    PopulateUsers
}