import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import NavMenu from "./navMenu/NavMenu";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: "bolder",
    letterSpacing: "2px",
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                onClick={() => setOpenMenu(true)}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <Typography className={classes.title} variant="h5">
                HOSPITAL MANAGEMENT
              </Typography>
            </Grid>
          </Grid>

          <NavMenu open={openMenu} close={setOpenMenu} />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default NavBar;
