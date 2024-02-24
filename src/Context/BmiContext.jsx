import { createContext, useContext, useEffect, useState } from "react";

const BmiContext = createContext();

export const BmiProvider = ({ children }) => {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [bmiValues, setBmiValues] = useState({});
  const [bmi, setBmi] = useState('');
  const [targetWeight, setTargetWeight] = useState({
    floor: "",
    ceil: "",
  });
  const [bmiTextMessage,setBmiTextMessage] = useState();

  useEffect(() => {
    setBmiValues(
      unitSystem === "metric"
        ? { cm: "", kg: "" }
        : { ft: "", in: "", st: "", lbs: "" }
    );
  }, [unitSystem]);

  return (
    <BmiContext.Provider
      value={{
        unitSystem,
        setUnitSystem,
        bmiValues,
        setBmiValues,
        bmi,
        setBmi,
        targetWeight,
        setTargetWeight,
        bmiTextMessage,
        setBmiTextMessage
      }}
    >
      {children}
    </BmiContext.Provider>
  );
};

export const useBmi = () => useContext(BmiContext);
