import axios from "axios";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import cookie from "js-cookie";

const Menu = () => {
  const userData = useSelector((state) => state.userReducer);
  const [uid, setUid] = useContext(UidContext);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}user/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <nav>
      <div className="profile">
        {!isEmpty(userData) ? <p>Bonjour {userData.nom} !</p> : <p>Bonjour</p>}
      </div>
      <div className="menu_container">
        <NavLink to="/">Dépenses</NavLink>
        <NavLink to="/Profile">Profil</NavLink>
        {!isEmpty(userData) ? (
          <p
            style={{ color: "#ae952e" }}
            className="pointer"
            onClick={() => logout()}
          >
            Se déconnecter
          </p>
        ) : (
          <NavLink style={{ color: "#ae952e" }} to="/seconnecter">
            Se connecter
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Menu;
