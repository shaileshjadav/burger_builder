import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import Classes from "./Auth.css";

import {connect} from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends Component{
    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email',
                },
                value:'',
                validation:{
                    required:true,
                    
                },
                valid:false,
                touched:false,
            }, 
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                },
                valid:false,
                touched:false,
            },
            
            
        },
        isFormValid:false,
        loading:false,
        isSignup:true
    }

    inputChangeHandler = (event,controlName)=>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true,

            }
        }
        this.setState({controls:updatedControls});
    }

    checkValidity(value,rules){
        let isValid = true;
        if(!rules){ return true; }
        if(rules.required){
             isValid = value.trim()!=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length>=rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid = value.length<=rules.maxLength && isValid
        }
        return isValid;
    }
    submitHandler = (event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    swithAuthMethod=()=>{
        this.setState(prevState=>{
            return{
                isSignup:!prevState.isSignup
            }
        })
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!=='/'){
            this.props.setAuthRedirectPath();
        }
    }
    render(){
        let formElementsArr=[];
        for(let key in this.state.controls){
            formElementsArr.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = (
            formElementsArr.map(formElement=>(
                <Input 
                    changed ={(event)=>this.inputChangeHandler(event,formElement.id)}
                    key={formElement.id} 
                    elementType={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    inValid={!formElement.config.valid}
                    isTouched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                />
            ))
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (<p>{this.props.error.message}</p>);
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
       
        return(
            <div className={Classes.AuthContainer}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button> 
                </form>
                <Button btnType="Danger" clicked={this.swithAuthMethod}>Switch to {this.state.isSignup?"SIGNIN":'SIGNUP'}</Button>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token!==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        setAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath("/"))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);