import React, { Component } from "react";
import Axios from "axios";
import "../Cardstyle.css";
class cards extends Component {
  constructor(props) {
    super(props);
    this.getCountryData = this.getCountryData.bind(this);
  }
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: [],
    lastupdated: 0,
  };
  componentDidMount() {
    this.getData();
  }

  async getData() {
    const resApi = await Axios.get("https://covid19.mathdro.id/api");
    const resCountries = await Axios.get(
      "https://covid19.mathdro.id/api/countries"
    );
    const countries = resCountries.data.countries.map((country) => {
      return country.name;
    });
    //console.log(countries);
    var d = new Date(resApi.data.lastUpdate);
    var n = d.toDateString();
    this.setState({
      confirmed: resApi.data.confirmed.value,
      recovered: resApi.data.recovered.value,
      deaths: resApi.data.deaths.value,
      lastupdated: n,
      countries,
    });
  }
  async getCountryData(e) {
    if (e.target.value === "WorldWide") {
      return this.getData();
    }
    const res = await Axios.get(
      `https://covid19.mathdro.id/api/countries/${e.target.value}`
    );
    this.setState({
      confirmed: res.data.confirmed.value,
      recovered: res.data.recovered.value,
      deaths: res.data.deaths.value,
    });
  }
  renderCountryOptions() {
    return this.state.countries.map((country, i) => {
      return <option key={i}>{country}</option>;
    });
  }
  render() {
    return (
      <div className="container">
        <div class="cards-content">
          <ul>
            <li class="item firstcard">
              <h5 class="card-heading">Confirmed</h5>
              <p>{this.state.confirmed}</p>
              <p class="card-para">Total Confirmed Cases COVID19</p>
            </li>
            <li class="item secondcard">
              <h5 class="card-heading">Recovered</h5>
              <p>{this.state.recovered}</p>
              <p class="card-para">Total Recovered Cases COVID19</p>
            </li>
            <li class="item thirdcard">
              <h5 class="card-heading">Deaths</h5>
              <p>{this.state.deaths}</p>
              <p class="card-para">Total Deceased Cases COVID19</p>
            </li>
          </ul>
        </div>
        <p> Last Updated:{this.state.lastupdated}</p>
        <section id="selectbox">
          <div class="selectbox-content">
            <p>
              <h3 class="dropdown-label">
                Select country from the drop-down list:
              </h3>
            </p>

            <label class="country" for="country">
              Country:
            </label>
            <select
              id="country"
              class="dropdown"
              onChange={this.getCountryData}
            >
              <option>WorldWide</option>
              {this.renderCountryOptions()}
            </select>
          </div>
        </section>
      </div>
    );
  }
}

export default cards;
