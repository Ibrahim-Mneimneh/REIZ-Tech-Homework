import React from "react";
import "../App.css";
import logo from "./pin.png";
function Navbar() {
  return (
    <div className="Navbar">
      <img src={logo} alt=""></img>
      <span>Country-Info</span>
    </div>
  );
}

export default Navbar;
