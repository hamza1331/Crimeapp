import React, { Component } from 'react'
import { hideCrimeAdminAction,updateReportStatusAction } from "../store/actions/actions";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import firebase from 'firebase'
import Loading from './load.gif'
class CrimeModalAdmin extends Component {
  constructor(props){
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.handleRadio=this.handleRadio.bind(this)
    this.initial={
      Pending:false,
      Accepted:false,
      Dismissed:false,
      Investigating:false,
      Trial:false,
      Rejected:false,
      showLoading:false
    }
    this.state={
      ...this.initial
    }
  }
  onCloseModal(){
    this.props.hideCrime()
  }
  componentDidMount(){
      this.setState({
        [this.props.Crime.status]:true,
      })
  }
  handleRadio(e){
  this.setState({showLoading:true})
    let status = e.target.value
    let firebaseRef = firebase.database().ref('crimes').child(this.props.Crime.crimeId)
    let data = this.props.Crime
    data.status = status
      firebaseRef.set(data).then(()=>{
        this.setState({
          ...this.initial
        })
        this.setState({
          [status]:true
        })
        let updateDetails = {}
        updateDetails.updateIndex=this.props.index
        updateDetails.status=status
        this.props.updateReportStatus(updateDetails)
    }).catch(err=>console.error(err))
    
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
        <h3>Contact Info: <b>{this.props.Crime.contact}</b></h3><br/><br/><br/>
        {!this.state.showLoading&&<div className="well well-sm text-center">
        <h3>UPDATE CASE STATUS</h3>
      <div className="dlk-radio btn-group">
	    <label className="btn btn-success">
	        <input onChange={this.handleRadio} id='0' name="choices[1]" checked={this.state.Pending}  className="form-control" type="radio" value="Pending"/>
	       <i className="fa fa-times glyphicon glyphicon-time"></i> Pending
	   </label>
	   <label className="btn btn-default">
	       <input onChange={this.handleRadio} id='1' name="choices[1]" className="form-control" checked={this.state.Accepted} type="radio" value="Accepted"/>
	       <i className="fa fa-times glyphicon glyphicon-ok"></i> Accepted
       </label>
	   <label className="btn btn-info">
	       <input onChange={this.handleRadio} id='2' name="choices[1]" className="form-control" checked={this.state.Investigating} type="radio" value="Investigating"/>
	       <i className="fa fa-times glyphicon glyphicon-search"></i> Investigating
       </label>
	   <label className="btn btn-warning">
	       <input onChange={this.handleRadio} id='3' name="choices[1]" className="form-control" checked={this.state.Trial} type="radio" value="Trial"/>
	       <i className="fa fa-times glyphicon glyphicon-pencil"></i> Under Trial
       </label>
       	   <label className="btn btn-danger">
	       <input onChange={this.handleRadio} id='4' name="choices[1]" className="form-control" checked={this.state.Dismissed} type="radio" value="Dismissed"/>
	       <i className="fa fa-times glyphicon glyphicon-saved"></i> Dismissed
       </label>
       	   <label className="btn btn-danger">
	       <input onChange={this.handleRadio} id='5' name="choices[1]" className="form-control" type="radio" checked={this.state.Rejected} value="Rejected"/>
	       <i className="fa fa-times glyphicon glyphicon-remove"></i> Rejected
       </label>
    </div>
  </div>}
  {this.state.showLoading&&<div><center><img style={{width:'4.5em'}} src={Loading} alt="NOt found"/></center></div>}      
      </div>}

      </div>
        </Modal>

      </div>
    )
  }
}
function mapStateToProps(state){
  return({
      showCrimeModal:state.admin.showCrimeModal
  })
}

function mapActionsToProps(dispatch){
  return({
      hideCrime:()=>{
        dispatch(hideCrimeAdminAction())
      },
      updateReportStatus:(updateDetails)=>{
        dispatch(updateReportStatusAction(updateDetails))
      }
  })
}
export default connect(mapStateToProps,mapActionsToProps)(CrimeModalAdmin)