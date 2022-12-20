const mongoose = require("mongoose");

const jeuxVideoSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    plateforme: {
      type: String,
      required: true,
      enum: ["PS4", "PC", "XBOX-Serie S/X", "Switch", "Multi-Plateforme"],
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FPS",
        "TPS",
        "Combat",
        "RTS",
        "Simulation",
        "Plateforme",
        "RPG",
        "MMORPG",
        "Sandbox",
        "MOBA",
        "Battle Royale",
        "Action/Aventure",
        "Beat Them All",
        "Puzzlers",
        "Réflexion",
        "Survival Horror",
        "Rogue Like",
        "Hack’n’slash",
        "Party games",
        "Rythme",
        "Sport",
        "Course",
      ],
    },
    image: { type: String, required: true },
    metascore: { type: String, required: true },
    description: { type: String, required: true },
    linkTrailer: { type: String, required: true, unique: true, trim: true },
    editeurs: {
      type: String,
      required: true,
      enum: [
        "Activision/Blizzard",
        "Blizzard Entertainment",
        "Electronic Arts",
        "Take Two Interactive",
        "Epic Games",
        "Microsoft",
        "Warner Bros Interactive",
        "Ubisoft",
        "Sony Computer Entertainment",
        "CD Projekt",
        "Embracer Group",
        "Square Enix",
        "SEGA",
        "Capcom",
        "Bandai Namco",
        "Bethesda",
        "Nintendo",
        "Atlus",
        "Konami ",
        "Autre",
      ],
    },
    pegiImage: {
      type: String,
      required: true,
      enum: [
        "https://pegi.info/sites/default/files/inline-images/age-3-black_0.jpg",
        "https://pegi.info/sites/default/files/inline-images/age-7-black.jpg",
        "https://pegi.info/sites/default/files/inline-images/age-12-black.jpg",
        "https://pegi.info/sites/default/files/inline-images/age-16-black.jpg",
        "https://pegi.info/sites/default/files/inline-images/age-18-black%202_0.jpg",
      ],
    },
    dateDeSortie: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const JeuxVideo = mongoose.model("JeuxVideo", jeuxVideoSchema);
module.exports = JeuxVideo;
