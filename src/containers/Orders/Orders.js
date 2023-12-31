import React,{Component} from "react";
import {connect} from "react-redux";

import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders = <Spinner/>;
        if(!this.props.loading){
            orders = (
                this.props.orders.map(order=>(
                    <Order 
                        key={order.id} 
                        ingredients = {order.ingredients}
                        price = {order.price}
                    />    
                ))
            );

        }
        return(
            <div>
                {orders}
            </div>
            
        );
    }
}
const mapStatetoProps = state =>{
    return{
        loading:state.order.loading,
        orders:state.order.orders,
        token:state.auth.token,
        userId:state.auth.userId,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders: (token,userId)=>dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Orders);