import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../../actions/transaction.action";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import EditTransaction from "./EditTransaction";

const Categorie = ({ cat, year, month, transactionData, moisNum, jourNum }) => {
  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const [nom, setNom] = useState("");
  const [somme, setSomme] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(jourNum);
  const [sommeTotal, setSommeTotal] = useState(0);

  // const transactionData = useSelector((state) => state.transactionReducer);

  const handleForm = (e) => {
    e.preventDefault();
    let somme_ = somme.toString();
    let result_somme = somme_.replace(",", ".");
    let date_ = new Date(Date.now());
    let date2 = date.toString();
    let result_date = date2.slice(0, 2);

    const data = {
      categorie: cat,
      month: month,
      year: year,
      nom: nom,
      somme: parseFloat(result_somme),
      comment: comment,
      UserId: uid,
      date: date_,
      dateString: result_date,
    };

    dispatch(addTransaction(data));
    // window.location = "/";
    setComment("");
    setNom("");
    setSomme("");
    // calculSommeFunction();
  };

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
          transactionData[i].UserId == uid
        ) {
          somme_ = transactionData[i].somme + somme_;
        }
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

  return (
    <div className="categorie_element">
      <div className="head">
        <h2>{cat}</h2>
        <p className="somme">{sommeTotal} €</p>
      </div>
      <div className="list_depense">
        {!isEmpty(transactionData) &&
          uid != null &&
          transactionData
            .filter(
              (val) =>
                val.categorie == cat &&
                val.month == month &&
                val.year == year &&
                val.UserId == uid
            )
            .sort(
              (a, b) =>
                integerFunction(a.dateString) - integerFunction(b.dateString)
            )
            .map((transaction, key) => (
              <EditTransaction
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

export default Categorie;
