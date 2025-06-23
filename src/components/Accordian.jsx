import React, { useState } from "react";
import { items } from "../data";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Accordian = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if already open
    } else {
      setOpenIndex(index); // Open if different
    }
  };
  return !items || (items.length === 0)? "No Data Available" : (
    <div className="accordion">
      {items.map((item, index) => {
        return (
          <div key={index} className="accordion-item">
            <button
              className="accordion-title"
              onClick={() => handleClick(index)}
            >
              {item.title}
              {openIndex === index ? (
                <FaChevronUp className="right" />
              ) : (
                <FaChevronDown className="right" />
              )}
            </button>

            {openIndex === index && (
              <div className="accordion-content">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordian;
