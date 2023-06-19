import React,{Component} from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";

import Classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
import * as actions from "../../../store/actions/index";



class ContactData extends Component{
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            }, 
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5,
                },
                valid:false,
                touched:false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {
                            value:"fastest",
                            displayValue:"Fastest",
                        },
                        {
                            value:"cheapest",
                            displayValue:"Cheapest",
                        },
                ]
                },
                value:'fastest',
                validation:{},
                valid:true,
            },
            
        },
        isFormValid:false,
        loading:false,
    }
    inputChangeHandler = (event,inputIdentifier)=>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier]=updatedFormElement;

        let isFormValid=true;
        for(let inputIdentifier in updatedOrderForm){
            isFormValid= updatedOrderForm[inputIdentifier].valid && isFormValid;
        }
        
        this.setState({orderForm:updatedOrderForm,isFormValid:isFormValid});
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
    orderHandler = (event)=>{
        event.preventDefault();
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
       const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId,
        }

        this.props.onOrderBurger(order,this.props.token)
    }

    render(){
        let formElementsArr=[];
        for(let key in this.state.orderForm){
            formElementsArr.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }

        let form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArr.map(formElement=>(
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
                    ))}
                    <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
                </form>
        );
        if(this.props.loading){
            form = <Spinner/>;
        }
        return(
            <div className={Classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStatetoProps= state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps= dispatch =>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(ContactData);