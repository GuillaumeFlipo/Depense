import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { monthStringToNumber } from "../../fonction_js/Utils";
import Categorie from "./Categorie";
import PayementReccurent from "./PayementReccurent";
import TableauChart from "./TableauChart";

const Depense = () => {
  let date = new Date(Date.now());

  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState();
  const [monthNumber, setMonthNumber] = useState(date.getMonth());
  // const listNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const transactionData = useSelector((state) => state.transactionReducer);

  const categories = [
    "Nourriture",
    "Transport",
    "Logement",
    "Loisir",
    "Santé",
    "Abonnement",
    "Autre",
  ];

  useEffect(() => {
    setNumberToMonth(date.getMonth());
    setYear(date.getFullYear());
  }, []);

  const setNumberToMonth = (int) => {
    if (int === -1) {
      int = 11;
      setYear(year - 1);
    }
    if (int === 12) {
      int = 0;
      setYear(year + 1);
    }

    setMonthNumber(int);

    switch (int) {
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
  };

  const numberToMonth = (int) => {
    switch (int) {
      case -1:
        return "Décembre";
      case 0:
        return "Janvier";
      case 1:
        return "Février";
      case 2:
        return "Mars";
      case 3:
        return "Avril";
      case 4:
        return "Mai";
      case 5:
        return "Juin";
      case 6:
        return "Juillet";
      case 7:
        return "Août";
      case 8:
        return "Septembre";
      case 9:
        return "Octobre";
      case 10:
        return "Novembre";
      case 11:
        return "Décembre";
      case 12:
        return "Janvier";
    }
  };

  return (
    <div className="depense_container">
      <div className="head_date_container">
        <div className="choix_date">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="categories_annee"
          >
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
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
        <div className="date_actual_container">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => {
              setNumberToMonth(monthStringToNumber(month) - 1);
            }}
          />

          <p
            onClick={() => {
              setNumberToMonth(monthStringToNumber(month) - 1);
            }}
          >
            {numberToMonth(monthStringToNumber(month) - 1)}
          </p>
          <p
            onClick={() => {
              setNumberToMonth(monthStringToNumber(month));
            }}
          >
            {numberToMonth(monthStringToNumber(month))}
          </p>
          <p
            onClick={() => {
              setNumberToMonth(monthStringToNumber(month) + 1);
            }}
          >
            {numberToMonth(monthStringToNumber(month) + 1)}
          </p>
          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={() => {
              setNumberToMonth(monthStringToNumber(month) + 1);
            }}
          />
        </div>
        {/* <div className="actualiser_container">
          <div className="pointer submit">
            <p
              onClick={() => {
                window.location = "/";
              }}
            >
              Actualiser
            </p>
          </div>
        </div> */}
      </div>

      <div className="total_container">
        <TableauChart
          categories={categories}
          month={month}
          year={year}
          transactionData={transactionData}
        />
      </div>
      <React.Fragment>
        <PayementReccurent categories={categories} month={month} year={year} />
      </React.Fragment>
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
