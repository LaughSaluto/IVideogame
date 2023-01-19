const Jeuxvideo = require("../models/JeuxVideo");
const fs = require("fs/promises");

// POST (Crée un jeu)
exports.addGame = async (req, res) => {
  try {
    if (req.payload.role !== "admin") {
      return res.status(401).json("Vous n'aviez pas l'autorisation.");
    }
    req.body.image = `uploads/${req.file.filename}`;

    const jeuxvideo = await Jeuxvideo.create(req.body);
    res.status(201).json(jeuxvideo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET (Affiche tous les jeux)
exports.getAllGame = async (req, res) => {
  try {
    let jeuxvideo = await Jeuxvideo.find();
    res.status(200).json(jeuxvideo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET ( Récuperer une annonce avec son id )
exports.getGame = async (req, res) => {
  try {
    let jeuxvideo = await Jeuxvideo.findById(req.params.id);

    if (!jeuxvideo) {
      return res.status(404).json("le jeu n'existe pas");
    }

    res.status(200).json(jeuxvideo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Delete (Supprimer un jeu uniquement pour les admin)
exports.DeleteGame = async (req, res) => {
  try {
    let jeuxvideo = await Jeuxvideo.findById(req.params.id);

    if (!jeuxvideo) {
      return res.status(404).json("Le jeuxvideo n'existe pas.");
    }

    if (req.payload.role !== "admin") {
      res.status(401).json("Vous n'aviez pas le bon rôle.");
    }
    await jeuxvideo.remove();
    res.status(200).json(jeuxvideo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// PUT (Mise à jour d'un jeu par id)
exports.updateGame = async (req, res) => {
  try {
    let jeuxvideo = await Jeuxvideo.findById(req.params.id);

    if (!jeuxvideo) {
      return res.status(404).json("Le jeuxvideo n'existe pas.");
    }

    if (req.payload.role !== "admin") {
      res.status(401).json("Vous n'aviez pas le bon rôle.");
    }

    if (req.file) {
      await fs.unlink(jeuxvideo.image);
      jeuxvideo.image = `uploads/${req.file.filename}`;
    }

    jeuxvideo.titre = req.body.titre;
    jeuxvideo.plateforme = req.body.plateforme;
    jeuxvideo.genre = req.body.genre;
    jeuxvideo.metascore = req.body.metascore;
    jeuxvideo.description = req.body.description;
    jeuxvideo.linkTrailer = req.body.linkTrailer;
    jeuxvideo.editeurs = req.body.editeurs;
    jeuxvideo.pegiImage = req.body.pegiImage;
    jeuxvideo.dateDeSortie = req.body.dateDeSortie;
    await jeuxvideo.save();
    res.status(201).json(jeuxvideo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
