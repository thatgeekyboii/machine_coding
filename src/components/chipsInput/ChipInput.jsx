import React, { useState } from "react";
import "./ChipInput.css";
const ChipInput = () => {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState([]);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && inputText !== "") {
      setChips((prev) => [...prev, inputText]);
      setInputText("");
    }
  };

  const handleDelete = (index) => {
    const copyChips = [...chips];
    copyChips.splice(index, 1);
    setChips(copyChips);
  };
  return (
    <div className="main-container">
      <h1>Chips</h1>
      <div className="chips-container">
        <input
          placeholder="Enter a chip"
          className="chips-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleOnKeyDown}
        />
        <div className="chip-wrapper">
          {chips.map((chip, index) => (
            <div key={index} className="chip-display">
              {chip}
              <span className="close-btn" onClick={() => handleDelete(index)}>
                ×
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChipInput;
