import React from "react";
import axios from "axios";
import MessageError from "../../components/MessageError";

export default function ListeJeux({
  listjeuxVideo,
  setlistjeuxVideo,
  titre,
  setTitre,
  plateforme,
  setPlateforme,
  genre,
  setGenre,
  file,
  setFile,
  setMetascore,
  metascore,
  editeurs,
  setEditeurs,
  pegiImage,
  setPegiImage,
  dateDeSortie,
  setDateDeSortie,
  description,
  setDescription,
  linkTrailer,
  setLinkTrailer,
  idJeuxVideo,
  setIdJeuxVideo,
  isActiveJeux,
  setisActiveJeux,
  error,
  seterror,
  search,
}) {
  const refreshPage = () => {
    window.location.reload();
  };

  const deleteClient = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
    axios
      .delete(`/api/jeuxVideo/deleteGame/${id}`, config)
      .then((res) => {
        setlistjeuxVideo(
          listjeuxVideo.filter((jeuxVideo) => jeuxVideo._id !== id)
        );
      })
      .catch((err) => console.log(err.response));
  };

  const updateGame = (jeuxVideo) => {
    setTitre(jeuxVideo.titre);
    setPlateforme(jeuxVideo.plateforme);
    setGenre(jeuxVideo.genre);
    setMetascore(jeuxVideo.metascore);
    setDescription(jeuxVideo.description);
    setLinkTrailer(jeuxVideo.linkTrailer);
    setEditeurs(jeuxVideo.editeurs);
    setPegiImage(jeuxVideo.pegiImage);
    setDateDeSortie(jeuxVideo.dateDeSortie);
    setIdJeuxVideo(jeuxVideo._id);
    setisActiveJeux(!isActiveJeux);
  };

  // Mettre à jours une jeux
  const updateJeux = () => {
    seterror(false);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };

    let formData = new FormData();
    formData.append("titre", titre);
    formData.append("plateforme", plateforme);
    formData.append("genre", genre);
    formData.append("file", file);
    formData.append("metascore", metascore);
    formData.append("description", description);
    formData.append("linkTrailer", linkTrailer);
    formData.append("editeurs", editeurs);
    formData.append("pegiImage", pegiImage);
    formData.append("dateDeSortie", dateDeSortie);

    axios
      .put(`/api/jeuxVideo/updateGame/${idJeuxVideo}`, formData, config)
      .then((res) => {
        const tmp = listjeuxVideo.filter(
          (jeuxVideo) => jeuxVideo._id !== idJeuxVideo
        );
        setlistjeuxVideo([res.data, ...tmp]);
        setTitre("");
        setPlateforme("");
        setGenre("");
        setFile("");
        setMetascore("");
        setDescription("");
        setLinkTrailer("");
        setEditeurs("");
        setPegiImage("");
        setDateDeSortie("");
        setLinkTrailer("");
        setisActiveJeux(!isActiveJeux);
        refreshPage();
      })
      .catch((err) => {
        seterror(true);
        console.log(err);
      });
  };

  const affichageJeux = listjeuxVideo
    .filter((val) => {
      return val.titre.toLowerCase().includes(search.toLowerCase());
    })
    .map((jeuxVideo) => (
      <>
        <tr key={jeuxVideo._id}>
          <td>{jeuxVideo.titre}</td>
          <td>
            {" "}
            <img src={jeuxVideo.image} alt="image du jeu" />
          </td>
          <td>{jeuxVideo.plateforme}</td>
          <td>{jeuxVideo.genre}</td>
          <td>{jeuxVideo.metascore}%</td>
          <td>{jeuxVideo.description}</td>
          <td>
            <button
              className="button is-link"
              onClick={() => updateGame(jeuxVideo)}
            >
              Modifier
            </button>
          </td>
          <td>
            <button
              className="button is-danger"
              onClick={() => deleteClient(jeuxVideo._id)}
            >
              Supprimer
            </button>
          </td>
        </tr>

        <div className={`modal ${isActiveJeux ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modification de jeux Vidéo</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  setisActiveJeux(!isActiveJeux);
                }}
              ></button>
            </header>
            <section className="modal-card-body">
              <label className="label">Titre</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Titre"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />

              <label className="label">Plateforme</label>
              <div className="select">
                <select
                  value={plateforme}
                  onChange={(e) => setPlateforme(e.target.value)}
                >
                  <option selected value="">
                    Choisir une Plateforme
                  </option>
                  <option value="PS4">PlayStation 5</option>
                  <option value="PC">PC</option>
                  <option value="XBOX-Serie S/X">XBOX-Serie S/X</option>
                  <option value="Switch">Switch</option>
                  <option value="Multi-Plateforme">Multi-plateforme</option>
                </select>
              </div>

              <label className="label">Genre</label>

              <div className="select">
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option selected value="">
                    Choisir un Genre
                  </option>
                  <option value="FPS">FPS</option>
                <option value="TPS">TPS</option>
                  <option value="Combat">Combat</option>
                  <option value="RTS">RTS</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Plateforme">Plateforme</option>
                  <option value="RPG">RPG</option>
                  <option value="MMORPG">MMORPG</option>
                  <option value="Sandbox">Sandbox</option>
                  <option value="MOBA">MOBA</option>
                  <option value="Battle Royale">Battle Royale</option>
                  <option value="Action/Aventure">Action/Aventure</option>
                  <option value="Beat Them All">Beat Them All</option>
                  <option value="Puzzlers">Puzzlers</option>
                  <option value="Réflexion">Réflexion</option>
                  <option value="Survival Horror">Survival Horror</option>
                  <option value="Rogue Like">Rogue Like</option>
                  <option value="Hack’n’slash">Hack’n’slash</option>
                  <option value="Party games">Party games</option>
                  <option value="Rythme">Rythme</option>
                  <option value="Sport">Sport</option>
                  <option value="Course">Course</option>
                </select>
              </div>

              <label className="label">Image</label>
              <input
                required
                className="input"
                type="file"
                placeholder="Image"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <label className="label">Metascore</label>
              <input
                required
                className="input"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 100 } }}
                placeholder="Metascore"
                value={metascore}
                onChange={(e) => setMetascore(e.target.value)}
              />
              <p className="help">Valeur entre 0 et 100</p>

              <label className="label">Description</label>
              <textarea
                required
                className="textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label className="label">Lien vers le trailer</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Lien vers le trailer"
                value={linkTrailer}
                onChange={(e) => setLinkTrailer(e.target.value)}
              />

              <label className="label">Éditeur</label>
              <div className="select">
                <select
                  value={editeurs}
                  onChange={(e) => setEditeurs(e.target.value)}
                >
                  <option selected value="">
                    Choisir un Éditeur
                  </option>
                  <option value="Activision/Blizzard">
                    Activision/Blizzard
                  </option>
                  <option value="Blizzard Entertainment">
                    Blizzard Entertainment
                  </option>
                  <option value="Electronic Arts">Electronic Arts</option>
                  <option value="Take Two Interactive">
                    Take Two Interactive
                  </option>
                  <option value="Epic Games">Epic Games</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Warner Bros Interactive">
                    Warner Bros Interactive
                  </option>
                  <option value="Ubisoft">Ubisoft</option>
                  <option value="Sony Computer Entertainment">
                    Sony Computer Entertainment
                  </option>
                  <option value="CD Projekt">CD Projekt</option>
                  <option value="Embracer Group">Embracer Group</option>
                  <option value="Square Enix">Square Enix</option>
                  <option value="SEGA">SEGA</option>
                  <option value="Capcom">Capcom</option>
                  <option value="Bandai Namco">Bandai Namco</option>
                  <option value="Bethesda">Bethesda</option>
                  <option value="Nintendo">Nintendo</option>
                  <option value="Atlus">Atlus</option>
                  <option value="Konami">Konami</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              <label className="label">Pegi</label>
              <div className="select">
                <select
                  value={pegiImage}
                  onChange={(e) => setPegiImage(e.target.value)}
                >
                  <option selected value="">
                    Choisir un Pegi
                  </option>
                  <option value="https://pegi.info/sites/default/files/inline-images/age-3-black_0.jpg">
                    le jeu est considéré comme adapté à toutes les classes d’âge
                    .
                  </option>
                  <option value="https://pegi.info/sites/default/files/inline-images/age-7-black.jpg">
                    le jeu est déconseillé aux moins de 7 ans
                  </option>
                  <option value="https://pegi.info/sites/default/files/inline-images/age-12-black.jpg">
                    le jeu est déconseillé aux moins de 12 ans
                  </option>
                  <option value="https://pegi.info/sites/default/files/inline-images/age-16-black.jpg">
                    le jeu est déconseillé aux moins de 16 ans
                  </option>
                  <option value="https://pegi.info/sites/default/files/inline-images/age-18-black%202_0.jpg">
                    le jeu est destiné aux adultes.
                  </option>
                </select>
              </div>

              <label className="label">Date de sortie</label>
              <input
                required
                className="input"
                type="date"
                placeholder="Date de sortie"
                value={dateDeSortie}
                onChange={(e) => setDateDeSortie(e.target.value)}
              />

              {error && <MessageError />}
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={updateJeux}>
                Confirme les modifications
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  setisActiveJeux(!isActiveJeux);
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
                <abbr>Titre</abbr>
              </th>
              <th>
                <abbr>Image</abbr>
              </th>
              <th>
                <abbr>plateforme</abbr>
              </th>
              <th>
                <abbr>Genre</abbr>
              </th>
              <th>
                <abbr>metascore</abbr>
              </th>
              <th>
                <abbr>description</abbr>
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
                <abbr>Titre</abbr>
              </th>
              <th>
                <abbr>Image</abbr>
              </th>
              <th>
                <abbr>plateforme</abbr>
              </th>
              <th>
                <abbr>Genre</abbr>
              </th>
              <th>
                <abbr>metascore</abbr>
              </th>
              <th>
                <abbr>description</abbr>
              </th>
              <th>
                <abbr>Modifier</abbr>
              </th>
              <th>
                <abbr>Supprimer</abbr>
              </th>
            </tr>
          </tfoot>
          <tbody>{affichageJeux}</tbody>
        </table>
      </div>
    </>
  );
}
