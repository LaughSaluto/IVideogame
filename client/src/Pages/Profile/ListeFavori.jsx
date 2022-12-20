import axios from "axios";
import React, { useEffect } from "react";

export default function ListeFavori({ listeFavori, setListeFavori, search }) {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };
    axios
      .get("/api/ListeFavori/getListeFavori", config)
      .then((res) => setListeFavori(res.data))
      .catch((err) => console.log(err.response));
  }, []);

  const deleteFavori = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };

    axios
      .delete(`/api/ListeFavori/deleteFavori/${id}`, config)
      .then((res) => {
        setListeFavori(listeFavori.filter((JeuxVideo) => JeuxVideo._id !== id));
      })
      .catch((err) => console.log(err.response));
  };

  const afficheFavori = listeFavori
    .filter((val) => {
      return val.idJeuxVideo.titre.toLowerCase().includes(search.toLowerCase());
    })
    .map((JeuxVideo) => (
      <tr key={JeuxVideo._id}>
        <td>{JeuxVideo.idJeuxVideo.titre}</td>
        <td>{JeuxVideo.idJeuxVideo.plateforme}</td>
        <td>{JeuxVideo.idJeuxVideo.genre}</td>
        <td>{JeuxVideo.idJeuxVideo.editeurs}</td>

        <td>
          <img src={JeuxVideo.idJeuxVideo.image} alt="" />
        </td>
        <td>{JeuxVideo.idJeuxVideo.metascore}</td>
        <td>{JeuxVideo.idJeuxVideo.description}</td>
        <td>
          <button
            className="button is-danger"
            onClick={() => deleteFavori(JeuxVideo._id)}
          >
            Supprimer
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <p className="title">Liste favori</p>
      <div className="table-container">
        <table className=" table is-striped is-hoverable">
          <thead>
            <tr>
              <th>
                <abbr>Titre</abbr>
              </th>
              <th>
                <abbr>plateforme</abbr>
              </th>
              <th>
                <abbr>Éditeurs</abbr>
              </th>
              <th>
                <abbr>Éditeurs</abbr>
              </th>
              <th>
                <abbr>Image</abbr>
              </th>
              <th>
                <abbr>Metascore</abbr>
              </th>
              <th>
                <abbr>Description</abbr>
              </th>
              <th>
                <abbr>Supprimer</abbr>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>
                <abbr>Titre</abbr>
              </th>
              <th>
                <abbr>plateforme</abbr>
              </th>
              <th>
                <abbr>Éditeurs</abbr>
              </th>
              <th>
                <abbr>Éditeurs</abbr>
              </th>
              <th>
                <abbr>Image</abbr>
              </th>
              <th>
                <abbr>Metascore</abbr>
              </th>
              <th>
                <abbr>Description</abbr>
              </th>
              <th>
                <abbr>Supprimer</abbr>
              </th>
            </tr>
          </tfoot>
          <tbody>{afficheFavori}</tbody>
        </table>
      </div>
    </>
  );
}
