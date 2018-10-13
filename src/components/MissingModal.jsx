import React, { Component } from 'react'
import { hideComplainAction } from "../store/actions/actions";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
class ComplaintModal extends Component {
  constructor(props){
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }
  onCloseModal(){
    this.props.hideComplain()
  }
  render() {
    return (
      <div>
        <Modal open={this.props.showComplainModal} onClose={this.onCloseModal} little><br /><br />
        <div className='log' style={{height:400,overflowY:'auto',overflowX:'auto'}}>
            {this.props.Complain && <div className="wrapper">
                <h1 className='text-info' style={{textAlign:'center',textDecoration:'underline'}}>{this.props.Complain.title}</h1>
<hr className='style16'/>
        <h3>Applicant Name: <b>{this.props.Complain.name}</b></h3>
        <h3>Type of Complain: <b>{this.props.Complain.typeOfComplain}</b></h3>
        <h3>City: <b>{this.props.Complain.city}</b></h3>
        <h3>Address: <b><address>{this.props.Complain.address}</address></b></h3>
        <blockquote><h3>Description:</h3> <b className='text-muted'>{this.props.Complain.description}</b></blockquote>
        <h3>Status of Application: <b>{this.props.Complain.status}</b></h3>
        <h3>NIC# of Applicant: <b>{this.props.Complain.NIC}</b></h3>
        <h3>Contact Info: <b>{this.props.Complain.contact}</b></h3>
      </div>}
      </div>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state){
  return({
    showComplainModal:state.rootReducer.showComplainModal,
    Complain:state.rootReducer.showComplain
  })
}

function mapActionsToProps(dispatch){
  return({
      
  })
}
export default connect(mapStateToProps,mapActionsToProps)(ComplaintModal)