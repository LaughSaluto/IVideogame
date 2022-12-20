import React from "react";
import axios from "axios";
import MessageError from "../../components/MessageError";

export default function AddCommentaire({
  Commentaire,
  setCommentaire,
  note,
  setNote,
  évaluation,
  setÉvaluation,
  isActiveAddCommentaire,
  setIsActiveAddCommentaire,
  idJeuxVideo,
  setIdJeuxVideo,
  error,
  seterror,
}) {
  const refreshPage = () => {
    window.location.reload();
  };

  const addComm = () => {
    seterror(false);

    let form = {
      idJeuxVideo,
      évaluation,
      note,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };
    axios
      .post("/api/Commentaire/addCommentaire", form, config)
      .then((res) => {
        setCommentaire((Commentaire) => [res.data, ...Commentaire]);
        setNote("");
        setÉvaluation("");
        setIsActiveAddCommentaire(!isActiveAddCommentaire);
        refreshPage();
      })
      .catch((err) => {
        seterror(true);
        console.log(err.response);
      });
  };

  return (
    <>
      <a
        className="card-footer-item"
        onClick={() => {
          setIsActiveAddCommentaire(!isActiveAddCommentaire);
        }}
      >
        Mettre un commentaire
      </a>
      <div className={`modal ${isActiveAddCommentaire ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Création d'un jeu</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setIsActiveAddCommentaire(!isActiveAddCommentaire);
              }}
            ></button>
          </header>
          <section className="modal-card-body">
            <input
              disabled
              required
              className="input"
              type="hidden"
              placeholder="Jeux"
              value={idJeuxVideo}
            />

            <label className="label">évaluation</label>
            <input
              required
              className="input"
              type="text"
              placeholder="évaluation"
              value={évaluation}
              onChange={(e) => setÉvaluation(e.target.value)}
            />

            <label className="label">note</label>
            <input
              required
              className="input"
              type="number"
              min="0"
              max="10"
              placeholder="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <p className="help">Valeur entre 0 et 10</p>

            {error && <MessageError />}
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={addComm}>
              Confirme la Création
            </button>
            <button
              className="button is-danger"
              onClick={() => {
                setIsActiveAddCommentaire(!isActiveAddCommentaire);
              }}
            >
              Annule
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
