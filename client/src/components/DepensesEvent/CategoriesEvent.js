import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  addTransactionEvent,
  deleteTransaction,
  getTransactions,
} from "../../actions/transaction.action";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import EditTransactionEvent from "./EditTransactionEvent";
import {
  addTransactionEvent_event,
  getTransactionsEvent,
} from "../../actions/transactionEvent.action";

const CategorieEvent = ({
  cat,
  year,
  month,
  transactionData,
  moisNum,
  jourNum,
  list, // id de la dépense évent
  utilisateurs,
}) => {
  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const [nom, setNom] = useState("");
  const [somme, setSomme] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(jourNum);
  const [sommeTotal, setSommeTotal] = useState(0);
  const [qui, setQui] = useState("");
  const [quiAPaye, setQuiAPaye] = useState("");

  const userData = useSelector((state) => state.userReducer);
  // const transactionData = useSelector((state) => state.transactionReducer);

  const handleForm = async (e) => {
    e.preventDefault();
    let somme_ = somme.toString();
    let result_somme = somme_.replace(",", ".");
    let date_ = new Date(Date.now());
    let date2 = date.toString();
    let result_date = date2.slice(0, 2);

    if (qui === "Nous deux") {
      for (let user of utilisateurs) {
        const data = {
          categorie: cat,
          month: month,
          year: year,
          nom: nom,
          somme: parseFloat(result_somme) / 2,
          comment: comment,
          UserId: user[0].id,
          date: date_,
          dateString: result_date,
          DepensesEventId: list,
          quiPaye: qui,
          quiAPaye: quiAPaye,
        };
        await dispatch(addTransactionEvent_event(data));
      }
      dispatch(getTransactionsEvent(list));
    } else {
      const user = utilisateurs.filter((val) => val[0].nom == qui);

      const data = {
        categorie: cat,
        month: month,
        year: year,
        nom: nom,
        somme: parseFloat(result_somme),
        comment: comment,
        UserId: user[0][0].id,
        date: date_,
        dateString: result_date,
        DepensesEventId: list,
        quiPaye: qui,
        quiAPaye: quiAPaye,
      };
      await dispatch(addTransactionEvent_event(data));
      dispatch(getTransactionsEvent(list));
    }
    setNom("");
    setSomme("");
    setComment("");
  };

  useEffect(() => {
    setQui(userData.nom);
    setQuiAPaye(userData.nom);
  }, [userData]);

  const handleDelete = (id) => {
    let bol = window.confirm(`Voulez vous vraiment supprimer cette dépense ?`);
    if (bol) {
      dispatch(deleteTransaction(id));
    }
  };

  useEffect(() => {
    if (!isEmpty(transactionData)) {
      let somme_ = 0;
      for (let i = 0; i < transactionData.length; i++) {
        if (
          transactionData[i].categorie == cat &&
          transactionData[i].month == month &&
          transactionData[i].year == year &&
          transactionData[i].DepensesEventId == list &&
          transactionData[i].quiPaye != "Nous deux"
        ) {
          somme_ = transactionData[i].somme + somme_;
        }
        if (
          transactionData[i].categorie == cat &&
          transactionData[i].month == month &&
          transactionData[i].year == year &&
          transactionData[i].DepensesEventId == list &&
          transactionData[i].quiPaye == "Nous deux"
        ) {
          somme_ = transactionData[i].somme * 2 + somme_;
        }
        // if (
        //   transactionData[i].categorie == cat &&
        //   transactionData[i].month == month &&
        //   transactionData[i].year == year &&
        //   transactionData[i].quiPaye != "Nous deux"
        // ) {
        //   somme_ = transactionData[i].somme * 2 + somme_;
        // }
      }

      if (somme_ != 0) {
        setSommeTotal(somme_.toFixed(2));
      } else {
        setSommeTotal(somme_);
      }
    }
  }, [transactionData, uid, month, year]);

  const integerFunction = (x) => {
    let val = parseInt(x);
    return val;
  };

  //   useEffect(() => {
  //     console.log(utilisateurs, "utilisateurs");
  //   }, [utilisateurs]);

  return (
    <div className="categorie_element">
      <div className="head">
        <h2>{cat}</h2>
        <p className="somme">{sommeTotal} €</p>
        <div className="tab_valeur">
          <p>Date :</p>
          <p>Nom :</p>
          <p>Somme :</p>
          <p>Qui paye :</p>
          <p>Qui a payé :</p>
          <p>Comment :</p>
        </div>
      </div>
      <div className="list_depense">
        {!isEmpty(transactionData) &&
          uid != null &&
          transactionData
            .filter(
              (val) =>
                (val.categorie == cat &&
                  val.month == month &&
                  val.year == year &&
                  val.UserId == uid) ||
                (val.categorie == cat &&
                  val.month == month &&
                  val.year == year &&
                  val.quiPaye != "Nous deux")
            )
            .sort(
              (a, b) =>
                integerFunction(a.dateString) - integerFunction(b.dateString)
            )
            .map((transaction, key) => (
              <EditTransactionEvent
                transaction={transaction}
                key={key}
                moisNum={moisNum}
                year={year}
              />
            ))}
      </div>
      {uid != null && (
        <form onSubmit={(e) => handleForm(e)}>
          <div className="plus_container">
            <FontAwesomeIcon icon={faPlusCircle} />
          </div>
          <input
            type="text"
            name="date"
            placeholder="*date.."
            value={date}
            className="input"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            type="text"
            name="nom"
            placeholder="*nom.."
            value={nom}
            className="input"
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="text"
            name="somme"
            className="input"
            placeholder="*somme.."
            value={somme}
            onChange={(e) => setSomme(e.target.value)}
            required
          />
          <select value={qui} onChange={(e) => setQui(e.target.value)}>
            {utilisateurs.length == 2 && (
              <option value={"Nous deux"}>Nous deux</option>
            )}
            {utilisateurs.map((val, key) => (
              <option key={key} val={val[0].nom}>
                {val[0].nom}
              </option>
            ))}
          </select>
          <select
            value={quiAPaye}
            onChange={(e) => setQuiAPaye(e.target.value)}
          >
            {utilisateurs.map((val, key) => (
              <option key={key} val={val[0].nom}>
                {val[0].nom}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="comment"
            className="input"
            placeholder="comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="submit_container">
            <input type="submit" value="Ajouter" className="pointer submit" />
          </div>
        </form>
      )}
    </div>
  );
};

export default CategorieEvent;
