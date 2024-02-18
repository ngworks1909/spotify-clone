import React from "react";
import "../css/Main.css";
import Top from "./Top";
import CardList from "./CardList";


export default function Main() {
  return (
    <div className="main display-flex flex-column">
      <div className="top-item">
      <Top />
      </div>
      <div className="submain">
        <CardList />
      </div>
    </div>
  );
}
