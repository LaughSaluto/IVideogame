const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    note: { type: Number, required: true, max: 10, min: 0 },
    évaluation: { type: String, required: true, trim: true },
    idJeuxVideo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "JeuxVideo",
    },
  },
  { timestamps: true }
);
const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = Commentaire;
