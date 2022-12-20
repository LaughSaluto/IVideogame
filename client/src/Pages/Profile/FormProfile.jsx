import axios from "axios";
import React from "react";
import MessageError from "../../components/MessageError";

export default function FormProfile({
  pseudo,
  setpseudo,
  email,
  setemail,
  error,
  seterror,
}) {
  const updateClient = () => {
    seterror(false);

    const Profile = { pseudo, email };

    const refreshPage = () => {
      window.location.reload();
    };

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };
    axios
      .put("/api/user/updateUserNonAdmin", Profile, config)
      .then((res) => {
        setpseudo("");
        setemail("");
        refreshPage();
      })
      .catch((err) => {
        seterror(true);
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <label className="label">Pseudo</label>
        <input
          class="input"
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setpseudo(e.target.value)}
        />

        <label className="label">Email</label>
        <input
          class="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          setemail
        />

        {error && <MessageError />}

        <br />
        <br />
        <button className="button is-info" onClick={updateClient}>
          Modifier mon profil
        </button>
      </div>
    </>
  );
}
