import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransactionRec,
  getTransactionRecs,
} from "../../actions/transactionRec.action";
import { UidContext } from "../AppContext";

const PayementReccurent = ({ categories, month, year }) => {
  const [uid, setUid] = useContext(UidContext);
  const dispatch = useDispatch();

  const [toggleBool, setToggleBool] = useState(false);
  const [categorie, setCategorie] = useState("Abonnement");
  const [somme, setSomme] = useState("");
  const [reccurence, setReccurence] = useState("Mensuel");
  const [date, setDate] = useState(1);
  const [nom, setNom] = useState("");
  const [comment, setComment] = useState("");

  const userData = useSelector((state) => state.userReducer);

  const handleForm = async (e) => {
    e.preventDefault();
    let somme_ = somme.toString();
    let result_somme = somme_.replace(",", ".");

    let data = {
      nom: nom,
      somme: parseFloat(result_somme),
      categorie: categorie,
      month: month,
      year: year,
      comment: comment,
      date: 1,
      reccurence: reccurence,
      UserId: uid,
    };

    await dispatch(addTransactionRec(data));
    window.location = "/";
    setToggleBool(false);
    setComment("");
    setNom("");
    setSomme(0);
  };

  useEffect(() => {
    switch (reccurence) {
      case "Mensuel":
        return setDate(1);

      case "Hebdomadaire":
        return setDate("Lundi");
      case "Annuel":
        return setDate("Janvier");
    }
  }, [reccurence]);

  const DatePrelevement = () => {
    let DateList = [];
    switch (reccurence) {
      case "Mensuel":
        for (let i = 1; i < 29; i++) {
          DateList.push(i);
        }
        return (
          <React.Fragment>
            {DateList.map((val, key) => (
              <option value={val} key={key}>
                {val}
              </option>
            ))}
          </React.Fragment>
        );
      case "Hebdomadaire":
        DateList = [
          "Lundi",
          "Mardi",
          "Mercredi",
          "Jeudi",
          "Vendredi",
          "Samedi",
          "Dimanche",
        ];
        return (
          <React.Fragment>
            {DateList.map((val, key) => (
              <option value={val} key={key}>
                {val}
              </option>
            ))}
          </React.Fragment>
        );
      case "Annuel":
        DateList = [
          "Janvier",
          "Février",
          "Mars",
          "Avril",
          "Mai",
          "Juin",
          "Juillet",
          "Août",
          "Septembre",
          "Octobre",
          "Novembre",
          "Décembre",
        ];
        return (
          <React.Fragment>
            {DateList.map((val, key) => (
              <option value={val} key={key}>
                {val}
              </option>
            ))}
          </React.Fragment>
        );
    }
  };
  return (
    <div className="recurrent_payment_container">
      {!toggleBool ? (
        <div
          className="recurrent_payement_false"
          onClick={() => setToggleBool(true)}
        >
          <h2 className="submit">
            <FontAwesomeIcon icon={faPlus} />
            Ajouter un payement récurrent
          </h2>
        </div>
      ) : (
        <div className="recurrent_payement_true">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setToggleBool(false)}
          />
          <form onSubmit={(e) => handleForm(e)}>
            <h2>Ajouter un payement récurrent :</h2>
            <label>Nom : </label>
            <input
              type="text"
              name="nom"
              className="input"
              placeholder="*nom.."
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <label>Catégorie : </label>
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              {categories.map((val, key) => (
                <option value={val} key={key}>
                  {val}
                </option>
              ))}
            </select>
            <label>Somme : </label>
            <input
              type="text"
              name="somme"
              className="input"
              placeholder="*somme.."
              value={somme}
              onChange={(e) => setSomme(e.target.value)}
              required
            />
            <label>Récurrence du payement : </label>
            <select
              value={reccurence}
              onChange={(e) => setReccurence(e.target.value)}
            >
              <option value="Mensuel">Mensuel</option>
              {/* <option value="Annuel">Annuel</option> */}
            </select>

            {/* <label>Date du prélevement : </label>
            <select value={date} onChange={(e) => setDate(e.target.value)}>
              {DatePrelevement()}
            </select> */}
            <label>Comment : </label>
            <input
              type="text"
              name="comment"
              className="input"
              placeholder="*comment.."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <input type="submit" value="Ajouter" className="submit" />
          </form>
        </div>
      )}
    </div>
  );
};

export default PayementReccurent;
