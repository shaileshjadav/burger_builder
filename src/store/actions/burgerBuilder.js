import * as actionTypes from "./actionTypes";
import Axios from "../../axios-orders";

export const addIngredient = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  };
};

export const removeIngredient = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};
export const fetchIngredientFaild = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    Axios.get(`${process.env.REACT_APP_FIREBASE_URL}/ingredients.json`)
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientFaild());
      });
  };
};
