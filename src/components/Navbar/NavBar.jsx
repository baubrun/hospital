import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import MenuIcon from "@mui/icons-material/Menu";
import { HOME_PAGE } from "../../shared/constants/navigation";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (path) => {
    history.replace(path);
    handleClose();
  };

  return (
    <>
      <IconButton size="large" sx={{ color: "#fff" }} onClick={handleClickMenu}>
        <MenuIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClick(HOME_PAGE.path)}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Home
        </MenuItem>

        <MenuItem onClick={() => handleClick("/")}>
          <ListItemIcon>
            <AirlineSeatReclineNormalIcon fontSize="small" />
          </ListItemIcon>
          Rooms
        </MenuItem>

        <MenuItem onClick={() => handleClick("")}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          Search
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBar;
