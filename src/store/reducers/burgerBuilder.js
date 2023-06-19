import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const intialState = {
    ingredients: null,
    totalPrice:4,
    error:false,
    building:false,
};

const INGREDIENTS_PRICES={
    salad:0.5,
    bacon:0.7,
    cheese:1.2,
    meat:1.5
}
const addIngredient = (state,action)=>{
    
    const updatedIngredient = {[action.ingredientName]:state.ingredients[action.ingredientName]+1};
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    
    const updatedState = {
        ingredients:updatedIngredients,
        totalPrice:state.totalPrice+INGREDIENTS_PRICES[action.ingredientName],
        building:true,
    }

    return updateObject(state,updatedState);
}

const removeIngredient = (state,action)=>{
    const updatedIng = {[action.ingredientName]:state.ingredients[action.ingredientName]-1};
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    
    const updatedSt = {
        ingredients:updatedIngs,
        totalPrice:state.totalPrice-INGREDIENTS_PRICES[action.ingredientName],
        building:true,
    }

    return updateObject(state,updatedSt);
}
const setIngredients = (state,action)=>{
    return updateObject(state,
        {
            ingredients:action.ingredients,
            totalPrice:4,
            error:false,
            building:false,        
        });
}

const fetchIngredientFailed = (state,action)=>{
    return updateObject(state,{
        error:true,
    });
}

const reducer = (state=intialState,action)=>{
    switch(action.type){
        case(actionTypes.ADD_INGREDIENT): return addIngredient(state,action)
        case(actionTypes.REMOVE_INGREDIENT): return removeIngredient(state,action)
        case(actionTypes.SET_INGREDIENTS): return setIngredients(state,action)
        case(actionTypes.FETCH_INGREDIENT_FAILED): return fetchIngredientFailed(state,action)
        default: return state;
    }
}
export default reducer;