import React, { useState } from "react";
import "./bmiInput.css";
import { useBmi } from "../../Context/BmiContext";

function BmiInput({ unit }) {
  const { bmiValues, setBmiValues } = useBmi();
  const [isFocus,setIsFocus] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBmiValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = () => {
    setIsFocus(false)
  }

  return (
    <div className={`bmiInputContainer ${isFocus && 'containerFocus'}`}>
      <input
        type="number"
        name={unit}
        value={bmiValues[unit] || ''} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="0"
        className="bmiInput headingM"
      />
      <p className="bmiInputUnit headingM">{unit}</p>
    </div>
  );
}

export default BmiInput;
