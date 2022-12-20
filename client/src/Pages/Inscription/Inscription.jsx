import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MessageError from "../../components/MessageError";

export default function Inscription() {
  const [pseudo, setpseudo] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    const user = { pseudo, email, password };
    if (password === confirmPassword) {
      axios
        .post("/api/user/signUp", user)
        .then((res) => navigate("/Connection"))
        .catch((err) => {
          seterror(true);
          console.log(err.response);
        });
    } else {
      seterror(true);
    }
  };

  return (
    <>
      <br />
      <div className="container is-max-desktop">
        <div className="content has-text-centered">
          <h1>Inscription</h1>
          <form className="box" onSubmit={handleSubmit}>
            <label className="label">Pseudo</label>
            <input
              className="input"
              type="text"
              placeholder="pseudo"
              value={pseudo}
              required
              onChange={(e) => setpseudo(e.target.value)}
            />
            <br />
            <br />
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              placeholder="email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <br />
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <br />
            <br />
            <label className="label">Confirm Password</label>
            <input
              className="input"
              type="password"
              placeholder="Confirmer le password"
              value={confirmPassword}
              required
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
            <br />
            {error && <MessageError />}
            <br />
            <button className="button is-primary">S'inscrire</button>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
