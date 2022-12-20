import React from "react";

export default function ({ setSearch }) {
  const handleSearch = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    setSearch(value);
  };

  return (
    <>
      <input
        className="input"
        type="text"
        id="searchBar"
        placeholder="Recherche"
        name="searchBar"
        onChange={handleSearch}
      />
    </>
  );
}
