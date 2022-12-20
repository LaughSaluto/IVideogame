import React from "react";
import axios from "axios";
import MessageError from "../../components/MessageError";

export default function ListeUser({
  listeUser,
  setListeUser,
  pseudo,
  setPseudo,
  email,
  setEmail,
  idUser,
  setIdUser,
  isActiveUser,
  setisActiveUser,
  error,
  seterror,
  search,
}) {
  const deleteClient = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };
    axios
      .delete(`/api/user/deleteUser/${id}`, config)
      .then((res) => {
        setListeUser(listeUser.filter((user) => user._id !== id));
        setisActiveUser(!isActiveUser);
      })
      .catch((err) => console.log(err.response));
  };

  const updateUser = (user) => {
    setPseudo(user.pseudo);
    setEmail(user.email);
    setIdUser(user._id);
    setisActiveUser(!isActiveUser);
  };

  // Mettre à jours une user
  const updateUnUser = () => {
    seterror(false);

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      },
    };

    const User = {
      pseudo,
      email,
    };

    axios
      .put(`/api/user/updateUser/${idUser}`, User, config)
      .then((res) => {
        const tmp = listeUser.filter((user) => user._id !== idUser);
        setListeUser([res.data, ...tmp]);
        setPseudo("");
        setEmail("");
        setIdUser("");
      })
      .catch((err) => {
        seterror(true);
        console.log(err);
      });
  };

  const affichageClient = listeUser
    .filter((val) => {
      return val.pseudo.toLowerCase().includes(search.toLowerCase());
    })
    .map((user) => (
      <>
        <tr key={user._id}>
          <td>{user.pseudo}</td>
          <td>{user.email}</td>
          <td>
            <button className="button is-link" onClick={() => updateUser(user)}>
              Modifier
            </button>
          </td>
          <td>
            <button
              className="button is-danger"
              onClick={() => deleteClient(user._id)}
            >
              Supprimer
            </button>
          </td>
        </tr>

        <div className={`modal ${isActiveUser ? "is-active" : ""}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Modification du Client</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => {
                  setisActiveUser(!isActiveUser);
                }}
              ></button>
            </header>
            <section className="modal-card-body">
              <label className="label">Pseudo</label>
              <input
                required
                className="input"
                type="text"
                placeholder="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
              <label className="label">Email</label>
              <input
                required
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && <MessageError />}
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={updateUnUser}>
                Confirme les modifications
              </button>
              <button
                className="button is-danger"
                onClick={() => {
                  setisActiveUser(!isActiveUser);
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
    <div className="table-container">
      <table className=" table is-striped is-hoverable">
        <thead>
          <tr>
            <th>
              <abbr>Pseudo</abbr>
            </th>
            <th>
              <abbr>Email</abbr>
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
              <abbr>Pseudo</abbr>
            </th>
            <th>
              <abbr>Email</abbr>
            </th>
            <th>
              <abbr>Modifier</abbr>
            </th>
            <th>
              <abbr>Supprimer</abbr>
            </th>
          </tr>
        </tfoot>
        <tbody>{affichageClient}</tbody>
      </table>
    </div>
  );
}
