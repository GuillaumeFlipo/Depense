import React from "react";

import { useState } from "react";
import RoutesComponent from "./components/RoutesComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./actions/user.action";
import axios from "axios";
import { UidContext } from "./components/AppContext";
import { addTransaction, getTransactions } from "./actions/transaction.action";
import Cookies from "js-cookie";
import { getTransactionRecs } from "./actions/transactionRec.action";
import { getDepenseEvents } from "./actions/depensesEvent.action";
import {
  isEmpty,
  monthNumberToString,
  monthStringToNumber,
  toInt,
} from "./fonction_js/Utils";

const App = () => {
  let dateActual = new Date(Date.now());
  const userData = useSelector((state) => state.userReducer);
  const [sucessRequest, setSucessRequest] = useState(false);
  const [fetchBool, setFetchBool] = useState(false);
  const [recTransDone, setRecTransDone] = useState(false);
  const transactionData = useSelector((state) => state.transactionReducer);
  const dataTransactionRec = useSelector(
    (state) => state.transactionRecReducer
  );

  const dispatch = useDispatch();
  const [uid, setUid] = useState(null);

  async function fetchToken() {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}jwtid`,
      withCredentials: true,
    })
      .then((res) => {
        setUid(res.data.id);
        setSucessRequest(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setFetchBool(true);
  }

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    console.log(uid);
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getTransactions(uid));
      dispatch(getTransactionRecs(uid));
      dispatch(getDepenseEvents(uid));
    }
  }, [uid]);

  const isInclude = (val) => {
    let date = dateActual.toLocaleDateString();
    let dateList = date.toString().split("/");
    let month = monthNumberToString(toInt(dateList[1]) - 1);
    let year = dateList[2];
    let day = dateList[0];

    if (
      transactionData.filter(
        (transaction) =>
          transaction.nom == val.nom &&
          transaction.somme == val.somme &&
          transaction.month == month &&
          transaction.year == year &&
          transaction.categorie == val.categorie
      ).length === 0
    ) {
      if (toInt(day) >= toInt(val.date)) {
        const data = {
          categorie: val.categorie,
          month: month,
          year: year,
          nom: val.nom,
          somme: val.somme,
          comment: val.comment,
          UserId: val.UserId,
          date: dateActual,
          dateString: val.date,
        };

        dispatch(addTransaction(data));
      }
    }
  };

  useEffect(() => {
    if (
      !isEmpty(dataTransactionRec) &&
      !recTransDone &&
      !isEmpty(transactionData)
    ) {
      dataTransactionRec.map((val, key) => isInclude(val));
      setRecTransDone(true);
    }
  }, [dataTransactionRec]);

  useEffect(() => {
    if (fetchBool && !sucessRequest && Cookies.get("refresh") != "true") {
      Cookies.set("refresh", "true", { expires: 1 });
      window.location = "/";
    }
  }, [fetchBool]);
  return (
    <UidContext.Provider value={[uid, setUid]}>
      <RoutesComponent />
    </UidContext.Provider>
  );
};

export default App;

// ------------- tips js ---------------

// Pour ajouter une class sur un click

// let element=document.querySelector('.className');
// element.onclick = function (){
//     element.classList.className('active');
// }
