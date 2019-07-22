import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <>
      <h3>Stuffz to do</h3>
      <ul>
        <li>
          <Link to="/Categorizations/">Categorizations</Link>
        </li>
        <li>
          <Link to="/Dependencies/">Dependencies</Link>
        </li>
      </ul>
    </>
  );
}

export default MainPage;
