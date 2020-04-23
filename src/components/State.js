import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../Statestyle.css";
const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [dailyconfirmed, setDailyRecovered] = useState([]);
  const [date, setDate] = useState([]);

  const chart = () => {
    let confirmed = [];

    let state = [];
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        //console.log(res);
        for (const dataObj of res.data.statewise) {
          if (dataObj.state !== "Total") {
            // console.log(state);
            confirmed.push(dataObj.confirmed);
            state.push(dataObj.state);
          }
        }
        setChartData({
          labels: state,
          datasets: [
            {
              label: "Confirmed Cases",
              data: confirmed,
              backgroundColor: "rgba(75,110,192,0.6)",
              borderWidth: 0,
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
    <div className="state-data">
      <div class="chart-header">
        <h5 class="head">Most Affected States</h5>
      </div>
      <div>
        <Line
          data={chartData}
          options={{
            responsive: true,

            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        ></Line>
      </div>
    </div>
  );
};

export default Charts;
