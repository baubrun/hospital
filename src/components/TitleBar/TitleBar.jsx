import React from "react";
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material";

const TitleBar = ({ text }) => {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        textAlign: "center",
        fontSize: "24px",
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bolder",
        letterSpacing: "2px",
        position: "relative",
        backgroundColor: theme.palette.primary.light,
      }}
    >
      {text}
    </AppBar>
  );
};

export default TitleBar;
