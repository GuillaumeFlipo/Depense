import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";
import Chart from "chart.js/auto";
import { isEmpty } from "../../../fonction_js/Utils";

const Charts = ({ categories, month, year, transactionsData, filter }) => {
  const [uid, setUid] = useContext(UidContext);
  const pageData = useSelector((state) => state.pageReducer);
  const [sommeTotalCat, setSommeTotalCat] = useState(0);
  const [sommeTotal, setSommeTotal] = useState(0);

  useEffect(() => {
    if (!isEmpty(transactionsData)) {
      let somme_array = [];
      let sommeTot = 0;
      for (let j = 0; j < categories.length; j++) {
        let somme = 0;
        for (let i = 0; i < transactionsData.length; i++) {
          if (
            transactionsData[i].categorie == categories[j] &&
            transactionsData[i].year == year &&
            transactionsData[i].UserId == uid
          ) {
            if (filter === "mois") {
              if (transactionsData[i].month == month) {
                somme += transactionsData[i].somme;
              }
            } else {
              somme += transactionsData[i].somme;
            }
          }
        }
        // console.log(somme, "somme");
        // console.log(somme_array, "array");

        if (somme != 0) {
          somme_array.push(somme.toFixed(2));
        } else {
          somme_array.push(somme);
        }
        sommeTot += somme;
      }

      setSommeTotalCat(somme_array);
      setSommeTotal(sommeTot.toFixed(2));
    }
  }, [transactionsData, uid, month, year, filter]);

  useEffect(() => {
    if (sommeTotalCat != []) {
      const ctx = document.getElementById("myChart2").getContext("2d");
      const myChart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              label: "Répartition des dépenses",

              data: sommeTotalCat,
              backgroundColor: [
                "#353D40",
                "#0A9155",
                "#F2B138",
                "#631f00",
                "#A1A5A6",
              ],
              borderColor: [
                "#353D40",
                "#0A9155",
                "#F2B138",
                "#631f00",
                "#A1A5A6",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {},

          plugins: {
            legend: {
              display: true,
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
              text: "Répartition des dépenses",
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
  }, [sommeTotalCat, pageData.widthScreen]);
  return (
    <React.Fragment>
      <div className="total_tableau">
        {categories.map((cat, key) => (
          <div key={key} className="element_tableau">
            <p>{cat}</p>
            <p>{sommeTotalCat[key]} €</p>
          </div>
        ))}
        <div className="element_tableau">
          <p>Total</p>
          <p>{sommeTotal} €</p>
        </div>
      </div>
      <div className="total_chart">
        <canvas id="myChart2"></canvas>
      </div>
    </React.Fragment>
  );
};

export default Charts;
