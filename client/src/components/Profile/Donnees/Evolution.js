import React, { useContext, useEffect, useState } from "react";
import {
  isEmpty,
  monthNumberToString,
  monthStringToNumber,
} from "../../../fonction_js/Utils";
import { UidContext } from "../../AppContext";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

const Evolution = ({
  categories,
  month,
  year,
  transactionsData,
  filter,
  monthNumber,
}) => {
  const [sommeTotalArray, setSommeTotalArray] = useState([]);
  const pageData = useSelector((state) => state.pageReducer);

  const [uid, setUid] = useContext(UidContext);
  const [yearMin, setYearMin] = useState(year);
  const [monthMin, setMonthMin] = useState(monthStringToNumber(month));
  const [monthYearArray, setMonthYearArray] = useState([]);

  useEffect(() => {
    if (!isEmpty(transactionsData)) {
      minYear();
      minMonth();
      let somme_array = [];
      let year_list = [];
      let monthYearArray_ = [];
      for (let i = yearMin; i <= year; i++) {
        year_list.push(i);
      }
      let month_list = [];
      for (let i = monthMin; i <= monthNumber; i++) {
        month_list.push(monthNumberToString(i));
      }

      for (let j = 0; j < year_list.length; j++) {
        let month_list_j = [0];
        if (filter == "mois") {
          if (year_list[j] == year) {
            month_list_j = month_list;
          } else {
            month_list_j = [
              "Janvier",
              "Février",
              "Mars",
              "Avril",
              "Mai",
              "Juin",
              "Juillet",
              "Août",
              "Septembre",
              "Octobre",
              "Novembre",
              "Décembre",
            ];
            // console.log("test", month_list_j);
          }
        }

        for (let k = 0; k < month_list_j.length; k++) {
          let somme = 0;

          for (let i = 0; i < transactionsData.length; i++) {
            if (
              transactionsData[i].year == year_list[j] &&
              transactionsData[i].UserId == uid
            ) {
              if (filter === "mois") {
                if (transactionsData[i].month == month_list_j[k]) {
                  somme += transactionsData[i].somme;
                }
              } else {
                somme += transactionsData[i].somme;
              }
            }
          }
          if (somme != 0) {
            somme_array.push(somme.toFixed(2));
          } else {
            somme_array.push(somme);
          }
          monthYearArray_.push({
            year: year_list[j],
            month: month_list_j[k],
          });
        }
      }

      setSommeTotalArray(somme_array);
      setMonthYearArray(monthYearArray_);
    }
  }, [transactionsData, uid, month, year, filter, monthMin, yearMin]);

  const minYear = () => {
    let year_min = year;
    for (let i = 0; i < transactionsData.length; i++) {
      if (transactionsData[i].UserId == uid) {
        if (transactionsData[i].year < year) {
          year_min = transactionsData[i].year;
        }
      }
    }
    setYearMin(year_min);
  };

  const minMonth = () => {
    let month_min = monthStringToNumber(month);

    for (let i = 0; i < transactionsData.length; i++) {
      if (
        transactionsData[i].UserId == uid &&
        transactionsData[i].year == yearMin
      ) {
        if (
          monthStringToNumber(transactionsData[i].month) <
          monthStringToNumber(month)
        ) {
          month_min = monthStringToNumber(transactionsData[i].month);
        }
      }
    }
    setMonthMin(month_min);
  };

  //   const yearMonthArrayFunction = ()=>{
  //       for
  //   }

  useEffect(() => {
    if (monthYearArray != []) {
      let monthYearLabel = [];

      if (filter == "mois") {
        for (let i = 0; i < monthYearArray.length; i++) {
          monthYearLabel.push(
            monthYearArray[i].month + " " + monthYearArray[i].year.toString()
          );
        }
      } else {
        for (let i = 0; i < monthYearArray.length; i++) {
          monthYearLabel.push(monthYearArray[i].year.toString());
        }
      }

      const ctx = document.getElementById("myChart3").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: monthYearLabel,
          datasets: [
            {
              label: "Evolution des dépenses",

              data: sommeTotalArray,
              backgroundColor: "rgb(38, 157, 255)",
              borderColor: "rgb(38, 157, 255)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              display: true,
              title: {
                text: "Euros",
                display: true,
                color: "rgb(30,30,30)",
                font: {
                  size: 16,
                },
              },
              ticks: {
                font: {
                  size: 15,
                },
              },
            },
          },
          x: {
            display: true,

            ticks: {
              font: {
                size: 15,
              },
            },
          },

          plugins: {
            legend: {
              display: false,
              position: "top",
              labels: {
                font: {
                  size: 16,
                },
              },
            },
            layout: {
              marginBottom: "20px",
            },
            title: {
              display: false,
              text: "Evolution des dépenses",
              fontSize: "2rem",
              color: "rgb(40,40,40)",
              position: "top",
            },
          },
        },
      });
      return () => {
        myChart.destroy();
      };
    }
  }, [monthYearArray, pageData.widthScreen]);

  return (
    <div className="evolution_container">
      <h2>Voici les dépenses totales par {filter}</h2>
      <div className="evolution_chart">
        <canvas id="myChart3"></canvas>
      </div>
    </div>
  );
};

export default Evolution;
