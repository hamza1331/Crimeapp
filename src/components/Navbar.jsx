import React, { Component } from 'react'
import { connect } from "react-redux";
import { LogoutAction,LoginAction} from "../store/actions/actions";
import firebase from 'firebase'
class Navbar extends Component {
    constructor(props){
        super(props)
        this.handleHomeLink = this.handleHomeLink.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleDashboardLink = this.handleDashboardLink.bind(this)

    }
componentWillMount(){
     // Initialize Firebase
  if(!firebase.apps.length){
  var config = {
    apiKey: "AIzaSyCLYgIUDgdXhJjHKAUbDQuSdlUgZzfd3dc",
    authDomain: "crimepract.firebaseapp.com",
    databaseURL: "https://crimepract.firebaseio.com",
    projectId: "crimepract",
    storageBucket: "crimepract.appspot.com",
    messagingSenderId: "711920313008"
  };
  firebase.initializeApp(config);
  }
}
handleDashboardLink(e){
    e.preventDefault()
    this.props.history.push('/Dashboard')
}
    handleLogout(e){
        e.preventDefault()
        firebase.auth().signOut().then(()=>{            
            this.props.Logout()
            this.props.history.push('/')
        }).catch(err=>alert(err))
    }
    handleHomeLink(e){
        if(window.location.pathname==='/'){
            e.preventDefault()
            return
        }
        this.props.history.push('/')
    }
    googleSignIn()
    {
   const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=>{
           var token = result.credential.accessToken;
           var user = result.user;
           this.props.Login(user.displayName)
            this.props.history.push('/Dashboard')
        }).catch(function(error) {
           var errorCode = error.code;
           var errorMessage = error.message;
         console.log(error.code)
           console.log(error.message)
        });
    }
  render() {
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a onClick={this.handleHomeLink} className="navbar-brand"><h3 style={{display:'inline',fontSize:30}}>My APP</h3></a>
          </div>
          <ul className="nav navbar-nav navbar-right">
          {this.props.isLoggedIn && window.location.pathname!=='/Dashboard'&& <li><a href="#" onClick={this.handleDashboardLink}>Dashboard</a></li>}
            {(this.props.isLoggedIn) && <button onClick={this.handleLogout} className="btn btn-danger navbar-btn">LOG OUT</button>}
            {(!this.props.isLoggedIn) && <button onClick={()=>{this.googleSignIn()}} className="btn btn-info navbar-btn">LOGIN</button>}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn
    })
}

function mapActionsToProps(dispatch){
    return({
        Logout:()=>{
            dispatch(LogoutAction())
        },
        Login:(userName)=>{
            dispatch(LoginAction(userName))
        }
    })
}
export default connect(mapStateToProps,mapActionsToProps)(Navbar);
