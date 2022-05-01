import React, { useState } from "react";
import Menu from "../components/commun/Menu";
import DepensesEventList from "../components/DepensesEvent/DepensesEventList";
import DepensesEvent_i from "../components/DepensesEvent/DepensesEvent_i";

const DepensesEvent = () => {
  const [list, setList] = useState(true);
  const categories = [
    "Nourriture",
    "Transport",
    "Logement",
    "Loisir",
    "Santé",
    "Abonnement",
    "Autre",
  ];

  return (
    <React.Fragment>
      <Menu />
      <div className="depenseEvent_container">
        {list === true ? (
          <DepensesEventList list={list} setList={setList} />
        ) : (
          <DepensesEvent_i
            list={list}
            setList={setList}
            categories={categories}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default DepensesEvent;
