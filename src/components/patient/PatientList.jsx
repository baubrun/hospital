import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PatientList = (props) => {
  const { selectedId, waitingList } = props;
  const theme = useTheme();
  const [patientList, setPatientsList] = useState([]);

  useEffect(() => {
    setPatientsList(waitingList);
  }, [selectedId, waitingList]);

  if (patientList?.length < 1) {
    return (
      <Box
        sx={{
          margin: 3,
          textTransform: "uppercase",
        }}
      >
        <Typography variant="h5">NONE</Typography>
      </Box>
    );
  }

  return (
    <List
      sx={{
        border: `2px solid ${theme.palette.secondary.main}`,
        width: 240,
        overflow: "auto",
      }}
    >
      {patientList?.map((i, idx) => (
        <ListItem button key={idx} selected={i?._id === selectedId}>
          <ListItemText primary={`${i?.first_name} ${i?.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default PatientList;
