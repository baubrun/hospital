import React, {useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./css/theme";
import NavBar from "./components/NavBar"
import CssBaseline from '@material-ui/core/CssBaseline';


import PatientFormContainer from "./components/patient/patientForm/PatientFormContainer";
import Search from "./components/patient/Search";
import NotFound from "./views/NotFound";
import Home from "./views/Home";
import WaitingRoom from "./components/patient/WaitingRoom"
import { listRooms } from "./redux/roomSlice";


const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listRooms())
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/newpatient" component={PatientFormContainer} />
        <Route exact={true} path="/search" component={Search} />
        <Route exact={true} path="/waiting" component={WaitingRoom}/>
        <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
