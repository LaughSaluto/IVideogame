const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// POST (Inscription d'un utilisateur)
exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    let { email, pseudo } = req.body;

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.EmailPassword,
      },
    });

    var mailOptions = {
      from: "laughanchenevot@gmail.com",
      to: `${email}`,
      subject: `Merci de vous êtes inscrit sur le site`,
      html: `<b>Merci de vous inscrit sur notre site</b>
      <h3>Information</h3>
      <p>Email: ${email}</p>
      <p>Pseudo: ${pseudo}</p>`,
    };

    transport.sendMail(mailOptions, function (info) {
      console.log("Email sent: " + info.response);
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// POST (Connexion d'un utilisateur)
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne().where("email", email);

    if (!user) {
      return res.status(400).json("L'adresse n'existe pas.");
    }

    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json("mot de passe incorrect");
    }

    const token = jwt.sign(
      { id: user._id, age: user.age },
      process.env.PRIVATE_KEY /* {
      expiresIn: "1h",
    }*/
    );
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

//  PUT (Modifier le profile de l'utilisateur)
exports.updateUserNonAdmin = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);

    user.pseudo = req.body.pseudo;
    user.email = req.body.email;
    user.age = req.body.age;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET (Récupère les informations de l'utilisateur)
exports.info = async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// GET (Récupère tous les utilisateurs du site)
exports.getUser = async (req, res) => {
  try {
    let user = await User.find();

    if (req.payload.role !== "admin") {
      res.status(401).json("Vous n'avais pas le bon role");
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Delete (Supprimer un utilisateur)
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("Le user n'existe pas");
    }

    if (req.payload.role !== "admin") {
      res.status(401).json("Vous n'avais pas le bon role");
    }

    await user.remove();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// PUT (Mise à jour d'un par id)
exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json("Le user n'existe pas");
    }

    if (req.payload.role !== "admin") {
      res.status(401).json("Vous n'aviez pas le bon rôle.");
    }

    if (req.file) {
      await fs.unlink(jeuxvideo.image);
      jeuxvideo.image = `uploads/${req.file.filename}`;
    }

    user.pseudo = req.body.pseudo;
    user.email = req.body.email;

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
