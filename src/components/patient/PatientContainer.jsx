import React from "react";
import Box from "@mui/material/Box";

const PatientContainer = (props) => {
  const { children, tabValue, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={tabValue !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {tabValue === index && <Box p={3}>{children}</Box>}
    </Box>
  );
};

export default PatientContainer;
