import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../../actions/transaction.action";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import deleteSVG from "./../../assets/delete.svg";
import plus from "./../../assets/plus-solid.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const Categorie = ({ cat, year, month, transactionData }) => {
  let date_ = new Date(Date.now());

  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const [nom, setNom] = useState("");
  const [somme, setSomme] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(date_.toLocaleDateString());
  const [sommeTotal, setSommeTotal] = useState(0);

  // const transactionData = useSelector((state) => state.transactionReducer);

  const handleForm = async (e) => {
    e.preventDefault();

    let date_ = new Date(date);

    const data = {
      categorie: cat,
      month: month,
      year: year,
      nom: nom,
      somme: somme,
      comment: comment,
      UserId: uid,
      date: date_,
      dateString: date,
    };

    dispatch(addTransaction(data));
    // await dispatch(getTransactions());
    setComment("");
    setNom("");
    setSomme("");
  };

  const handleDelete = (id) => {
    let bol = window.confirm(`Voulez vous vraiment supprimer cette dépense ?`);
    if (bol) {
      dispatch(deleteTransaction(id));
    }
  };

  useEffect(() => {
    if (!isEmpty(transactionData)) {
      let somme = 0;
      for (let i = 0; i < transactionData.length; i++) {
        if (
          transactionData[i].categorie == cat &&
          transactionData[i].month == month &&
          transactionData[i].year == year &&
          transactionData[i].UserId == uid
        ) {
          somme += transactionData[i].somme;
        }
      }
      setSommeTotal(somme);
    }
  }, [transactionData, uid, month, year]);

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
            .sort((a, b) => b.date - a.date)
            .map((transaction, key) => (
              <div className="categorie_element_i" key={key}>
                <div className="edit-delete">
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    onClick={() => handleDelete(transaction.id)}
                  />
                </div>
                <p>{transaction.dateString}</p>
                <p>{transaction.nom}</p>
                <p>{transaction.somme} €</p>
                <p>{transaction.comment}</p>
              </div>
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
          />
          <input
            type="text"
            name="nom"
            placeholder="*nom.."
            value={nom}
            className="input"
            onChange={(e) => setNom(e.target.value)}
          />
          <input
            type="text"
            name="somme"
            className="input"
            placeholder="*somme.."
            value={somme}
            onChange={(e) => setSomme(e.target.value)}
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
