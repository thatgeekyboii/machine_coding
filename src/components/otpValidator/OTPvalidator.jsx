import React, { useEffect, useRef, useState } from "react";
import './OTPvalidator.css'

const OTPgenerator = () => {
  const OTP_INPUT_DIGITS = 5;

  const [inputArr, setInputArr] = useState(
    new Array(OTP_INPUT_DIGITS).fill("")
  );

  // ref array to store the reference of the input box
  const refArr = useRef([]);

  // focus on first input box on refresh
  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  function handleChange(value, index) {
    if (isNaN(value)) return;
    const newVal = value.trim(); //removing whitespace

    const newArr = [...inputArr]; // copying inputArr
    newArr[index] = newVal.slice(-1); // getting only the latest input
    setInputArr(newArr);
    // Move focus only if there's a new character
    if (newVal) {
      refArr.current[index + 1]?.focus();
    }
  }

  function handleBackSpace(e, index) {
    if (e.key === "Backspace") {
      const newArr = [...inputArr];

      if (inputArr[index] === "") {
        // Move focus to previous if already empty
        if (index > 0) {
          refArr.current[index - 1]?.focus();
        }
      } else {
        // Otherwise just clear current
        newArr[index] = "";
        setInputArr(newArr);
      }
    }
  }

  function handleSubmit() {
    const otp = inputArr.join("");

    if (otp.length !== OTP_INPUT_DIGITS || !/^\d+$/.test(otp)) {
      alert("Please enter a valid 5-digit OTP.");
      return;
    }

    const correctOTP = "12345";
    if (otp === correctOTP) {
      alert("✅ OTP Verified Successfully!");
    } else {
      alert("❌ Invalid OTP. Try again.");
    }
  }
  return (
    <div>
      <h1 className="heading">OTP Validator</h1>
      <div className="input-container">
        {inputArr.map((input, index) => {
          return (
            <input
              key={index}
              type="text"
              className="otp-input"
              value={inputArr[index]}
              ref={(input) => (refArr.current[index] = input)} // map reference array to each input
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleBackSpace(e, index)}
            ></input>
          );
        })}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        {" "}
        Submit
      </button>
    </div>
  );
};

export default OTPgenerator;
