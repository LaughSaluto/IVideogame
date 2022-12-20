import axios from "axios";
import React, { useEffect } from "react";

export default function InfoProfile({ user, setuser, setpseudo, setemail }) {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      },
    };

    axios
      .get("/api/user/info", config)
      .then((res) => setuser(res.data))
      .catch((err) => console.log(err.console));
  }, []);

  // Mettre à jours le formulaire
  const updateUser = (user) => {
    setpseudo(user.pseudo);
    setemail(user.email);
  };

  const profileAffiche = (
    <div key={user._id}>
      <p>Votre Pseudo : {user.pseudo}</p>
      <p>Votre Email : {user.email} </p>
      <br />
      <button className="button is-info" onClick={() => updateUser(user)}>
        Modifier
      </button>
    </div>
  );
  return <div>{profileAffiche}</div>;
}
