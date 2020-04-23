import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import "../LeftContentstyle.css";
import State from "./State";
import Ratio from "./Ratio";
const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [dailyrecovered, setDailyRecovered] = useState([]);
  const [date, setDate] = useState([]);

  const chart = () => {
    let dailyrecovered = [];
    let dailydeceased = [];
    let date = [];
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        //console.log(res);
        for (const dataObj of res.data.cases_time_series) {
          dailyrecovered.push(dataObj.dailyrecovered);
          dailydeceased.push(dataObj.dailydeceased);
          date.push(dataObj.date);
        }
        setChartData({
          type: "bar",
          labels: date,
          datasets: [
            {
              label: "Recovery cases",
              data: dailyrecovered,
              backgroundColor: "rgba(55, 160, 225, 0.7)",
              hoverBackgroundColor: "rgba(55, 160, 225, 0.7)",
              hoverBorderWidth: 2,
              hoverBorderColor: "lightgrey",
            },
            {
              label: "Death cases",
              data: dailydeceased,
              backgroundColor: "rgba(225, 58, 55, 0.7)",
              hoverBackgroundColor: "rgba(225, 58, 55, 0.7)",
              hoverBorderWidth: 2,
              hoverBorderColor: "lightgrey",
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(dailyrecovered, dailydeceased, date);
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="content">
      <div class="chart-header-2">
        <h5 class="head">Daily Recover and Death Cases for India</h5>
      </div>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              yAxes: [
                {
                  stacked: true,
                  gridLines: {
                    display: true,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                  stacked: true,
                },
              ],
            },
          }}
        ></Bar>
      </div>
      <div>
        <State />
        <Ratio />
      </div>
    </div>
  );
};

export default Charts;
