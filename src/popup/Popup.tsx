import React, { useEffect } from "react";
import "./Popup.scss";
import Option from './Option';

export default function Popup() {

  return (
    <div className="popup">
      <h2>options</h2>
      <Option title="Enabled" optionName="enabled"/>
    </div>
  );
  
}
