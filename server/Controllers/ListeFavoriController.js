const ListeFavori = require("../models/ListeFavori");
const JeuxVideo = require("../models/JeuxVideo");

// Post (Ajouter un jeu à la liste des favoris de l'utilisateur connecté)
exports.addFavori = async (req, res) => {
  try {
    req.body.idUser = req.payload.id;
    let jeuxVideo = await JeuxVideo.findById(req.body.idJeuxVideo);

    let listeFavori = await ListeFavori.find()
      .where("idUser", req.payload.id)
      .populate("idJeuxVideo");

    // Chercher si le jeu existe déjà dans la liste
    const produitListeFavori = listeFavori.find(
      (jeuxVideo) => jeuxVideo.idJeuxVideo._id == req.body.idJeuxVideo
    );

    if (!produitListeFavori) {
      let produit = await ListeFavori.create(req.body);
      produit = await produit.populate("idJeuxVideo");
      return res.status(400).json(produit);
    }

    await produitListeFavori.save();
    res.status(200).json(produitListeFavori);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get (Récupérer la liste des jeux favoris de l'utilisateur connecté)
exports.getListeFavori = async (req, res) => {
  try {
    let listeFavori = await ListeFavori.find()
      .where("idUser", req.payload.id)
      .populate("idJeuxVideo");
    res.status(200).json(listeFavori);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Delete (supprimer un élement de la liste)
exports.deleteFavori = async (req, res) => {
  try {
    let listeFavori = await ListeFavori.findById(req.params.id);
    if (!listeFavori) {
      return res.status(404).json("Le jeu n'existe pas ou plus");
    }
    if (listeFavori.idUser != req.payload.id) {
      return res
        .status(401)
        .json("Vous n'avez pas l'autorisation de faire cela.");
    }
    await listeFavori.remove();
    res.status(200).json(listeFavori);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
