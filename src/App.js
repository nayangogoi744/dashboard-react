import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Cards from "./components/cards";
import Charts from "./components/charts";
import Table from "./components/Table";
import Footer from "./components/Footer";

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Cards />
        <Charts />
        <Table />
        <Footer />
      </div>
    );
  }
}
