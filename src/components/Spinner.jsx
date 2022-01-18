import React from 'react'
import Loader from "react-loader-spinner";

const style = {
    container: {position: "relative"},
    loader: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
}

const Spinner = () => {
  return (
    <div style={style.container}>
        <div style={style.loader}>
            <Loader
            type="ThreeDots"
            color="#c51162"
            height={250}
            width={250}
            />
        </div>
    </div>
  );
};


export default Spinner