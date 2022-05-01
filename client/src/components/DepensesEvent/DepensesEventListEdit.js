import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import {
  deleteDepenseEvent,
  editDepenseEvent,
  getDepenseEvents,
} from "../../actions/depensesEvent.action";
import { UidContext } from "../AppContext";
import { isEmpty } from "../../fonction_js/Utils";

const DepensesEventListEdit = ({ depenseEvent }) => {
  const [editBoll, setEditBool] = useState(false);
  const [nom, setNom] = useState(depenseEvent.nom);

  const [comment, setComment] = useState(depenseEvent.comment);
  const [dateDebut, setDateDebut] = useState(depenseEvent.dateDebut);
  const [dateFin, setDateFin] = useState(depenseEvent.dateFin);
  const [sommeTotal, setSommeTotal] = useState(0);
  const [transactionDataEvent, setTransactionDataEvent] = useState();
  const transactionData = useSelector((state) => state.transactionReducer);
  //   const [otherUserName, setOtherUserName] = useState("");

  const dispatch = useDispatch();
  const [uid, setUid] = useContext(UidContext);

  const handleDelete = (id) => {
    let bol = window.confirm(`Voulez vous vraiment supprimer cet évènement ?`);
    if (bol) {
      dispatch(deleteDepenseEvent(id));
    }
  };

  useEffect(() => {
    if (!isEmpty(transactionDataEvent)) {
      let somme_array = [];
      let sommeTot = 0;
      //   console.log(categories.length);

      for (let i = 0; i < transactionDataEvent.length; i++) {
        if (transactionDataEvent[i].DepensesEventId == depenseEvent.id) {
          sommeTot += transactionDataEvent[i].somme;
        }
      }

      setSommeTotal(sommeTot.toFixed(2));
    }
  }, [transactionDataEvent]);

  useEffect(() => {
    if (!isEmpty(transactionData)) {
      let transactionArray = transactionData.filter(
        (val) => val.DepensesEventId == depenseEvent.id
      );
      setTransactionDataEvent(transactionArray);
    }
  }, [transactionData]);

  const handleEdit = async (e) => {
    e.preventDefault();

    let date_a = new Date(dateDebut);
    let date_b = new Date(dateDebut);

    const data = {
      nom: nom,
      comment: comment,
      dateDebut: dateDebut,
      dateFin: dateFin,
      id: depenseEvent.id,
    };

    await dispatch(editDepenseEvent(data));
    dispatch(getDepenseEvents(uid));
    setEditBool(false);
  };

  useEffect(() => {
    let dateActuel = new Date(Date.now());
    setDateFin(dateActuel.toJSON().split("T")[0]);
    setDateDebut(dateActuel.toJSON().split("T")[0]);
  }, []);

  const elementShow = () => {
    return (
      <React.Fragment>
        <p>{depenseEvent.nom}</p>
        <p>{dateDebut}</p>
        <p>{dateFin}</p>
        <p>{depenseEvent.comment}</p>
        <p>{sommeTotal} €</p>
      </React.Fragment>
    );
    // }
  };

  return (
    <React.Fragment>
      <div className="edit-delete">
        {depenseEvent.id != undefined && (
          <FontAwesomeIcon
            className="pointer"
            icon={faTrashCan}
            onClick={() => handleDelete(depenseEvent.id)}
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
          <input
            type="text"
            name="nom"
            className="input"
            placeholder="*nom.."
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />

          <input
            type="date"
            name="dateDebut"
            className="input"
            placeholder="*dateDebut.."
            value={dateDebut}
            min="2022-01-01"
            max="2023-12-31"
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />

          <input
            type="date"
            name="dateFin"
            className="input"
            placeholder="*dateFin.."
            value={dateFin}
            min="2022-01-01"
            max="2023-12-31"
            onChange={(e) => setDateFin(e.target.value)}
            required
          />

          <input
            type="text"
            name="comment"
            className="input"
            placeholder="*comment.."
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

export default DepensesEventListEdit;
