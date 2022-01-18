import React, { useState, useEffect } from "react";

import {useHistory} from "react-router-dom"
import MessageDialog from "../components/MessageDialog"

const Home = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const history = useHistory()

    useEffect(() => {
     setOpenDialog(true)
    }, [])
  
    const handleConfirm = () => {
        setOpenDialog(false);
        history.push("/newpatient")
      };
  

    return (
        <MessageDialog
        cancelBtn={false}
        confirm={handleConfirm}
        openDialog={openDialog}
        message="Enjoy the current functionality."
        setOpenDialog={setOpenDialog}
        title="APP UNDER CONSTRUCTION"
      />

    )
}

export default Home
