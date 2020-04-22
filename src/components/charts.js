import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../Chartstyle.css";
const url = "https://api.covid19india.org/data.json";

const xlabels = [];
const ylabels = [];
export default class charts extends React.Component {
  state = {
    region: [],
  };
  async fetchDailyData() {
    const { data } = await axios.get(`${url}`);
    //console.log(data);
    const region = data.cases_time_series;
    region.forEach((ele) => {
      var dat = ele["date"];
      xlabels.push(dat);
      var confirmed = ele["dailyconfirmed"];
      ylabels.push(confirmed);
      // console.log(dat, confirmed);
    });
  }

  componentDidMount() {
    this.fetchDailyData();
  }

  render() {
    const state = {
      labels: xlabels,
      datasets: [
        {
          label: "Confirmed",
          fill: false,
          lineTension: 0.2,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 0,
          data: ylabels,
        },
      ],
    };
    return (
      <div class="container ">
        <div class="line-chart">
          <Line
            data={state}
            options={{
              title: {
                display: true,
                text: "INDIA Daily Data-COVID19",
                fontSize: 20,
                fontFamily: "Roboto Slab",
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    );
  }
}
