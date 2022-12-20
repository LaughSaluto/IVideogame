import React from "react";

export default function ({ setsearchTitre, setsearchMetascore }) {
  const handleSearchTitre = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setsearchTitre(value);
  };

  const setSearchMetascore = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setsearchMetascore(value);
  };

  return (
    <>
      <input
        className="input"
        type="text"
        id="searchBar"
        placeholder="titre"
        name="searchBar"
        onChange={handleSearchTitre}
      />

      <input
        className="input"
        type="number"
        min="0"
        max="100"
        id="searchBar"
        placeholder="metascore 0-100"
        name="searchBar"
        onChange={setSearchMetascore}
      />
    </>
  );
}
