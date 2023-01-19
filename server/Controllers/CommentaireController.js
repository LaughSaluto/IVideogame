const Commentaire = require("../models/Commentaire");
const JeuxVideo = require("../models/JeuxVideo");

//Post (ajouter un commentaire a un jeu sur le nom de l'utilisateur connecté)
exports.addCommentaire = async (req, res) => {
  try {
    req.body.idUser = req.payload.id;
    let jeuxVideo = await JeuxVideo.findById(req.body.idJeuxVideo);

    let commentaire = await Commentaire.find()
      .where("idUser", req.payload.id)
      .populate("idJeuxVideo");

    const commentaireListe = commentaire.find(
      (jeuxVideo) => jeuxVideo.idJeuxVideo._id == req.params.idJeuxVideo
    );

    if (!commentaireListe) {
      let produit = await Commentaire.create(req.body);
      produit = await produit.populate("idJeuxVideo");
      return res.status(201).json(produit);
    }
    await commentaireListe.save();
    res.status(201).json(commentaireListe);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Get (Récupérer la liste des commentaires de l'utilisateur connecté)
exports.getCommentaire = async (req, res) => {
  try {
    let commentaire = await Commentaire.find()
      .where("idUser", req.payload.id)
      .populate("idJeuxVideo");
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

// Get (Affiche tous les commentaires)
exports.getAllCommentaire = async (req, res) => {
  try {
    let commentaire = await Commentaire.find()
      .populate("idUser")
      .populate("idJeuxVideo");
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//Get (Récupérer la liste commentaires du jeu en id )
exports.getCommentairebyIDgame = async (req, res) => {
  try {
    let commentaire = await Commentaire.find()
      .where("idJeuxVideo", req.params.id)
      .populate("idUser");

    if (!commentaire) {
      return res.status(404).json("Le commentaire n'existe pas.");
    }
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

// Put (Mise à jour d'un commentaire par id)
exports.updateCommentaire = async (req, res) => {
  try {
    let commentaire = await Commentaire.findById(req.params.id);

    if (!commentaire) {
      return res.status(404).json("Le commentaire n'existe pas.");
    }

    if (commentaire.idUser != req.payload.id) {
      if (req.payload.role !== "admin") {
        return res
          .status(401)
          .json("Vous n'avez pas l'autorisation de faire cela.");
      }
    }

    commentaire.note = req.body.note;
    commentaire.évaluation = req.body.évaluation;
    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Delete (supprimer un commentaire de la liste)
exports.deleteCommentaire = async (req, res) => {
  try {
    let commentaire = await Commentaire.findById(req.params.id);
    if (!commentaire) {
      return res.status(404).json("Le jeu n'existe pas ou plus");
    }

    if (commentaire.idUser != req.payload.id) {
      if (req.payload.role !== "admin") {
        return res
          .status(401)
          .json("Vous n'avez pas l'autorisation de faire cela.");
      }
    }

    await commentaire.remove();
    res.status(200).json(commentaire);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
