import React,{Component} from 'react';
import {connect} from "react-redux";

import Aux from "../Aux_/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar.js";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerClosed=()=>{
        this.setState({
            showSideDrawer:false
        });
    }

    menuBtnclickHandler=()=>{
        this.setState((prevState)=>{
            return {
                showSideDrawer:!prevState.showSideDrawer
            };
        });
    }

    render(){
        return(
            <Aux>
            <Toolbar menuBtnClicked={this.menuBtnclickHandler} isAuth={this.props.isAuthenticated}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosed} isAuth={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                {this.props.children} 
            </main>
            </Aux>
        );
    }
}

const mapStatetoProps = state =>{
    return{
        isAuthenticated:state.auth.token !== null,        
    }
}


export default connect(mapStatetoProps,null)(Layout);