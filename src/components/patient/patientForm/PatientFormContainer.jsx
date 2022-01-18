import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import PatientStepContent from "./PatientStepContent";
import TitleBar from "../../TitleBar";
import { getTrueKeys } from "../../../utils";

import { createPatient } from "../../../redux/patientSlice";

const useStyles = makeStyles((theme) => ({
  stepper: {
    margin: `${theme.spacing(2)}px 0px`,
  },
  step: {
    margin: "0 64px",
  },
}));

const defaultState = {
  careLevel: "",
  discharge: null,
  insuranceNumber: null,
  firstName: "",
  lastName: "",
  medicalHistory: {
    Stroke: false,
    "Covid-19": false,
    "Heart Failure": false,
    "Cancer Treatment": false,
    "General Pain": false,
    "Broken limb": false,
  },
};

const steps = ["Patient Information", "Medical history", "Confirm"];

const PatientFormContainer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [values, setValues] = useState(defaultState);
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const prevStep = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const resetStep = () => {
    setActiveStep(0);
  };

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const handleCheckbox = (evt) => {
    const { checked, name } = evt.target;
    setValues({
      ...values,
      medicalHistory: {
        ...values.medicalHistory,
        [name]: checked,
      },
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = {
      careLevel: values.careLevel,
      discharge: values.discharge,
      insuranceNumber: values.insuranceNumber,
      firstName: values.firstName,
      lastName: values.lastName,
      medicalHistory: getTrueKeys(values.medicalHistory),
    };
    dispatch(createPatient(formData));
    setValues(defaultState);
    resetStep();
  };



  return (
    <>
     
      <Grid item>
        <TitleBar text="patient information" />
      </Grid>

      <Grid
        className={classes.stepper}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, idx) => (
              <Step key={idx}>
                <StepLabel className={classes.step}>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item>
          <form onSubmit={handleSubmit}>
            <PatientStepContent
              nextStep={nextStep}
              prevStep={prevStep}
              handleChange={handleChange}
              handleCheckbox={handleCheckbox}
              handleSubmit={handleSubmit}
              stepIndex={activeStep}
              values={values}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientFormContainer;
