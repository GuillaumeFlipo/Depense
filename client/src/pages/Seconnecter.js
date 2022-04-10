import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navigation from "../components/commun/Navigation";

import Login from "../components/SeConnecter/Login";
import Registration from "../components/SeConnecter/Registration";
import page_ from "../fonction_js/page_info";

// import Test from '../components/Test';

const Seconnecter = () => {
  const [register, setRegister] = useState(false);
  const [element, setElement] = useState({
    content: "un text",
    table: "paragraph",
    id: "1",
    nameInTable: "text",
    type: "h2",
    className: "test",
  });

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

  useEffect(() => {
    window.scrollTo(0, 0);
    if (page_.readCookie("accepterCookies") == null) {
      page_.createCookie("accepterCookies", true, 100);
    }
  }, []);

  return (
    <React.Fragment>
      {/* <SeconnecterOngoing /> */}

      <div className="connexion_container">
        <Link to="/">Menu</Link>
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
            <Login path={"/"} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Seconnecter;
