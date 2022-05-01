import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../fonction_js/Utils";
import { UidContext } from "../AppContext";
import Chart from "chart.js/auto";

const ChartEvent = ({ categories, month, year, transactionData, list }) => {
  const [uid, setUid] = useContext(UidContext);
  const [sommeTotalCat, setSommeTotalCat] = useState(0);
  const [sommeTotal, setSommeTotal] = useState(0);

  const pageData = useSelector((state) => state.pageReducer);

  useEffect(() => {
    if (!isEmpty(transactionData)) {
      let somme_array = [];
      let sommeTot = 0;
      //   console.log(categories.length);
      for (let j = 0; j < categories.length; j++) {
        let somme = 0;
        for (let i = 0; i < transactionData.length; i++) {
          if (
            transactionData[i].categorie == categories[j] &&
            transactionData[i].month == month &&
            transactionData[i].year == year &&
            transactionData[i].DepensesEventId == list &&
            transactionData[i].quiPaye != "Nous deux"
          ) {
            somme += transactionData[i].somme;
          }
          if (
            transactionData[i].categorie == categories[j] &&
            transactionData[i].month == month &&
            transactionData[i].year == year &&
            transactionData[i].DepensesEventId == list &&
            transactionData[i].quiPaye == "Nous deux"
          ) {
            somme += transactionData[i].somme * 2;
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
  }, [transactionData, uid, month, year]);

  useEffect(() => {
    if (sommeTotalCat != []) {
      const ctx = document.getElementById("myChart").getContext("2d");
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
                "#1999b3",
              ],
              borderColor: [
                "#353D40",
                "#0A9155",
                "#F2B138",
                "#631f00",
                "#A1A5A6",
                "#1999b3",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            // y: {
            //   display: typeChart.legendAxe.display,
            //   title: {
            //     text: "Pourcentage",
            //     display: typeChart.legendAxe.display,
            //     color: "rgb(30,30,30)",
            //     font: {
            //       size: 16,
            //     },
            //   },
            //   ticks: {
            //     font: {
            //       size: 15,
            //     },
            //   },
            // },
          },
          //   x: {
          //     display: typeChart.legendAxe.display,

          //     ticks: {
          //       font: {
          //         size: 15,
          //       },
          //     },
          //   },

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
          <p>Total :</p>
          <p>
            <span>{sommeTotal} €</span>
          </p>
        </div>
      </div>
      <div className="total_chart">
        <canvas id="myChart"></canvas>
      </div>
    </React.Fragment>
  );
};

export default ChartEvent;
