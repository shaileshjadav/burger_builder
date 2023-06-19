import React, {Component} from "react";
import Aux from "../../hoc/Aux_/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";

class BurgerBuider extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }

    // or 
    state={
        purchasable:false,
        purchasing:false,
            
    }
    componentDidMount(){
        this.props.onInitIngredients()
    }
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push('/auth'); 
        }
        
    }
    updatePurachaseState=(ingredients)=>{
        const sum= Object.keys(ingredients)
                .map(igKey=>{
                    return ingredients[igKey];
                })
                .reduce((sum,el)=>{
                    return sum+el;
                },0);
        return sum>0;
    }
    


    handleModalClose=()=>{
        this.setState({
            purchasing:false
        })
    }

    handlePurchaseContinue=()=>{
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }
    render(){
        const disabledInfo={
            ...this.props.ings
        }

        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        //{salad:true, meat:false ,,, }
        let burger=this.props.error?<p>Ingredient can not be loaded!</p>:<Spinner/>;
       
        let orderSummary=null;
        if(this.props.ings){
            burger=(<Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabledInfo={disabledInfo}
                    price={this.props.price} 
                    purchasable={this.updatePurachaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </Aux>)
            orderSummary=(<OrderSummary 
            ingredients={this.props.ings}
            purchaseCancel={this.handleModalClose }
            purchaseContinue={this.handlePurchaseContinue}
            price={this.props.price.toFixed(2)}
        />)
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.handleModalClose}>
                    {orderSummary}
                    </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token!==null
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onIngredientAdded:(ignName)=> dispatch(actions.addIngredient(ignName)),
        onIngredientRemoved:(ignName)=>dispatch(actions.removeIngredient(ignName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuider);

