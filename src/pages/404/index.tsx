import React from "react";
import bgurl from "@/assets/images/Pic_nothing_suit.png";
import "./index.scss";

export default function NotFound() {
  return (
    <div className="NotFound">
      <div>
        <span>404</span>
        <div className="img" style={{ backgroundImage: `url(${bgurl})` }}></div>
        <p>No found Page...</p>
      </div>
    </div>
  );
}
