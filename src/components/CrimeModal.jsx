import React, { Component } from 'react'
import { hideCrimeAction } from "../store/actions/actions";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
class CrimeModal extends Component {
  constructor(props){
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }
  onCloseModal(){
    this.props.hideCrime()
  }
  render() {
    return (
      <div>
        <Modal open={this.props.showCrimeModal} onClose={this.onCloseModal} little><br /><br />
        <div className='log' style={{height:400,overflowY:'auto',overflowX:'auto'}}>
            {this.props.Crime && <div className="wrapper">
                <h1 className='text-info' style={{textAlign:'center',textDecoration:'underline'}}>{this.props.Crime.title}</h1>
<hr className='style16'/>
        <h3>Applicant Name: <b>{this.props.Crime.name}</b></h3>
        <h3>Type of Crime: <b>{this.props.Crime.typeOfCrime}</b></h3>
        <h3>Victim of Crime: <b>{this.props.Crime.victim}</b></h3>
        <h3>City: <b>{this.props.Crime.city}</b></h3>
        <h3>Address: <b><address>{this.props.Crime.address}</address></b></h3>
        <blockquote><h3>Description:</h3> <b className='text-muted'>{this.props.Crime.description}</b></blockquote>
        <h3>Status of Application: <b>{this.props.Crime.status}</b></h3>
        <h3>NIC# of Applicant: <b>{this.props.Crime.NIC}</b></h3>
        <h3>Contact Info: <b>{this.props.Crime.contact}</b></h3>
      </div>}
      </div>
        </Modal>

      </div>
    )
  }
}
function mapStateToProps(state){
  return({
      Crime:state.rootReducer.showCrime,
      showCrimeModal:state.rootReducer.showCrimeModal
  })
}

function mapActionsToProps(dispatch){
  return({
      hideCrime:()=>{
        dispatch(hideCrimeAction())
      }
  })
}
export default connect(mapStateToProps,mapActionsToProps)(CrimeModal)