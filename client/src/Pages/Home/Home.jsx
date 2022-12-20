import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import Jeux from "./Jeux";
import Filtre from "./Filtre";

export default function Home() {
  const [listjeuxVideo, setlistjeuxVideo] = useState([]);
  const [searchTitre, setsearchTitre] = useState("");
  const [searchMetascore, setsearchMetascore] = useState("");
  const [filterbygender, setfilterbygender] = useState("");
  const [filterbyplatform, setfilterbyplatform] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [isActiveNotificationFavori, setIsActiveNotificationFavori] =
    useState(false);

  useEffect(() => {
    axios
      .get("/api/jeuxVideo/getAllGame")
      .then((res) => setlistjeuxVideo(res.data))
      .catch((err) => console.log(err.console));
  }, []);

  return (
    <>
      <div className="container is-max-desktop">
        <br />
        <div className="box">
          <div className="columns ">
            <div className="column">
              <Search
                setsearchTitre={setsearchTitre}
                setsearchMetascore={setsearchMetascore}
              />
            </div>
            <div className="column">
              <Filtre
                setfilterbygender={setfilterbygender}
                setfilterbyplatform={setfilterbyplatform}
              />
            </div>
          </div>
        </div>
        <Jeux
          listjeuxVideo={listjeuxVideo}
          searchTitre={searchTitre}
          searchMetascore={searchMetascore}
          filterbygender={filterbygender}
          filterbyplatform={filterbyplatform}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          isActiveNotificationFavori={isActiveNotificationFavori}
          setIsActiveNotificationFavori={setIsActiveNotificationFavori}
        />
      </div>
    </>
  );
}
