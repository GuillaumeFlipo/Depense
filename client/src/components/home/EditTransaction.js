import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  deleteTransaction,
  editTransaction,
  getTransactions,
} from "../../actions/transaction.action";
import { UidContext } from "../AppContext";

const EditTransaction = ({ transaction, moisNum, year }) => {
  const [editBoll, setEditBool] = useState(false);
  const [nom, setNom] = useState(transaction.nom);
  const [somme, setSomme] = useState(transaction.somme);
  const [comment, setComment] = useState(transaction.comment);
  const [date, setDate] = useState(transaction.dateString);
  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const handleDelete = (id) => {
    let bol = window.confirm(`Voulez vous vraiment supprimer cette dépense ?`);
    if (bol) {
      dispatch(deleteTransaction(id));
    }
  };

  useEffect(() => {
    setNom(transaction.nom);
    setDate(transaction.dateString);
    setSomme(transaction.somme);
    setComment(transaction.comment);
  }, [transaction]);

  const handleEdit = async (e) => {
    e.preventDefault();
    let somme_ = somme.toString();
    let result_somme = somme_.replace(",", ".");
    let date2 = date.toString();
    let result_date = date2.slice(0, 2);
    setDate(result_date);

    const data = {
      nom: nom,
      somme: parseFloat(result_somme),
      comment: comment,
      dateString: result_date,
      id: transaction.id,
    };

    await dispatch(editTransaction(data));
    dispatch(getTransactions(uid));
    setEditBool(false);
    // window.location = "/";
  };

  return (
    <div className="categorie_element_i">
      <div className="edit-delete">
        {transaction.id != undefined && (
          <React.Fragment>
            <FontAwesomeIcon
              className="pointer"
              icon={faTrashCan}
              onClick={() => handleDelete(transaction.id)}
            />

            <FontAwesomeIcon
              icon={faEdit}
              onClick={() => setEditBool(!editBoll)}
              className="pointer"
            />
          </React.Fragment>
        )}
      </div>
      {editBoll ? (
        <form className="edit_form" onSubmit={(e) => handleEdit(e)}>
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
            <input type="submit" value="Modifier" className="pointer submit" />
          </div>
        </form>
      ) : (
        <React.Fragment>
          <p>
            {transaction.dateString}/{moisNum + 1}/{year}
          </p>
          <p>{transaction.nom}</p>
          <p>{transaction.somme} €</p>
          <p>{transaction.comment}</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default EditTransaction;
