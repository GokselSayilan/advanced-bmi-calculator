import React, { useEffect } from "react";
import "./bmiApp.css";
import BmiRadioButton from "../BmiRadioButton/BmiRadioButton";
import { useBmi } from "../../Context/BmiContext";
import BmiInput from "../BmiInput/BmiInput";

function BmiApp() {
  const {
    unitSystem,
    bmi,
    setBmi,
    bmiValues,
    targetWeight,
    setTargetWeight,
    bmiTextMessage,
    setBmiTextMessage,
  } = useBmi();

  const calcBmi = () => {
    if (unitSystem === "metric") {
      let result = (bmiValues.kg / bmiValues.cm / bmiValues.cm) * 10000; // formula
      let formattedResult = parseFloat(result.toFixed(2)); // formatting
      setBmi(formattedResult);
      findTargetWeight(bmiValues.cm / 100);
    }

    if (unitSystem === "imperial") {
      let lbs = bmiValues.st * 14; // st to lbs
      let inch = bmiValues.ft * 12; // feet to inch
      lbs += parseFloat(bmiValues.lbs); // total lbs
      inch += parseFloat(bmiValues.in); // total inch
      let result = (lbs * 703) / (inch * inch); // formula
      let formattedResult = parseFloat(result.toFixed(2)); // formatting
      setBmi(formattedResult);
      findTargetWeight(inch);
    }
  };

  const findTargetWeight = (height) => {
    let floorWeight = (18.5 * height * height).toFixed(2);
    let ceilWeight = (24.9 * height * height).toFixed(2);

    if (unitSystem === "metric") {
      setTargetWeight({
        floor: `${floorWeight}kg`,
        ceil: `${ceilWeight}kg`,
      });
    }

    if (unitSystem === "imperial") {
      let floorSt = parseInt(floorWeight / 703 / 14);
      let floorLbs = parseInt(floorWeight / 703 - floorSt * 14);
      let ceilSt = parseInt(ceilWeight / 703 / 14);
      let ceilLbs = parseInt(ceilWeight / 703 - ceilSt * 14);
      setTargetWeight({
        floor: `${floorSt}st ${floorLbs} lbs`,
        ceil: `${ceilSt}st ${ceilLbs} lbs`,
      });
    }
  };

  useEffect(() => {
    const timerCalcBmi = setTimeout(() => {
      if (unitSystem === "metric") {
        if (bmiValues.kg !== "" && bmiValues.cm !== "") {
          calcBmi();
        }
      }

      if (unitSystem === "imperial") {
        if (
          bmiValues.ft !== "" &&
          bmiValues.in !== "" &&
          bmiValues.st !== "" &&
          bmiValues.lbs !== ""
        ) {
          calcBmi();
        }
      }
    }, 1500);

    return () => clearTimeout(timerCalcBmi);
  }, [bmiValues]);

  useEffect(() => {
    if (bmi < 18.5) {
      setBmiTextMessage("underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiTextMessage("healthy weight");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiTextMessage("overweight");
    } else {
      setBmiTextMessage("obese");
    }
  }, [bmi]);

  return (
    <div className="bmiApp">
      <div className="bmiAppWrapper">
        <header className="bmiHeader">
          <div className="bmiHeaderBg"></div>
          <img
            src="assets/logo.svg"
            alt="Header Shape"
            className="bmiHeaderShape"
          />
          <div className="bmiHeaderText">
            <h1 className="bmiHeaderTextTitle headingXL textTitleDark">
              Body Mass Index Calculator
            </h1>
            <p className="bmiHeaderTextDesc textBodyDark bodyM">
              Better understand your weight in relation to your height using our
              body mass index (BM) calculator. While BMI is not the sole
              determinant of a healthy weight, it offers a valuable starting
              point to evaluate your overall health and well-being.
            </p>
          </div>
          <div className="bmiCalculator bgLight">
            <h3 className="bmiCalculatorText headingM">
              Enter your details below
            </h3>
            <div className="bmiCalculatorRadioWrapper">
              <BmiRadioButton label={"metric"} />
              <BmiRadioButton label={"imperial"} />
            </div>
            {unitSystem === "metric" && (
              <div className="layoutMetric">
                <div className="containerMetricHeight">
                  <p className="metricHeightLabel bodyS textBodyDark">Height</p>
                  <BmiInput unit="cm" />
                </div>
                <div className="containerMetricWeight">
                  <p className="metricWeightLabel bodyS textBodyDark">Weight</p>
                  <BmiInput unit="kg" />
                </div>
              </div>
            )}
            {unitSystem === "imperial" && (
              <div className="layoutImperial">
                <div className="containerImperialHeight">
                  <p className="metricHeightLabel bodyS textBodyDark">Height</p>
                  <div className="heightWrapper">
                    <BmiInput unit="ft" />
                    <BmiInput unit="in" />
                  </div>
                </div>
                <div className="containerImperialWeight">
                  <p className="metricWeightLabel bodyS textBodyDark">Weight</p>
                  <div className="weightWrapper">
                    <BmiInput unit="st" />
                    <BmiInput unit="lbs" />
                  </div>
                </div>
              </div>
            )}
            <div className="bmiResult">
              {!bmi ? (
                <div className="bmiResultWelcome">
                  <h3 className="bmiResultWelcomeTitle headingM textBodyLight">
                    Welcome!
                  </h3>
                  <p className="bmiResultWelcomeDesc bodyS textBodyLight">
                    Enter your height and weight and you’ll see your BMI result
                    here
                  </p>
                </div>
              ) : (
                <div className="bmiResultText">
                  <div className="bmiResultValue">
                    <p className="bmiResultValueTitle bodyM textBodyLight textBold">
                      Your BMI is...
                    </p>
                    <h1 className="bmiResultValueNumber headingXL textTitleLight">
                      {bmi}
                    </h1>
                  </div>
                  <div className="bmiResultAdvice">
                    <p className="bmiResultAdviceDesc bodyS textBodyLight">
                      Your BMI suggests you’re a {bmiTextMessage}. Your ideal
                      weight is between{" "}
                      <span className="textBold">
                        {`${targetWeight.floor} - ${targetWeight.ceil}`}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="bmiMeans">
          <img
            src="assets/pattern-curved-line-left.svg"
            alt="Background Shape"
            className="bmiMeansBgShape"
          />
          <img
            src="assets/image-man-eating.webp"
            alt="Healtly Person"
            className="bmiMeansImg"
          />
          <div className="bmiMeansText">
            <h2 className="bmiMeansTextTitle headingL textTitleDark">
              What your BMI result means
            </h2>
            <p className="bmiMeansTextDesc bodyM textBodyDark">
              A BMI range of 18.5 to 24.9 is considered a 'healthy weight.'
              Maintaining a healthy weight may lower your chances of
              experiencing health issues later on, such as obesity and type 2
              diabetes. Aim for a nutritious diet with reduced fat and sugar
              content, incorporating ample fruits and vegetables. Additionally,
              strive for regular physical activity, ideally about 30 minutes
              daily for five days a week.
            </p>
          </div>
        </div>
        <div className="bmiMeansCards">
          <div className="bmiMeansCard">
            <img
              src="assets/icon-eating.svg"
              alt="Eating Icon"
              className="bmiMeansCardImg"
            />
            <div>
              <h5 className="bmiMeansCardTitle headingM textTitleDark">
                Healthy eating
              </h5>
              <p className="bmiMeansCardDesc bodyM textBodyDark">
                Healthy eating promotes weight control, disease prevention,
                better digestion, immunity, mental clarity, and mood.
              </p>
            </div>
          </div>
          <div className="bmiMeansCard">
            <img
              src="assets/icon-exercise.svg"
              alt="Exercise Icon"
              className="bmiMeansCardImg"
            />
            <div>
              <h5 className="bmiMeansCardTitle headingM textTitleDark">
                Regular exercise
              </h5>
              <p className="bmiMeansCardDesc bodyM textBodyDark">
                Exercise improves fitness, aids weight control, elevates mood,
                and reduces disease risk, fostering wellness and longevity.
              </p>
            </div>
          </div>
          <div className="bmiMeansCard">
            <img
              src="assets/icon-sleep.svg"
              alt="Sleep Icon"
              className="bmiMeansCardImg"
            />
            <div>
              <h5 className="bmiMeansCardTitle headingM textTitleDark">
                Adequate sleep
              </h5>
              <p className="bmiMeansCardDesc bodyM textBodyDark">
                Sleep enhances mental clarity, emotional stability, and physical
                wellness, promoting overall restoration and rejuvenation.
              </p>
            </div>
          </div>
        </div>
        <div className="bmiLimitations">
          <div className="limitationsContainer1">
            <div className="limitationsText">
              <h2 className="limitationsTextTitle headingL textTitleDark">
                Limitations of BMI
              </h2>
              <p className="limitationsTextDesc bodyM textBodyDark">
                Although BMI is often a practical indicator of healthy weight,
                it is not suited for every person. Specific groups should
                carefully consider their BMI outcomes, and in certain cases, the
                measurement may not be beneficial to use.
              </p>
            </div>
            <div className="limitationsCard">
              <div className="limitationsCardHeader">
                <img
                  src="assets/icon-gender.svg"
                  alt="Gender Icon"
                  className="limitationsCardHeaderImg"
                />
                <h6 className="limitationsCardHeaderTitle headingS textTitleDark">
                  Gender
                </h6>
              </div>
              <p className="limitationsDesc bodyM textBodyDark ">
                The development and body fat composition of girls and boys vary
                with age. Consequently, a child's age and gender are considered
                when evaluating their BMI.
              </p>
            </div>
          </div>
          <div className="limitationsContainer2">
            <img
              src="assets/pattern-curved-line-right.svg"
              alt="Background Shape"
              className="limitationsContainer2BgShape"
            />
            <div className="limitationsCard">
              <div className="limitationsCardHeader">
                <img
                  src="assets/icon-age.svg"
                  alt="Age Icon"
                  className="limitationsCardHeaderImg"
                />
                <h6 className="limitationsCardHeaderTitle headingS textTitleDark">
                Age
                </h6>
              </div>
              <p className="limitationsDesc bodyM textBodyDark ">
                TIn aging individuals, increased body fat and muscle loss may
                cause BMI to underestimate body fat content.
              </p>
            </div>
            <div className="limitationsCard">
              <div className="limitationsCardHeader">
                <img
                  src="assets/icon-muscle.svg"
                  alt="Muscle Icon"
                  className="limitationsCardHeaderImg"
                />
                <h6 className="limitationsCardHeaderTitle headingS textTitleDark">
                Muscle
                </h6>
              </div>
              <p className="limitationsDesc bodyM textBodyDark ">
                BMI may misclassify muscular individuals as overweight or obese,
                as it doesn't differentiate muscle from fat.
              </p>
            </div>
          </div>
          <div className="limitationsContainer3">
            <div className="limitationsCard">
              <div className="limitationsCardHeader">
                <img
                  src="assets/icon-pregnancy.svg"
                  alt="Pregnancy Icon"
                  className="limitationsCardHeaderImg"
                />
                <h6 className="limitationsCardHeaderTitle headingS textTitleDark">
                Pregnancy
                </h6>
              </div>
              <p className="limitationsDesc bodyM textBodyDark ">
                Expectant mothers experience weight gain due to their growing
                baby. Maintaining a healthy pre-pregnancy BMI is advisable to
                minimise health risks for both mother and child.
              </p>
            </div>
            <div className="limitationsCard">
              <div className="limitationsCardHeader">
                <img
                  src="assets/icon-race.svg"
                  alt="Race Icon"
                  className="limitationsCardHeaderImg"
                />
                <h6 className="limitationsCardHeaderTitle headingS textTitleDark">
                Race
                </h6>
              </div>
              <p className="limitationsDesc bodyM textBodyDark ">
                Certain health concerns may affect individuals of some Black and
                Asian origins at lower BMIs than others. To learn more, it is
                advised to discuss this with your GP or practice nurse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BmiApp;
