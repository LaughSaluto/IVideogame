import React, { useState } from "react";
import InfoProfile from "./InfoProfile";
import FormProfile from "./FormProfile";
import ListeFavori from "./ListeFavori";
import ListeCommentaire from "./ListeCommentaire";
import Search from "./Search";

export default function Profile() {
  const [user, setuser] = useState([]);
  const [listeFavori, setListeFavori] = useState([]);
  const [pseudo, setpseudo] = useState("");
  const [email, setemail] = useState("");
  const [listeCommentaire, setListeCommentaire] = useState([]);
  const [évaluation, setÉvaluation] = useState("");
  const [note, setNote] = useState("");
  const [idCommentaire, setIdCommentaire] = useState("");

  const [isActiveCommentaire, setIsActiveCommentaire] = useState(false);

  const [search, setSearch] = useState("");

  const [error, seterror] = useState(false);

  return (
    <>
      <div className="container is-max-desktop">
        <div className="columns is-align-items-center">
          <div className="column">
            <br />
            <div className="box">
              <InfoProfile
                user={user}
                setuser={setuser}
                setpseudo={setpseudo}
                setemail={setemail}
              />
            </div>
          </div>
          <div className="column">
            <br />
            <div className="box">
              <FormProfile
                pseudo={pseudo}
                setpseudo={setpseudo}
                email={email}
                setemail={setemail}
                error={error}
                seterror={seterror}
              />
            </div>
          </div>
          <div className="column">
            <div className="box">
              <p className="subtitle">Barre de recherche</p>
              <Search setSearch={setSearch} />
            </div>
          </div>
        </div>
        <ListeFavori
          listeFavori={listeFavori}
          setListeFavori={setListeFavori}
          search={search}
        />
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
          search={search}
          seterror={seterror}
        />
      </div>
    </>
  );
}
