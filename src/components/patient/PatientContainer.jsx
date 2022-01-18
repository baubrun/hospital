import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";


const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      elevation: 15,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    modal: {
      width: "80%",
      margin: "auto",
    },
  }));


const PatientContainer = (props) => {
  const classes = useStyles();
  const { children, tabValue, index, ...other } = props;

  return (
    <Box
      className={classes.tabPanel}
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


export default PatientContainer
