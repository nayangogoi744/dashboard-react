import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Cards from "./components/cards";
import Charts from "./components/charts";
import Table from "./components/Table";
import Footer from "./components/Footer";
import LeftContent from "./components/LeftContent";
import State from "./components/State";
import Ratio from "./components/Ratio";
import "./Appstyle.css";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div class="container">
          <Cards />
          <Charts />
          <div class="items">
            <Table />
            <LeftContent />
          </div>

          <Footer />
        </div>
      </div>
    );
  }
}
