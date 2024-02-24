import React, { useEffect, useState } from "react";
import "./bmiRadioButton.css";

import { useBmi } from "../../Context/BmiContext";

function BmiRadioButton({ label }) {
  const { unitSystem, setUnitSystem } = useBmi();
  const [radioType, setRadioType] = useState("radioIdle");

  useEffect(() => {
    setRadioType(unitSystem === label ? "radioActive" : "radioIdle");
  }, [unitSystem, label]);


  return (
    <button
      key={label}
      className="bmiRadioContainer"
      onClick={() => setUnitSystem(label)}
      onMouseEnter={() =>
        setRadioType((prev) => (prev !== "radioActive" ?  "radioHover" : prev))
      }
      onMouseLeave={() =>
        setRadioType((prev) => (prev !== "radioActive" ? "radioIdle" : prev))
      }
    >
      <div className={radioType}>
        {radioType === "radioActive" && <div className="radioFill"></div>}
      </div>
      <p className="radioText bodyM textBold">{label}</p>
    </button>
  );
}

export default BmiRadioButton;
