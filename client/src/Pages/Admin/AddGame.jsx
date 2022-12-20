import axios from "axios";
import React from "react";
import MessageError from "../../components/MessageError";

export default function AddGame({
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
  metascore,
  setMetascore,
  description,
  setDescription,
  linkTrailer,
  setLinkTrailer,
  editeurs,
  setEditeurs,
  pegiImage,
  setPegiImage,
  dateDeSortie,
  setDateDeSortie,
  isActiveAddGame,
  setisActiveAddGame,
  error,
  seterror,
}) {
  const refreshPage = () => {
    window.location.reload();
  };

  const addVideoGame = () => {
    seterror(false);

    if (metascore > 100 && metascore < 0) {
      return seterror(true);
    }

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

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
    axios
      .post("/api/jeuxVideo/addGame", formData, config)
      .then((res) => {
        setlistjeuxVideo((listjeuxVideo) => [res.data, ...listjeuxVideo]);
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
        setisActiveAddGame(!isActiveAddGame);
        refreshPage();
      })
      .catch((err) => {
        seterror(true);
        console.log(err.response);
      });
  };

  return (
    <>
      <button
        className="button is-primary"
        onClick={() => {
          setisActiveAddGame(!isActiveAddGame);
        }}
      >
        Crée un jeu
      </button>
      <div className={`modal ${isActiveAddGame ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Création d'un jeu</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => {
                setisActiveAddGame(!isActiveAddGame);
                refreshPage();
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
                  Choisir un Plateforme
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
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option selected value="">
                  Choisir un genre
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
            <p className="help">Mettre une image du jeu</p>

            <label className="label">Metascore</label>
            <input
              required
              className="input"
              type="number"
              min="0"
              max="100"
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
                <option value="Activision/Blizzard">Activision/Blizzard</option>
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
                  le jeu est considéré comme adapté à toutes les classes d’âge .
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
            <button className="button is-success" onClick={addVideoGame}>
              Confirme la Création
            </button>
            <button
              className="button is-danger"
              onClick={() => {
                setisActiveAddGame(!isActiveAddGame);
                refreshPage();
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
