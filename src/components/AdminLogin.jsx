import React, { Component } from 'react'
import './AdminLogin.css'
import firebase from 'firebase'
import Loading from './load.gif'
import { adminLoginAction } from "../store/actions/actions";
import { connect } from "react-redux";
class AdminLogin extends Component {
    constructor(props){
        super(props)
        this.initial={
            email:'admin@crime.com',
            password:'abc@123',
            showLoading:false
        }
        this.state={
            ...this.initial
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    componentDidMount(){
        if(!firebase.apps.length){
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
      }
    handleChange(e){
     this.setState({
         [e.target.name]:e.target.value
     })   
    }
    handleSubmit(e){
        e.preventDefault()
        this.setState({
            showLoading:true
        })
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(()=>{
            let firebaseAdminRef = firebase.database().ref('admin')
            firebaseAdminRef.once('value',snap=>{
                let user = snap.val()
                if(this.state.email===user.email&&this.state.password===user.password){
                    this.setState({
                        ...this.initial
                    })
                    this.props.login(firebase.auth().currentUser.uid)
                    this.props.history.push('/admin')
                }
                else
                alert('Not an admin...')
            })
        }).catch(err=>{
            alert(err)
        this.setState({...this.initial})
        })
    }
    render() {
        return (
            <div>
<div className="jumbotron">
  <div className="container">
    <span className="glyphicon glyphicon-list-alt"></span>
    <h2>Admin Login</h2>
    <div className="box">
        <input name='email' onChange={this.handleChange} value={this.state.email} autoFocus='true' type="email" autoComplete='off' required={true} placeholder="email"/>
	    <input name="password" value={this.state.password} onChange={this.handleChange} type="password" required={true} placeholder="password"/>
        {!this.state.showLoading&&<button className="btn btn-warning btn-xlarge" onClick={this.handleSubmit}>LOGIN <span className="glyphicon glyphicon-ok"></span></button>}   
        {this.state.showLoading &&<button type='submit' className='btn btn-warning btn-xlarge'><img style={{width:"60%"}} src={Loading} alt="NOt found"/></button>}
         </div>
  </div>
</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({

    })
  }
  
  function mapActionsToProps(dispatch) {
    return ({
      login:(uid)=>{
          dispatch(adminLoginAction(uid))
      }
    })
  }
  export default connect(mapStateToProps,mapActionsToProps)(AdminLogin)