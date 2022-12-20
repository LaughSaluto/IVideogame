import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Connection from "./Pages/Connection/Connection";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Profile from "./Pages/Profile/Profile";
import Inscription from "./Pages/Inscription/Inscription";
import PageGestion from "./Pages/Admin/PageGestion";
import ProfileJeux from "./Pages/ProfileJeux/ProfileJeux";
import AuthContext from "./AuthContext";
import "bulma/css/bulma.min.css";

function App() {
  const initTokenUser = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : "";
  const initTokenAdmin = localStorage.getItem("admin")
    ? localStorage.getItem("admin")
    : "";
  const [token, setToken] = useState(initTokenUser || initTokenAdmin);
  return (
    <>
      <div className="has-background-white-bis">
        <AuthContext.Provider value={{ token, setToken }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Contact-moi" element={<Contact />} />
            <Route path="/Connection" element={<Connection />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/PageGestion" element={<PageGestion />} />
            <Route path="/ProfileJeux/:id" element={<ProfileJeux />} />
          </Routes>
          <Footer />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
