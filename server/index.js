require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connection vers Mongodb
require("./config/db");

const RouteUser = require("./routes/RouteUser");
const RouterJeuxVideo = require("./routes/RouterJeuxVideo");
const RouterAdmin = require("./routes/RouterAdmin");
const RouterListeFavori = require("./routes/RouterListeFavori");
const RouterCommentaire = require("./routes/RouterCommentaire");
const RouterEmail = require("./Routes/RouteEmail");

app.use("/api/user", RouteUser);
app.use("/api/jeuxVideo", RouterJeuxVideo);
app.use("/api/admin", RouterAdmin);
app.use("/api/ListeFavori", RouterListeFavori);
app.use("/api/Commentaire", RouterCommentaire);
app.use("/api/email", RouterEmail);
app.use("/uploads", express.static(__dirname + "/uploads"));

const PORT = 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
