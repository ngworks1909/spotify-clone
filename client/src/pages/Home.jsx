import React from "react";
import Main from "../components/Main";
import Bottom from "../components/Bottom";
import "../css/Home.css";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="subHome display-flex flex-column gap-10">
          <div className="subContainer display-flex">
            <div className="navibar">
              <Sidebar />
            </div>
            <div className="mein display-flex flex-column">
              <Main />
            </div>
          </div>
          <div className="bottomContainer">
            <Bottom />
          </div>
        </div>
      </div>
    </>
  );
}
