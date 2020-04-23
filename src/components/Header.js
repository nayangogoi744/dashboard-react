import React, { Component } from "react";
import image from "../images/image.png";
import "../Headerstyle.css";

class Header extends Component {
  render() {
    return (
      <navbar id="navbar">
        <div class="mylogo">
          <img
            className="logo"
            src={image}
            alt="COVID-19"
            style={{ textAlign: "center" }}
          />
        </div>
        <ul>
          <li>
            <a class="info" href="https://www.mohfw.gov.in/">
              COVID19 Information
            </a>
          </li>
        </ul>
      </navbar>
    );
  }
}

export default Header;
