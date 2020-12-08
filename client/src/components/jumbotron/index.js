import React from "react";
import './style.css'

function Jumbotron({ children }) {
  return (
    <div className="jumbotron jumbotron-fluid">
    <div className="container">
      {children}
    </div>
  </div>
  );
}

export default Jumbotron;