import React from "react";
import { useState } from "react";
import FormContact from "./FormContact";

export default function Contact() {
  const [prenom, setprenom] = useState("");
  const [nom, setnom] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState("");
  const [message, setmessage] = useState("");

  return (
    <>
      <br />
      <div className="container">
        <div className="content has-text-centered ">
          <h1 className="box">Contactez-moi.</h1>
        </div>
      </div>
      <FormContact
        prenom={prenom}
        setprenom={setprenom}
        nom={nom}
        setnom={setnom}
        email={email}
        setemail={setemail}
        tel={tel}
        settel={settel}
        message={message}
        setmessage={setmessage}
      />
    </>
  );
}
