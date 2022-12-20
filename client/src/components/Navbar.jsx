import React, { useContext, useState } from "react";
import AuthContext from "../AuthContext";
import GameCude from "../gifs/GameCude.gif";

export default function Navbar() {
  const [isActive, setisActive] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    setToken("");
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setToken("");
  };

  function logout() {
    logoutUser();
    logoutAdmin();
  }

  return (
    <>
      <nav
        className="navbar is-white"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="/" className="navbar-item">
            <img src={GameCude} alt="Gif GameCude" width="60" />
          </a>

          <a
            onClick={() => {
              setisActive(!isActive);
            }}
            role="button"
            className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={`navbar-menu ${isActive ? "is-active" : ""}`}
        >
          <div className="navbar-end ">
            <div className="navbar-item">
              {token === "" ? (
                <>
                  <a href="/Connection" className="navbar-item">
                    Connexion
                  </a>
                  <a href="/inscription" className="navbar-item">
                    Inscription
                  </a>
                </>
              ) : (
                <>
                  <a href="/Profile" className="navbar-item">
                    Mon profil
                  </a>
                  <a href="/" onClick={logout} className="navbar-item">
                    Déconnexion
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
