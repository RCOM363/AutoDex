// import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav>
        <div className="logo">AutoDex</div>
        <div className="menucont">
          <ul className="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Signin">Signin</Link></li>
            <li><Link to="/">About</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
