import React from "react";
import Axios from "axios";
import "../Tablestyle.css";
const columnHeader = ["Location", "ConfirmedCases", "Deaths", "Discharged"];
export default class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      myarr: [],
      newArr: [],
      reg: [],
    };

    // console.log("Inside constructor");
  }
  async componentDidMount() {
    const response = await Axios.get(
      "https://api.rootnet.in/covid19-in/stats/latest"
    );
    var body = JSON.stringify(response);
    var obj = JSON.parse(body);
    const region = obj.data.data.regional;
    this.setState({ reg: region });
  }
  generateHeader() {
    let res = [];
    for (var i = 0; i < columnHeader.length; i++) {
      res.push(<th key={columnHeader[i]}>{columnHeader[i]}</th>);
    }
    return res;
  }

  generateTableData() {
    let res = [];
    let tableData = this.state.reg;
    for (var i = 0; i < tableData.length; i++) {
      res.push(
        <tr>
          <td key={tableData[i].loc}>{tableData[i].loc}</td>
          <td key={tableData[i].confirmedCasesIndian}>
            {tableData[i].confirmedCasesIndian}
          </td>
          <td key={tableData[i].deaths}>{tableData[i].deaths}</td>
          <td key={tableData[i].discharged}>{tableData[i].discharged}</td>
        </tr>
      );
    }
    return res;
  }

  render() {
    return (
      <React.Fragment>
        <div class="table-item">
          <div class="left-table-header">
            <h5>Corona Affected Persons in India</h5>
          </div>

          <table className="table  table-hover table-property">
            <thead>
              <tr class="table-header">{this.generateHeader()}</tr>
            </thead>
            <tbody class="table-body">{this.generateTableData()}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}
