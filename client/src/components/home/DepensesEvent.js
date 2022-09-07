import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDepenseEvent,
  getDepenseEvents,
} from "../../actions/depensesEvent.action";
import { getUsers } from "../../actions/users.action";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";

const DepensesEvent = () => {
  const [uid, setUid] = useContext(UidContext);
  const dispatch = useDispatch();

  const [toggleBool, setToggleBool] = useState(false);
  const [boolAxiosUsers, setBoolAxiosUsers] = useState(false);
  const [dateDebut, setDateDebut] = useState(1);
  const [dateFin, setDateFin] = useState(1);
  const [nom, setNom] = useState("");
  const [comment, setComment] = useState("");
  const [otherUserName, setOtherUserName] = useState("");

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const handleForm = async (e) => {
    e.preventDefault();

    if (otherUserName !== "") {
      let userOther = usersData.filter((val) => val.nom == otherUserName);

      let data = {
        nom: nom,
        comment: comment,
        dateDebut: dateDebut,
        dateFin: dateFin,
        UserId: `${userOther[0].id}/${uid}`,
      };

      await dispatch(addDepenseEvent(data));
    } else {
      let data = {
        nom: nom,
        comment: comment,
        dateDebut: dateDebut,
        dateFin: dateFin,
        UserId: `${uid}`,
      };
      await dispatch(addDepenseEvent(data));
    }
    dispatch(getDepenseEvents(uid));

    setToggleBool(false);
    setNom("");
    setComment("");
    setOtherUserName("");
  };

  useEffect(() => {
    let dateActuel = new Date(Date.now());
    setDateFin(dateActuel.toJSON().split("T")[0]);
    setDateDebut(dateActuel.toJSON().split("T")[0]);
    if (toggleBool && !boolAxiosUsers) {
      dispatch(getUsers());
      setBoolAxiosUsers(true);
    }
    // if (toggleBool && !boolAxiosUsers && userData.superUtilisateur === "true") {
    //   dispatch(getUsers());
    //   setBoolAxiosUsers(true);
    // }
  }, [toggleBool]);

  return (
    <div className="depensesEvent_container">
      {!toggleBool ? (
        <div
          className="depensesEvent_false"
          onClick={() => setToggleBool(true)}
        >
          <h2 className="submit">
            <FontAwesomeIcon icon={faPlus} />
            Ajouter un évènement (voyage, soirée ...)
          </h2>
        </div>
      ) : (
        <div className="depensesEvent_true">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => setToggleBool(false)}
          />
          <form onSubmit={(e) => handleForm(e)}>
            <h2>Ajouter un évènement (voyage, soirée ...) :</h2>
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
            <label>Date début :</label>
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
            <label>Date fin :</label>
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
            <label>Ajouter un utilisateur : </label>
            <select
              value={otherUserName}
              onChange={(e) => setOtherUserName(e.target.value)}
            >
              <option value={""}>---</option>
              {!isEmpty(usersData) &&
                usersData.map((val, key) => (
                  <option value={val.nom} key={key}>
                    {val.nom}
                  </option>
                ))}
            </select>
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

export default DepensesEvent;
