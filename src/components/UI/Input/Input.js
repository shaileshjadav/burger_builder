import React from "react";

import classes from "./Input.css";

const Input = (props)=>{
    let inputElement =null;
    const inputClasses = [classes.InputElement];

    if(props.inValid && props.shouldValidate && props.isTouched){
        inputClasses.push(classes.Invalid); 
    }
    switch(props.elementType){
        case("input"):
            inputElement = <input 
                            className={inputClasses.join(" ")} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed}
                        />
            break;
        case("textarea"):
            inputElement= <textarea 
                            className={inputClasses.join(" ")} 
                            {...props.elementConfig} 
                            value={props.value}  
                            onChange={props.changed}
                        />
            break;
        case("select"):
            inputElement=(
                <select
                    className={inputClasses.join(" ")} 
                    value={props.value}  
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement=<input 
                        className={inputClasses.join(" ")} 
                        {...props.elementConfig} 
                        value={props.value} 
                        onChange={props.changed}
                    />
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    )
};

export default Input;
