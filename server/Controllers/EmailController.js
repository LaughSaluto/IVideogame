const nodemailer = require("nodemailer");
require("dotenv").config();

exports.createEmail = async (req, res) => {
  try {
    let { Prenom, Nom, Email, Tel, Message } = req.body;

    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.EmailPassword,
      },
    });

    var mailOptions = {
      from: process.env.Email,
      to: process.env.EmailEnv,
      subject: `Message de ${Email}`,
      html: `<h3>Information</h3>
        <ul>
        <il>Prenom: ${Prenom}</il>   
        <br/>
        <il>Nom: ${Nom}</il>
        <br/>
        <il>Tel: ${Tel}</il>
        <br/>
        <il>Email: ${Email} </il>
        </ul>
        
        <h3>Message</h3>
        <p> ${Message} </p>
        `,
    };

    transport.sendMail(mailOptions, function (info) {
      console.log("Email sent: " + info.response);
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
