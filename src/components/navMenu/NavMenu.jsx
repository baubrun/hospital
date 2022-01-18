import React from "react";
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import { navItems } from "./navItems";

const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: theme.palette.primary.main
    },
  links: {
    textDecoration: "none",

  },
  listItem: {
      display: "flex",
      color: theme.palette.secondary.main
  },
  icon: {
    color: theme.palette.secondary.main
}
}));

const NavMenu = (props) => {
  const classes = useStyles();

  return (
    <>
      <Drawer open={props.open} onClose={() => props.close(false)}>
      <List >
        {navItems.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
                <ListItem>
                  <Link to={item.url} className={classes.links}>
                      <Box className={classes.listItem}>
                      <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name}/>
                      </Box>
                  </Link>
                </ListItem>
              <Divider className={classes.divider}/>
            </React.Fragment>
          );
        })}
         </List>
      </Drawer>
    </>
  );
};

export default NavMenu;
