import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from './Navbar'
import './Home.css'
class Home extends Component {
    render() {
        return(
            <div>
           <Navbar history={this.props.history}/>
            <br/><br/><br/>
            <h2>Hello from APP...</h2>
            <h2>Missing Persons Goes here...</h2>
            </div>
        )
        // )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn
    })
}

function mapActionsToProps(dispatch){
    return({
        
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Home);
