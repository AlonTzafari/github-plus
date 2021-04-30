import React, { useEffect } from "react";
import "./Popup.scss";
import Option from './Option';

export default function Popup() {
  
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const toggleEnable = () => {

  }

  return (
    <div className="popup">
      <h2>options</h2>
      <Option title="Enabled" optionName="enabled"/>
    </div>
  );
}
