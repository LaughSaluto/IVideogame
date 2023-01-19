const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// POST (Inscription d'un administrateur)
exports.signUp = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    let { email } = req.body;

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.EmailPassword,
      },
    });

    var mailOptions = {
      from: process.env.EmailEnv,
      to: `${email}`,
      subject: `Merci d'avoir rejoint l'équipe.`,
      html: `<b>Vos informations en tant qu'administrateur</b> 
      <h3>Information</h3>
      <p>Email: ${email}</p>`,
    };

    transport.sendMail(mailOptions, function (info) {
      console.log("Email sent: " + info.response);
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// POST (Connexion d'un administrateur)
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let admin = await Admin.findOne().where("email", email);
    let isMatch = bcrypt.compareSync(password, admin.password);

    if (!admin) {
      return res.status(404).json("L'email n'existe pas.");
    }

    if (!isMatch) {
      return res.status(400).json("mot de passe incorrect");
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.admin },
      process.env.PRIVATE_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
