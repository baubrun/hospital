import React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Box>
            <Typography variant="h6" sx={{ mr: 4, textTransform: "uppercase" }}>
              hospital
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
