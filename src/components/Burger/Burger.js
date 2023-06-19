import React from "react";
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
const burger = (props)=>{
    let TransformedIngredients=Object.keys(props.ingredients)
            .map(igKey =>{
                return [...Array(props.ingredients[igKey])].map((_, i)=>{
                    return <BurgerIngredient key={igKey+i} type={igKey} />
                });
            })
            .reduce((accumalator, currentVal)=>{
                return accumalator.concat(currentVal);
            },[]);
            
    if(TransformedIngredients.length===0){
        TransformedIngredients=<p>Please start adding ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {TransformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}
export default burger;