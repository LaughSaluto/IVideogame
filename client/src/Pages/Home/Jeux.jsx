import React from "react";
import axios from "axios";
import NotificationFavori from "../../components/NotificationFavori";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../css/Pagination.css";

export default function Jeux({
  listjeuxVideo,
  searchTitre,
  searchMetascore,
  filterbygender,
  filterbyplatform,
  pageNumber,
  setPageNumber,
  isActiveNotificationFavori,
  setIsActiveNotificationFavori,
}) {
  const navigate = useNavigate();
  const JeuxPerPage = 3;
  const pagesVisited = pageNumber * JeuxPerPage;

  const addFavori = (id) => {
    setIsActiveNotificationFavori(false);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };
    let jeu = { idJeuxVideo: id };
    axios
      .post("/api/ListeFavori/addFavori", jeu, config)
      .then(() => setIsActiveNotificationFavori(true))
      .catch((err) => {
        console.log(err.reponse);
      });
  };

  const affichageListe = listjeuxVideo
    .filter((val) => {
      return val.titre.toLowerCase().includes(searchTitre.toLowerCase());
    })
    .filter((val) => {
      return val.metascore
        .toLowerCase()
        .includes(searchMetascore.toLowerCase());
    })
    .filter((val) => {
      return val.genre.toLowerCase().includes(filterbygender.toLowerCase());
    })
    .filter((val) => {
      return val.plateforme
        .toLowerCase()
        .includes(filterbyplatform.toLowerCase());
    })
    .slice(pagesVisited, pagesVisited + JeuxPerPage)
    .map((jeuxVideo) => (
      <>
        <div className="card">
          <div key={jeuxVideo._id}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img src={jeuxVideo.image} alt={jeuxVideo.titre} />
                  </figure>
                </div>
                <div className="media-content">
                  <a onClick={() => navigate(`/ProfileJeux/${jeuxVideo._id}`)}>
                    <p className="title is-4"> {jeuxVideo.titre}</p>
                    <p className="subtitle is-6">{jeuxVideo.plateforme}</p>
                    <p className="subtitle is-6">{jeuxVideo.genre}</p>
                    <p className="subtitle is-6">
                      {jeuxVideo.metascore}/100 sur Metacritic
                    </p>
                  </a>
                </div>
              </div>

              <div className="content">
                <p>{jeuxVideo.description}</p>
                <br />
              </div>
            </div>
            <footer className="card-footer">
              <a
                href={jeuxVideo.linkTrailer}
                className="card-footer-item"
                rel="noreferrer"
                target="_blank"
              >
                Bande d'annonce
              </a>
              <a
                className="card-footer-item"
                onClick={() => addFavori(jeuxVideo._id)}
              >
                Ajouter au Favori
              </a>
            </footer>
          </div>
        </div>
        <br />
      </>
    ));

  const pageCount = Math.ceil(listjeuxVideo.length / JeuxPerPage);

  const setPage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <p className="title is-4"> {affichageListe.length} Jeux trouvés.</p>
      {isActiveNotificationFavori && (
        <NotificationFavori
          isActiveNotificationFavori={isActiveNotificationFavori}
          setIsActiveNotificationFavori={setIsActiveNotificationFavori}
        />
      )}
      {affichageListe}
      <ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant "}
        pageCount={pageCount}
        onPageChange={setPage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      <br />
    </div>
  );
}
