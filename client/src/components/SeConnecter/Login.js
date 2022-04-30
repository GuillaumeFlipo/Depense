import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UidContext } from "../AppContext";

const Login = ({ path }) => {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [uid, setUid] = useContext(UidContext);

  const login = async () => {
    const data = { nom: nom, password: password };
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}user/login`,
      withCredentials: true,
      data: data,
    })
      .then((value) => {
        console.log(value.data);
        setMessage(value.data.message);
        setUid(null);
        if (value.data.message === "You Logged In") {
          window.scrollTo(0, 0);
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {/* <Navigation bol_nosfonds={false} bol_transparent={false} /> */}
      {uid ? (
        <h1 className="titre_login">Déjà connecté</h1>
      ) : (
        <div className="login_container">
          <div style={{ color: "red" }}>{message}</div>
          <label>Nom:</label>
          <input
            type="text"
            onChange={(event) => {
              setNom(event.target.value);
            }}
            name="email"
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            name="password"
          />
          <button className="pointer submit" onClick={login}>
            Se connecter
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Login;
