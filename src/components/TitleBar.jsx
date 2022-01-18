import React from 'react'
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        fontSize: "24px",
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "bolder",
        letterSpacing: "2px",
        position: "relative",
    }
  }));
  

const TitleBar = ({text}) => {
    const classes = useStyles()
    return (
        <AppBar className={classes.title}>
            {text}
        </AppBar>
    )
}

export default TitleBar
