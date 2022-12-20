import React, { useEffect, useState } from "react";
import ListeUser from "./ListeUser";
import ListeJeux from "./ListeJeux";
import ListeCommentaire from "./ListeCommentaire";
import Search from "./Search";
import AddGame from "./AddGame";
import axios from "axios";

export default function PageGestion() {
  const [listeUser, setListeUser] = useState([]);
  const [listjeuxVideo, setlistjeuxVideo] = useState([]);
  const [listeCommentaire, setListeCommentaire] = useState([]);
  const [titre, setTitre] = useState("");
  const [plateforme, setPlateforme] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState("");
  const [metascore, setMetascore] = useState("");
  const [description, setDescription] = useState("");
  const [linkTrailer, setLinkTrailer] = useState("");
  const [editeurs, setEditeurs] = useState("");
  const [pegiImage, setPegiImage] = useState("");
  const [dateDeSortie, setDateDeSortie] = useState("");
  const [idJeuxVideo, setIdJeuxVideo] = useState("");

  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [idUser, setIdUser] = useState("");

  const [évaluation, setÉvaluation] = useState("");
  const [note, setNote] = useState("");
  const [idCommentaire, setIdCommentaire] = useState("");

  const [isActiveJeux, setisActiveJeux] = useState(false);
  const [isActiveUser, setisActiveUser] = useState(false);
  const [isActiveAddGame, setisActiveAddGame] = useState(false);
  const [isActiveCommentaire, setIsActiveCommentaire] = useState(false);

  const [search, setSearch] = useState("");

  const [error, seterror] = useState(false);

  useEffect(() => {
    axios
      .get("/api/jeuxVideo/getAllGame")
      .then((res) => setlistjeuxVideo(res.data))
      .catch((err) => console.log(err.console));
  }, []);

  useEffect(() => {
    axios
      .get("/api/Commentaire/getAllCommentaire")
      .then((res) => setListeCommentaire(res.data))
      .catch((err) => console.log(err.console));
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
    axios
      .get("/api/user/getUser", config)
      .then((res) => setListeUser(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  return (
    <div className="container is-max-desktop">
      <br />
      <div className="columns ">
        <div className="column">
          <div className="box">
            <p className="title">Création de jeu</p>
            <AddGame
              listjeuxVideo={listjeuxVideo}
              setlistjeuxVideo={setlistjeuxVideo}
              titre={titre}
              setTitre={setTitre}
              plateforme={plateforme}
              setPlateforme={setPlateforme}
              genre={genre}
              setGenre={setGenre}
              file={file}
              setFile={setFile}
              metascore={metascore}
              setMetascore={setMetascore}
              description={description}
              setDescription={setDescription}
              linkTrailer={linkTrailer}
              setLinkTrailer={setLinkTrailer}
              editeurs={editeurs}
              setEditeurs={setEditeurs}
              pegiImage={pegiImage}
              setPegiImage={setPegiImage}
              dateDeSortie={dateDeSortie}
              setDateDeSortie={setDateDeSortie}
              idJeuxVideo={idJeuxVideo}
              setIdJeuxVideo={setIdJeuxVideo}
              isActiveAddGame={isActiveAddGame}
              setisActiveAddGame={setisActiveAddGame}
              error={error}
              seterror={seterror}
              search={search}
            />
          </div>
        </div>
        <div className="column">
          <div className="box">
            <p className="title">Barre de recherche</p>

            <Search setSearch={setSearch} />
          </div>
        </div>
      </div>
      <p className="title">User</p>

      <ListeUser
        listeUser={listeUser}
        setListeUser={setListeUser}
        pseudo={pseudo}
        setPseudo={setPseudo}
        email={email}
        setEmail={setEmail}
        idUser={idUser}
        setIdUser={setIdUser}
        isActiveUser={isActiveUser}
        setisActiveUser={setisActiveUser}
        error={error}
        seterror={seterror}
        search={search}
      />
      <br />
      <p className="title">Jeux</p>

      <ListeJeux
        listjeuxVideo={listjeuxVideo}
        setlistjeuxVideo={setlistjeuxVideo}
        titre={titre}
        setTitre={setTitre}
        plateforme={plateforme}
        setPlateforme={setPlateforme}
        genre={genre}
        setGenre={setGenre}
        file={file}
        setFile={setFile}
        metascore={metascore}
        setMetascore={setMetascore}
        description={description}
        setDescription={setDescription}
        linkTrailer={linkTrailer}
        setLinkTrailer={setLinkTrailer}
        editeurs={editeurs}
        setEditeurs={setEditeurs}
        pegiImage={pegiImage}
        setPegiImage={setPegiImage}
        dateDeSortie={dateDeSortie}
        setDateDeSortie={setDateDeSortie}
        idJeuxVideo={idJeuxVideo}
        setIdJeuxVideo={setIdJeuxVideo}
        isActiveJeux={isActiveJeux}
        setisActiveJeux={setisActiveJeux}
        error={error}
        seterror={seterror}
        search={search}
      />
      <p className="title">Commentaire</p>
      <ListeCommentaire
        listeCommentaire={listeCommentaire}
        setListeCommentaire={setListeCommentaire}
        évaluation={évaluation}
        setÉvaluation={setÉvaluation}
        note={note}
        setNote={setNote}
        idCommentaire={idCommentaire}
        setIdCommentaire={setIdCommentaire}
        isActiveCommentaire={isActiveCommentaire}
        setIsActiveCommentaire={setIsActiveCommentaire}
        error={error}
        seterror={seterror}
        search={search}
      />
    </div>
  );
}
