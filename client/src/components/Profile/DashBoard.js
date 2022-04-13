import React, { useEffect, useState } from "react";
import Donnees from "./Donnees/Donnees";
import Settings from "./Settings/Settings";

const DashBoard = () => {
  const [activeCat, setActiveCat] = useState("donnee_Cat");

  const activeCatFunction = () => {
    switch (activeCat) {
      case "settings_Cat":
        return <Settings />;
      case "donnee_Cat":
        return <Donnees />;
    }
  };

  useEffect(() => {
    let ps = document
      .querySelector(".dashBoard_container")
      .querySelector(".choixCat_menu")
      .querySelectorAll("p");
    for (let p of ps) {
      p.classList.remove("activeCat_dash");
    }

    document.getElementById(activeCat).classList.add("activeCat_dash");
  }, [activeCat]);

  return (
    <div className="dashBoard_container">
      <div className="choixCat_menu">
        <p id="donnee_Cat" onClick={() => setActiveCat("donnee_Cat")}>
          Données
        </p>
        <p id="settings_Cat" onClick={() => setActiveCat("settings_Cat")}>
          Settings
        </p>
      </div>
      <React.Fragment>{activeCatFunction()}</React.Fragment>
    </div>
  );
};

export default DashBoard;
