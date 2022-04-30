import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  deleteTransactionRec,
  editTransactionRec,
  getTransactionRecs,
} from "../../../actions/transactionRec.action";
import { UidContext } from "../../AppContext";
import {
  monthNumberToString,
  monthStringToNumber,
  weekStringToNumber,
} from "../../../fonction_js/Utils";

const TransactionRecEdit = ({ transaction }) => {
  const [editBoll, setEditBool] = useState(false);
  const [nom, setNom] = useState(transaction.nom);
  const [somme, setSomme] = useState(transaction.somme);
  const [comment, setComment] = useState(transaction.comment);
  const [date, setDate] = useState(transaction.date);
  const [categorie, setCategorie] = useState(transaction.categorie);
  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const handleDelete = (id) => {
    let bol = window.confirm(
      `Voulez vous vraiment supprimer cette dépense récurrente ?`
    );
    if (bol) {
      dispatch(deleteTransactionRec(id));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    let somme_ = somme.toString();
    let result_somme = somme_.replace(",", ".");
    let date2 = date.toString();

    setDate(date2);

    const data = {
      nom: nom,
      somme: parseFloat(result_somme),
      comment: comment,
      categorie: categorie,
      date: date2,
      id: transaction.id,
    };

    await dispatch(editTransactionRec(data));
    dispatch(getTransactionRecs(uid));
    setEditBool(false);
  };

  const elementShow = () => {
    let date_ = new Date(transaction.createdAt);
    let date2 = date_.toLocaleDateString();
    let dateList = date2.toString().split("/");
    return (
      <React.Fragment>
        <p>
          {transaction.reccurence} <br />
          {date} <br /> {date2}
        </p>
        <p>{transaction.nom}</p>
        <p>{transaction.somme} €</p>
        <p>{transaction.categorie}</p>
        <p>{transaction.comment}</p>
      </React.Fragment>
    );
    // }
  };

  return (
    <React.Fragment>
      <div className="edit-delete">
        {transaction.id != undefined && (
          <FontAwesomeIcon
            className="pointer"
            icon={faTrashCan}
            onClick={() => handleDelete(transaction.id)}
          />
        )}

        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setEditBool(!editBoll)}
          className="pointer"
        />
      </div>
      {editBoll ? (
        <form className="edit_form" onSubmit={(e) => handleEdit(e)}>
          {/* <input
            type="text"
            name="date"
            placeholder="*date.."
            value={date}
            className="input"
            onChange={(e) => setDate(e.target.value)}
          /> */}
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
        <React.Fragment>{elementShow()}</React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TransactionRecEdit;
