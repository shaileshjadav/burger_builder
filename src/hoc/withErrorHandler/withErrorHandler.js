import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux_/Aux";

const withErrorHandler=(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        }
        componentDidMount(){
            axios.interceptors.response.use(req=>{
                this.setState({error:null});
                return req;
            }) 
   
            axios.interceptors.response.use(res=>res ,error=>{
                this.setState({error:error})
            })
        }
        confirmedErrorHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return(props)=>{
                return (
                    <Aux>
                        <Modal 
                        show={this.state.error}
                        clicked={this.confirmedErrorHandler}
                        >
                        {this.state.error ? this.state.error.message:null}
                        </Modal>
                        <WrappedComponent {...this.props}/>
                    </Aux>
                )
            }
        }
        
    }
    
}
export default withErrorHandler;