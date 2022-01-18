import React from "react";

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import QueueIcon from "@material-ui/icons/Queue";
import AirlineSeatLegroomExtraIcon from '@material-ui/icons/AirlineSeatLegroomExtra';


export const navItems = [
  {
    name: "New Patient",
    icon: <QueueIcon />,
    url: "/newpatient",
  },
  {
    name: "Waiting Room",
    icon: <AirlineSeatLegroomExtraIcon />,
    url: "/waiting",
  },
  {
    name: "Search",
    icon: <PeopleAltIcon />,
    url: "/search",
  },
];
