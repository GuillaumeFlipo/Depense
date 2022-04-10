import React, { useEffect, useState } from "react";
import page_ from "../fonction_js/page_info";

import Login from "./Login";
import Registration from "./Registration";

const LoginRegister = ({ path }) => {
  const [register, setRegister] = useState(false);

  useEffect(() => {
    let p = document.querySelector(".choice_container").querySelectorAll("p");
    // let p_ = document.querySelector(".choice_container");
    // p_.style.zIndex == "10";
    // console.log("p_", p[0]);
    if (register) {
      p[0].style.backgroundColor = "white";
      p[0].style.zIndex = "0";

      p[1].style.backgroundColor = "rgb(241, 240, 239)";
      p[1].style.zIndex = "10";
    } else {
      p[1].style.backgroundColor = "white";
      p[1].style.zIndex = "0";
      p[0].style.zIndex = "10";
      p[0].style.backgroundColor = "rgb(241, 240, 239)";
    }
  }, [register]);

  return (
    <React.Fragment>
      <div className="connexion_container">
        <div className="choice_container">
          <p
            className="pointer"
            onClick={() => setRegister(false)}
            onMouseOver={() => setRegister(false)}
          >
            Se connecter
          </p>
          <p
            className="pointer"
            onClick={() => setRegister(true)}
            onMouseOver={() => setRegister(true)}
          >
            S'inscricre
          </p>
        </div>
        <div className="connexion">
          {register ? (
            <Registration setRegister={setRegister} />
          ) : (
            <Login path={path} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginRegister;
