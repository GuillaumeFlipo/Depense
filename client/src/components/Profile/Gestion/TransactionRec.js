import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../fonction_js/Utils";
import TransactionRecEdit from "./TransactionRecEdit";

const TransactionRec = () => {
  const dataTransactionRec = useSelector(
    (state) => state.transactionRecReducer
  );

  //   useEffect(() => {
  //     if (!isEmpty(dataTransactionRec)) {
  //       console.log(dataTransactionRec, "dataRec");
  //     }
  //   }, [dataTransactionRec]);

  const sortFunction = (a, b) => {
    let date_a = new Date(a.createdAt);
    let date_b = new Date(b.createdAt);
    let date2_a = date_a.toLocaleDateString();
    let date2_b = date_b.toLocaleDateString();
    let dateList_a = date2_a.toString().split("/");
    let dateList_b = date2_b.toString().split("/");

    if (dateList_a[0] > dateList_b[0]) {
      return 1;
    } else if (dateList_a[0] < dateList_b[0]) {
      return -1;
    } else {
      if (dateList_a[1] > dateList_b[1]) {
        return 1;
      } else if (dateList_a[1] > dateList_b[1]) {
        return -1;
      } else {
        if (dateList_a[2] >= dateList_b[2]) {
          return 1;
        } else {
          return -1;
        }
      }
    }
  };

  return (
    <div className="transactionRec_container">
      <h2>Gestion des transactions récurrentes</h2>

      <div className="head">
        <p>
          Reccurence :<br /> Date de <br /> prélevement :<br /> Depuis le :
        </p>
        <p>Nom:</p>
        <p>Somme:</p>
        <p>Categorie:</p>
        <p>Comment:</p>
      </div>
      <div className="transactionRec_tab">
        {!isEmpty(dataTransactionRec) &&
          dataTransactionRec
            .sort((a, b) => b.id - a.id)
            .map((val, key) => (
              <div className="element" key={key}>
                <TransactionRecEdit transaction={val} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default TransactionRec;
