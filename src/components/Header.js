import React, { Component } from 'react';
import image from "../images/image.png";
import "../Headerstyle.css";

class Header extends Component {
    render() {
        return (
            <div className="container">
               <img className="logo" src={image} alt="COVID-19" style={{textAlign:"center"}}/>
            </div>
        );
    }
}

export default Header;