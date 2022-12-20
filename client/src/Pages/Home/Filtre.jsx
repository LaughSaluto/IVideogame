import React from "react";

export default function Filtre({ setfilterbygender, setfilterbyplatform }) {
  const refreshPage = () => {
    window.location.reload();
  };
  const FiltreGenre = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setfilterbygender(value);
  };
  const FiltrePlateforme = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setfilterbyplatform(value);
  };
  return (
    <>
      <div className="select">
        <select onChange={FiltreGenre}>
          <option selected value="">
            Genre
          </option>
          <option value="FPS/TPS">FPS/TPS</option>
          <option value="Combat">Combat</option>
          <option value="RTS">RTS</option>
          <option value="Simulation">Simulation</option>
          <option value="Plateforme">Plateforme</option>
          <option value="RPG">RPG</option>
          <option value="MMORPG">MMORPG</option>
          <option value="Sandbox">Sandbox</option>
          <option value="MOBA">MOBA</option>
          <option value="Battle Royale">Battle Royale</option>
          <option value="Action/Aventure">Action/Aventure</option>
          <option value="Beat Them All">Beat Them All</option>
          <option value="Puzzlers">Puzzlers</option>
          <option value="Réflexion">Réflexion</option>
          <option value="Survival Horror">Survival Horror</option>
          <option value="Rogue Like">Rogue Like</option>
          <option value="Hack’n’slash">Hack’n’slash</option>
          <option value="Party games">Party games</option>
          <option value="Rythme">Rythme</option>
          <option value="Sport">Sport</option>
          <option value="Course">Course</option>
        </select>
      </div>

      <div className="select">
        <select onChange={FiltrePlateforme}>
          <option defaultValue="">Plateforme</option>
          <option value="PS4">PlayStation 5</option>
          <option value="PC">PC</option>
          <option value="XBOX-Serie S/X">XBOX-Serie S/X</option>
          <option value="Switch">Switch</option>
          <option value="Multi-Plateforme">Multi-plateforme</option>
        </select>
      </div>
      <button
        className="button is-link"
        onClick={() => {
          refreshPage();
        }}
      >
        Réinitialiser
      </button>
    </>
  );
}
