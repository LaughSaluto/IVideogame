const mongoose = require("mongoose");

const listeFavorisSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  idJeuxVideo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "JeuxVideo",
  },
});

const ListeFavori = mongoose.model("ListeFavori", listeFavorisSchema);

module.exports = ListeFavori;
