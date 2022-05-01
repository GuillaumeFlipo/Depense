import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../fonction_js/Utils";
import DepensesEventListEdit from "./DepensesEventListEdit";

const DepensesEventList = ({ list, setList }) => {
  const depenseEventData = useSelector((state) => state.depenseEventReducer);

  const sortFunction = (a, b) => {
    let datea = new Date(a.dateDebut);
    let dateb = new Date(b.dateDebut);

    return dateb.getTime() - datea.getTime();
  };

  // const handleClick = (val) => {
  //   let dateDebut = new Date(val.dateDebut);
  //   let dateFin = new Date(val.dateFin);

  //   setList(
  //     `${val.nom}/${val.dateDebut.toJSON().split("T")[0]}/${
  //       val.dateFin.toJSON().split("T")[0]
  //     }`
  //   );
  // };

  return (
    <React.Fragment>
      <h2 className="title_list_evenement">
        Voici la liste des évènements spéciaux
      </h2>
      <div className="List">
        <div className="head_tab">
          <p>Nom :</p>
          <p>Date début :</p>
          <p>Date fin :</p>
          <p>Comment :</p>
          <p>Total :</p>
        </div>
        {!isEmpty(depenseEventData) &&
          depenseEventData
            .sort((a, b) => sortFunction(a, b))
            .map((val, key) => (
              <React.Fragment key={key}>
                <DepensesEventListEdit
                  depenseEvent={val}
                  list={list}
                  setList={setList}
                />
              </React.Fragment>
            ))}
      </div>
    </React.Fragment>
  );
};

export default DepensesEventList;
