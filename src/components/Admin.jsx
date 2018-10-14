import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux';
class Admin extends Component {
  render() {
    return (
      <div>
          <Navbar/>
          <br/>
          <br/>
        {!this.props.isLoggedIn&& <h1 className='container' style={{marginTop:screen.height/10}}>User Must Login</h1>}
        {this.props.isLoggedIn&& <h1 className='container' style={{marginTop:screen.height/10}}>HELLO FROM ADMIN PANEL</h1>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    isLoggedIn:state.admin.adminLoggedIn
  })
}

function mapActionsToProps(dispatch) {
  return ({
    
  })
}
export default connect(mapStateToProps,mapActionsToProps)(Admin)