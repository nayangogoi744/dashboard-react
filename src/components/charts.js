import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "../Chartstyle.css";
const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [dailyconfirmed, setDailyRecovered] = useState([]);
  const [date, setDate] = useState([]);

  const chart = () => {
    let dailyconfirmed = [];

    let date = [];
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        //console.log(res);
        for (const dataObj of res.data.cases_time_series) {
          dailyconfirmed.push(dataObj.dailyconfirmed);
          date.push(dataObj.date);
        }
        setChartData({
          labels: date,
          datasets: [
            {
              label: "Confirmed Cases",
              data: dailyconfirmed,
              backgroundColor: "rgba(75,110,192,0.6)",
              borderWidth: 0,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(dailyconfirmed, date);
  };
  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <div class="chart-header">
        <h5 class="head">Daily Confirmed Cases for India</h5>
      </div>
      <div class="chart-modify">
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
