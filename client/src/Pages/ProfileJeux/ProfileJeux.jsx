import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import AfficheCommentaire from "./AfficheCommentaire";
import AddCommentaire from "./AddCommentaire";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileJeux() {
  const [Commentaire, setCommentaire] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [Jeu, setJeux] = useState("");
  const [note, setNote] = useState("");
  const [idJeuxVideo, setIdJeuxVideo] = useState(id);
  const [évaluation, setÉvaluation] = useState("");

  const [isActiveAddCommentaire, setIsActiveAddCommentaire] = useState(false);

  const [error, seterror] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/jeuxVideo/getGame/${id}`)
      .then((res) => setJeux(res.data))
      .catch((err) => console.log(err.response));
  }, [id]);

  const affichageJeux = (
    <>
      <br />
      <div className="card has-text-centered">
        <div key={Jeu._id}>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48">
                  <img src={Jeu.pegiImage} alt="Signalétique PEGI" />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-4">{Jeu.titre}</p>
                <p className="subtitle is-5">{Jeu.plateforme}</p>
                <p className="subtitle is-5">{Jeu.genre}</p>
              </div>
            </div>

            <div className="content">
              <div className="player-wrapper">
                <ReactPlayer
                  className="has-ratio"
                  url={Jeu.linkTrailer}
                  width="100%"
                  height="100%"
                  controls
                  muted
                  playing
                  loop
                />
              </div>
              <br />
              <p>Note : {Jeu.metascore}% sur metacritic</p>
              <p>Description : {Jeu.description}</p>
              <br />
              <p>
                <strong>Éditeur :</strong> {Jeu.editeurs}
              </p>
              <p>
                <strong> Date de sortie : </strong> {Jeu.dateDeSortie}
              </p>
            </div>
          </div>
          <footer className="card-footer">
            <AddCommentaire
              Commentaire={Commentaire}
              setCommentaire={setCommentaire}
              note={note}
              setNote={setNote}
              évaluation={évaluation}
              setÉvaluation={setÉvaluation}
              isActiveAddCommentaire={isActiveAddCommentaire}
              setIsActiveAddCommentaire={setIsActiveAddCommentaire}
              idJeuxVideo={idJeuxVideo}
              setIdJeuxVideo={setIdJeuxVideo}
              error={error}
              seterror={seterror}
            />
            <a className="card-footer-item" onClick={() => navigate(`/`)}>
              retour
            </a>
          </footer>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="container is-max-desktop">
        {affichageJeux}

        <AfficheCommentaire
          Commentaire={Commentaire}
          setCommentaire={setCommentaire}
          Jeu={Jeu}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
