import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../AuthContext";
import MessageError from "../../components/MessageError";

export default function Connection() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const { setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    seterror(false);
    const user = { email, password };
    axios
      .post("/api/Admin/login", user)
      .then((res) => {
        localStorage.setItem("admin", res.data);
        setToken(res.data);
        navigate("/PageGestion");
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post("/api/user/login", user)
      .then((res) => {
        localStorage.setItem("user", res.data);
        setToken(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        seterror(true);
      });
  };

  return (
    <>
      <br />
      <div className="container is-max-desktop">
        <div className="content has-text-centered">
          <h1>Login</h1>
          <form className="box" onSubmit={handleSubmit}>
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
              required
              onChange={(e) => setpassword(e.target.value)}
            />
            <br />
            {error && <MessageError />}
            <br />
            <button className="button is-primary">Se connecter</button>
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
      <br />
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
