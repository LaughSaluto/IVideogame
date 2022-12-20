import axios from "axios";
import React, { useEffect } from "react";

export default function AfficheCommentaire({
  Commentaire,
  setCommentaire,
  Jeu,
}) {
  const NewDate = (a) => {
    let date = a.slice(8, 10);
    let month = a.slice(5, 7);
    let year = a.slice(0, 4);
    let result = date + "/" + month + "/" + year;
    return result;
  };

  useEffect(() => {
    axios
      .get(`/api/Commentaire/getCommentairebyIDgame/${Jeu._id}`)
      .then((res) => {
        setCommentaire(res.data);
      })
      .catch((err) => console.log(err.response));
  }, [Jeu._id]);

  const affichecommentaire = Commentaire.map((commentaire) => (
    <>
      <div key={commentaire._id}>
        <div class="box">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{commentaire.idUser.pseudo}</strong>{" "}
                  {commentaire.note}/10
                  <br />
                  {commentaire.évaluation}
                </p>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <p>Fait le {NewDate(commentaire.createdAt)}</p>
                  <p> &nbsp; Modifier le {NewDate(commentaire.updatedAt)}</p>
                </div>
              </nav>
            </div>
          </article>
        </div>
      </div>
      <br />
    </>
  ));
  return <div>{affichecommentaire}</div>;
}
