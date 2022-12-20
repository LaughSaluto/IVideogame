import axios from "axios";
import React, { useEffect } from "react";
import MessageError from "../../components/MessageError";

export default function ListeCommentaire({
  listeCommentaire,
  setListeCommentaire,
  évaluation,
  setÉvaluation,
  note,
  setNote,
  idCommentaire,
  setIdCommentaire,
  error,
  seterror,
  isActiveCommentaire,
  setIsActiveCommentaire,
  search,
}) {
  const NewDate = (a) => {
    let date = a.slice(8, 10);
    let month = a.slice(5, 7);
    let year = a.slice(0, 4);
    let result = date + "/" + month + "/" + year;
    return result;
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const deleteCommentaire = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
    axios
      .delete(`/api/Commentaire/deleteCommentaire/${id}`, config)
      .then((res) => {
        setListeCommentaire(
          listeCommentaire.filter((Commentaire) => Commentaire._id !== id)
        );
      })
      .catch((err) => console.log(err.response));
  };

  const preUpdateGame = (Commentaire) => {
    setÉvaluation(Commentaire.évaluation);
    setNote(Commentaire.note);
    setIdCommentaire(Commentaire._id);
    setIsActiveCommentaire(!isActiveCommentaire);
  };

  const updateCommentaire = () => {
    seterror(false);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };

    let formData = { note, évaluation };

    axios
      .put(
        `/api/Commentaire/updateCommentaire/${idCommentaire}`,
        formData,
        config
      )
      .then((res) => {
        const tmp = listeCommentaire.filter(
          (Commentaire) => Commentaire._id !== idCommentaire
        );
        setListeCommentaire([res.data, ...tmp]);
        setÉvaluation("");
        setNote("");
        setIsActiveCommentaire(!isActiveCommentaire);
        refreshPage();
      })
      .catch((err) => {
        seterror(true);
        console.log(err);
      });
  };

  const affichageCommentaire = listeCommentaire
    .filter((val) => {
      return val.évaluation.toLowerCase().includes(search.toLowerCase());
    })
    .map((Commentaire) => (
      <>
        <tr key={Commentaire._id}>
          <td>{Commentaire.évaluation}</td>
          <td>{Commentaire.note}/10</td>
          <td>{Commentaire.idUser.pseudo}</td>
          <td>{NewDate(Commentaire.createdAt)}</td>
          <td>{NewDate(Commentaire.updatedAt)}</td>
          <td>
            <button
              className="button is-link"
              onClick={() => preUpdateGame(Commentaire)}
            >
              Modifier
            </button>
          </td>
          <td>
            <button
              className="button is-danger"
              onClick={() => deleteCommentaire(Commentaire._id)}
            >
              Supprimer
            </button>
          </td>
        </tr>

        <div className={`modal ${isActiveCommentaire ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modification de jeux Vidéo</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  setIsActiveCommentaire(!isActiveCommentaire);
                }}
              ></button>
            </header>
            <section className="modal-card-body">
              <label className="label">Note</label>
              <input
                required
                className="input"
                type="number"
                max={10}
                min={0}
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <p className="help">Valeur entre 0 et 10</p>

              <label className="label">Évaluation</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Évaluation"
                value={évaluation}
                onChange={(e) => setÉvaluation(e.target.value)}
              />
              {error && <MessageError />}
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={updateCommentaire}>
                Confirme les modifications
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  setIsActiveCommentaire(!isActiveCommentaire);
                }}
              >
                Annule
              </button>
            </footer>
          </div>
        </div>
      </>
    ));

  return (
    <>
      <div className="table-container">
        <table className=" table is-striped is-hoverable">
          <thead>
            <tr>
              <th>
                <abbr>Évaluation</abbr>
              </th>
              <th>
                <abbr>Note</abbr>
              </th>
              <th>
                <abbr>Créateur</abbr>
              </th>
              <th>
                <abbr>Date de Création</abbr>
              </th>
              <th>
                <abbr>Date de Modification</abbr>
              </th>
              <th>
                <abbr>Modifier</abbr>
              </th>
              <th>
                <abbr>Supprimer</abbr>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>
                <abbr>Évaluation</abbr>
              </th>
              <th>
                <abbr>Note</abbr>
              </th>
              <th>
                <abbr>Créateur</abbr>
              </th>
              <th>
                <abbr>Date de Création</abbr>
              </th>
              <th>
                <abbr>Date de Modification</abbr>
              </th>
              <th>
                <abbr>Modifier</abbr>
              </th>
              <th>
                <abbr>Supprimer</abbr>
              </th>
            </tr>
          </tfoot>
          <tbody>{affichageCommentaire}</tbody>
        </table>
      </div>
    </>
  );
}
