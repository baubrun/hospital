import React from "react";

import PatientInformation from "../patientForm/PatientInformation";
import MedicalHistory from "./MedicalHistory";
import Confirmation from "./Confirmation";






const PatientStepContent = (props) => {

  switch (props.stepIndex) {
    case 0:
      return (
        <PatientInformation
          nextStep={props.nextStep}
          handleChange={props.handleChange}
          values={props.values}
        />

      );
    case 1:
      return (
        <MedicalHistory
          nextStep={props.nextStep}
          prevStep={props.prevStep}
          handleChange={props.handleChange}
          values={props.values}
          handleCheckbox={props.handleCheckbox}
        />
      );

    case 2:
      return (
        <Confirmation 
        nextStep={props.nextStep} 
        prevStep={props.prevStep} 
        handleChange={props.handleChange}
        values={props.values} 
        />
      );
    default:
      return null;
  }
};

export default PatientStepContent;
