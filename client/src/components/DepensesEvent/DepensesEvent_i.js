import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { getUsers } from "../../actions/users.action";
import {
  isEmpty,
  monthNumberToString,
  monthStringToNumber,
} from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import TableauChart from "../home/TableauChart";
import CategorieEvent from "./CategoriesEvent";
import ChartEvent from "./ChartEvent";

const DepensesEvent_i = ({ list, setList, categories }) => {
  let date = new Date(Date.now());
  const [transactionDataEvent, setTransactionDataEvent] = useState([]);
  const [depenseEventData, setDepenseEventData] = useState([]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [utilisateurs, setUtilisateurs] = useState([]);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [somme, setSomme] = useState();
  const [uid, setUid] = useContext(UidContext);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const transactionData = useSelector((state) => state.transactionReducer);
  const depensesEventData = useSelector((state) => state.depenseEventReducer);

  useEffect(() => {
    if (!isEmpty(transactionData)) {
      let transactionArray = transactionData.filter(
        (val) =>
          (val.DepensesEventId == list && val.UserId == uid) ||
          (val.DepensesEventId == list && val.quiPaye != "Nous deux")
      );
      setTransactionDataEvent(transactionArray);
    }
  }, [transactionData]);

  useEffect(() => {
    let sommeArray = [];
    if (utilisateurs.length >= 1 && transactionDataEvent.length >= 1) {
      for (let user of utilisateurs) {
        let somme_ = 0;
        let somme_total = 0;
        for (let transaction of transactionDataEvent) {
          if (
            transaction.quiAPaye == user[0].nom &&
            transaction.quiPaye != "Nous deux"
          ) {
            somme_total += transaction.somme;
          } else if (
            transaction.quiAPaye == user[0].nom &&
            transaction.quiPaye == "Nous deux"
          ) {
            somme_total += transaction.somme * 2;
          }
          if (
            transaction.quiAPaye == user[0].nom &&
            transaction.quiPaye != user[0].nom
          ) {
            somme_ += transaction.somme;
          }
        }
        sommeArray.push([
          { nom: user[0].nom, somme: somme_, sommeTotal: somme_total },
        ]);
      }
      setSomme(sommeArray);
    }
  }, [utilisateurs, transactionDataEvent]);

  useEffect(() => {
    if (!isEmpty(depensesEventData)) {
      let depensesArray = depensesEventData.filter((val) => val.id == list);
      let date_ = new Date(depensesArray[0].dateDebut);
      setMonth(monthNumberToString(date_.getMonth()));
      setYear(date_.getFullYear());
      setDepenseEventData(depensesArray[0]);
    }
  }, [depensesEventData]);

  useEffect(() => {
    if (depenseEventData.length != 0 && !isEmpty(usersData)) {
      let Array = [];

      let indexArray = depenseEventData.UserId.split("/");
      for (let i of indexArray) {
        let users = usersData.filter((val) => val.id.toString() == i);
        Array.push(users);
      }

      setUtilisateurs(Array);
    }
  }, [depenseEventData, usersData]);

  const triCountFunction = () => {
    if (somme.length > 1) {
      if (somme[0][0].somme >= somme[1][0].somme) {
        return (
          <p>
            {somme[1][0].nom} doit{" "}
            <span>{(somme[0][0].somme - somme[1][0].somme).toFixed(2)} € </span>{" "}
            à {somme[0][0].nom}
          </p>
        );
      } else {
        return (
          <p>
            {somme[0][0].nom} doit{" "}
            <span>{(somme[1][0].somme - somme[0][0].somme).toFixed(2)} € </span>{" "}
            à {somme[1][0].nom}
          </p>
        );
      }
    }
  };

  return (
    <div className="depense_i_container">
      <h2 className="retourList pointer" onClick={() => setList(true)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Retour à la liste des évènements
      </h2>
      <h2 className="Title_evenement">
        Dépenses liées à l'évènement : <span>{depenseEventData.nom}</span>
      </h2>
      <div className="total_container">
        <ChartEvent
          categories={categories}
          month={month}
          year={year}
          transactionData={transactionDataEvent}
          list={list}
        />
      </div>

      {!isEmpty(somme) && somme.length > 1 && (
        <div className="somme_container">
          {somme.map((val, key) => (
            <div key={key} className="somme_element">
              <p>{val[0].nom} à payé</p>
              <p>
                {" "}
                <span>{val[0].sommeTotal.toFixed(2)} €</span>
              </p>
            </div>
          ))}
          <div className="somme_element">
            {!isEmpty(somme) && triCountFunction()}
          </div>
        </div>
      )}
      <div className="categorie_container">
        {categories.map((cat, key) => (
          <CategorieEvent
            cat={cat}
            month={month}
            year={year}
            key={key}
            transactionData={transactionDataEvent}
            moisNum={monthStringToNumber(month)}
            jourNum={date.getDate()}
            list={list}
            utilisateurs={utilisateurs}
          />
        ))}
      </div>
    </div>
  );
};

export default DepensesEvent_i;
