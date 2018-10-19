import React, { Component } from 'react'
import './AdminLogin.css'
import firebase from 'firebase'
export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.navigate = this.navigate.bind(this)
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
  navigate(e) {
    e.preventDefault()
    if (e.target.name === 'admin') {
      this.props.history.push('/adminLogin')
    }
    else if (e.target.name === 'visitor') {
      this.props.history.push('/home')
    }
  }
  render() {
    return (
      //       <div>
      //         <div className="containerr">

      //   <h2>WELCOME TO CRIME APP</h2>

      //   <form>
      //     <div className="group">      
      //           <div className='text-center'><button name='admin' onClick={this.navigate} className="btn btn-xlarge btn-info">ENTER AS ADMIN</button></div>
      //     </div>

      //         <div className="group">      
      //           <div className='text-center'><button name='visitor' onClick={this.navigate} className="btn btn-xlarge btn-primary">ENTER AS VISITOR</button></div>
      //     </div>

      //   </form>

      // </div>
      //       </div>
      <div>
        <div className="jumbotronn">
          <div className="containerr">
            <span className="glyphicon glyphicon-list-alt"></span>
            <h2 className='head2'>CRIME APP</h2>
            <div className="boxx">
            <div className='text-center'><button name='admin' onClick={this.navigate} className="btn btn-xlarge btn-warning">ENTER AS ADMIN</button></div><br/>
            <div className='text-center'><button name='visitor' onClick={this.navigate} className="btn btn-xlarge btn-primary">ENTER AS VISITOR</button></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
