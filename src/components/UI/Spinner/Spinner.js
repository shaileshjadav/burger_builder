import React, { Component } from "react";
import Aux from "../../../hoc/Aux_/Aux";
import classes from "./Spinner.css";

class Modal extends Component{
    render(){
        return(
            <Aux>
                <div className={classes.Loader}></div>
            </Aux>
        );
    }
}




export default Modal;