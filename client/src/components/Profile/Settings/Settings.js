import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../fonction_js/Utils";

const Settings = () => {
  const userData = useSelector((state) => state.userReducer);
  const [AncientPassword, setAncientPassword] = useState("");
  const [NouveauPassword_1, setNouveauPassword_1] = useState("");
  const [NouveauPassword_2, setNouveauPassword_2] = useState("");
  const [message, setMessage] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    console.log("test1");

    const data = {
      password: AncientPassword,
    };
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}user/auth/check/${userData.id}`,
      withCredentials: true,
      data: data,
    })
      .then((value) => {
        if (value.data.message === "success") {
          console.log("test2");

          if (NouveauPassword_1.length > 7) {
            if (NouveauPassword_1 === NouveauPassword_2) {
              console.log("test3");

              let data2 = { password: NouveauPassword_1 };
              axios({
                method: "put",
                url: `${process.env.REACT_APP_API_URL}user/auth/update/${userData.id}`,
                withCredentials: true,
                data: data2,
              })
                .then((val) => {
                  console.log(val);
                  setMessage("Mot de passe modifié");
                  setAncientPassword("");
                  setNouveauPassword_1("");
                  setNouveauPassword_2("");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setMessage("Les deux mots de passe ne corespondent pas");
              setAncientPassword("");
              setNouveauPassword_1("");
              setNouveauPassword_2("");
            }
          } else {
            console.log("test4");
            setMessage("Le nouveau mot de passe doit dépasser 8 caractères");
          }
        } else {
          setMessage("L'ancien mot de passe est erroné");
          setAncientPassword("");
          setNouveauPassword_1("");
          setNouveauPassword_2("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (message != "") {
      let p = document
        .querySelector(".Profile_container")
        .querySelector(".message");

      if (message === "Mot de passe modifié") {
        p.style.color = "green";
      } else {
        p.style.color = "red";
      }
    }
  }, [message]);

  return (
    <div className="Profile_container">
      {!isEmpty(userData) && (
        <div className="gestion_donne">
          <h2>Changer son mot de passe</h2>
          {message != "" && <p className="message">{message}</p>}

          <form onSubmit={(e) => handleForm(e)}>
            <label>Ancien mot de passe :</label>
            <input
              type="password"
              value={AncientPassword}
              name="Ancien_password"
              onChange={(e) => setAncientPassword(e.target.value)}
            />
            <label>Nouveau mot de passe :</label>
            <input
              type="password"
              name="Nouveau_password_1"
              value={NouveauPassword_1}
              onChange={(e) => setNouveauPassword_1(e.target.value)}
            />
            <label>Répéter le nouveau mot de passe :</label>
            <input
              type="password"
              name="Nouveau_password_2"
              value={NouveauPassword_2}
              onChange={(e) => setNouveauPassword_2(e.target.value)}
            />
            <input
              className="submit"
              type="submit"
              value="Changer le mot de passe"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Settings;
