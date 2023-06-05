import React, { useEffect } from "react";
import "./style.css";

const LargeElement = ({ unikalNumber, onTransfer }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTransfer();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onTransfer]);

  return (
    <div className="largeElementContainer">
      <div className="largeElementContent">{unikalNumber}</div>
    </div>
  );
};

export default LargeElement;
