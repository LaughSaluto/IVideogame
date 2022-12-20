import axios from "axios";
import React from "react";
import Icon from "@mdi/react";
import { mdiEmail, mdiCellphone, mdiAccount, mdiAccountOutline } from "@mdi/js";

export default function FormContact({
  prenom,
  setprenom,
  nom,
  setnom,
  email,
  setemail,
  tel,
  settel,
  message,
  setmessage,
}) {
  let Prenom = document.getElementById("Prenom");
  let Nom = document.getElementById("Nom");
  let Email = document.getElementById("Email");
  let Tel = document.getElementById("Tel");
  let Message = document.getElementById("Message");

  const createEmail = (e) => {
    let formData = {
      Prenom: Prenom.value,
      Nom: Nom.value,
      Email: Email.value,
      Tel: Tel.value,
      Message: Message.value,
    };
    console.log(formData);
    axios
      .post("/api/email/contactEmail", formData)
      .then((res) => {
        setprenom("");
        setnom("");
        setemail("");
        settel("");
        setmessage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <form className="box" onSubmit={createEmail}>
          <div className="field">
            <label className="label">Prénom *</label>
            <p class="control has-icons-left">
              <input
                className="input"
                id="Prenom"
                value={prenom}
                onChange={(e) => setprenom(e.target.value)}
                type="text"
                placeholder="Prénom"
                required
              />
              <span class="icon is-small is-left">
                <Icon path={mdiAccount} />
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Nom *</label>
            <p class="control has-icons-left">
              <input
                className="input"
                id="Nom"
                value={nom}
                onChange={(e) => setnom(e.target.value)}
                type="text"
                placeholder="Nom"
                required
              />
              <span class="icon is-small is-left">
                <Icon path={mdiAccountOutline} />
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Email *</label>
            <p class="control has-icons-left">
              <input
                className="input"
                id="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                type="email"
                placeholder="Email"
                required
              />
              <span class="icon is-small is-left">
                <Icon path={mdiEmail} />
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label"> Téléphone</label>
            <p class="control has-icons-left">
              <input
                className="input"
                id="Tel"
                value={tel}
                onChange={(e) => settel(e.target.value)}
                type="tel"
                pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
                placeholder="Téléphone"
              />
              <span class="icon is-small is-left">
                <Icon path={mdiCellphone} />
              </span>
            </p>
          </div>
          <div className="field">
            <label className="label">Message *</label>
            <textarea
              className="textarea"
              id="Message"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
              placeholder="Votre Message"
              required
            />
          </div>

          <label class="checkbox">
            <input type="checkbox" required />
            Je ne suis pas un bot
          </label>
          <br />
          <button className="button is-link">Envoyer</button>
        </form>
        <br />
      </div>
    </>
  );
}
