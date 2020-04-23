import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import "../Ratiostyle.css";
const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [active, setDailyRecovered] = useState([]);
  const [date, setDate] = useState([]);

  const chart = () => {
    let active = [];
    let confirmed = [];
    let deaths = [];
    let recovered = [];

    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        //console.log(res);
        for (const dataObj of res.data.statewise) {
          if (dataObj.state !== "Total") {
            // console.log(state);
          } else {
            confirmed.push(dataObj.confirmed);
            active.push(dataObj.active);
            deaths.push(dataObj.deaths);
            recovered.push(dataObj.recovered);
          }
        }
        setChartData({
          labels: ["Active ", "Confirmed", "Deaths", "Recovered"],
          datasets: [
            {
              fill: true,
              backgroundColor: ["yellow", "cornflowerblue", "red", "green"],
              data: [active, confirmed, deaths, recovered],
              // Notice the borderColor
              borderColor: ["grey", "grey", "grey", "grey"],
              borderWidth: [0, 0, 0, 0],
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(confirmed, state);
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="pie-data">
      <div class="pie-header">
        <h5 class="pie-head">Confirmed : Deaths: Recovered : Active</h5>
      </div>
      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            position: "top",
          }}
        ></Pie>
      </div>
    </div>
  );
};

export default Charts;
