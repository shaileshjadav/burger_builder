import React from "react";
import Classes from "./Button.css";
const Button = (props)=>(
<button
    disabled={props.disabled}
    className={[Classes.Button,Classes[props.btnType]].join(' ')}
    onClick={props.clicked}
>{props.children}</button>
)

export default Button;