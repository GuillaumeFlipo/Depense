import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../fonction_js/Utils";
import Categorie from "./Categorie";
import TableauChart from "./TableauChart";

const Depense = () => {
  let date = new Date(Date.now());

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState();
  const transactionData = useSelector((state) => state.transactionReducer);

  const categories = ["Nourriture", "Transport", "Loisir", "Santé", "Autre"];

  useEffect(() => {
    switch (date.getMonth()) {
      case 0:
        return setMonth("Janvier");
      case 1:
        return setMonth("Février");
      case 2:
        return setMonth("Mars");
      case 3:
        return setMonth("Avril");
      case 4:
        return setMonth("Mai");
      case 5:
        return setMonth("Juin");
      case 6:
        return setMonth("Juillet");
      case 7:
        return setMonth("Août");
      case 8:
        return setMonth("Septembre");
      case 9:
        return setMonth("Octobre");
      case 10:
        return setMonth("Novembre");
      case 11:
        return setMonth("Décembre");
    }
  }, []);

  useEffect(() => {
    let char = "12/23/2333";
    let date = char.slice(0, 2);
    console.log(date, "test");
  });

  return (
    <div className="depense_container">
      <div className="head_date_container">
        <div className="choix_date">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="categories_annee"
          >
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="categories_mois"
          >
            <option value="Janvier">Janvier</option>
            <option value="Février">Février</option>
            <option value="Mars">Mars</option>
            <option value="Avril">Avril</option>
            <option value="Mai">Mai</option>
            <option value="Juin">Juin</option>
            <option value="Juillet">Juillet</option>
            <option value="Août">Août</option>
            <option value="Septembre">Septembre</option>
            <option value="Octobre">Mars</option>
            <option value="Novembre">Novembre</option>
            <option value="Décembre">Décembre</option>
          </select>
        </div>
        <div className="actualiser_container">
          <div className="pointer submit">
            <p
              onClick={() => {
                window.location = "/";
              }}
            >
              Actualiser
            </p>
          </div>
        </div>
      </div>

      <div className="total_container">
        <TableauChart
          categories={categories}
          month={month}
          year={year}
          transactionData={transactionData}
        />
      </div>
      <div className="categorie_container">
        {categories.map((cat, key) => (
          <Categorie
            cat={cat}
            month={month}
            year={year}
            key={key}
            transactionData={transactionData}
            moisNum={date.getMonth() + 1}
            jourNum={date.getDate()}
          />
        ))}
      </div>
    </div>
  );
};

export default Depense;
