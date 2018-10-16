import React, { Component } from 'react'
import { Carousel } from "react-bootstrap";
import { hideMissingAdminAction,updateMissingStatusAction} from "../store/actions/actions";
import { connect } from "react-redux";
import firebase from 'firebase'
import Modal from "react-responsive-modal";
import Loading from './load.gif'
class MissngModalAdmin extends Component {
  constructor(props) {
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
  onCloseModal() {
    this.props.hideMissing()
  }
  componentDidMount(){
    this.setState({
      [this.props.Missing.status]:true,
    })
}
handleRadio(e){
  this.setState({
    showLoading:true
  })
  let status = e.target.value
  let firebaseRef=firebase.database().ref('missing').child(this.props.Missing.missingId)
  let data = this.props.Missing
  data.status=status
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
    this.props.updateMissingStatus(updateDetails)
  })
}
  render() {
    return (
      <div>
        <Modal open={this.props.showMissingModal} onClose={this.onCloseModal} little><br /><br />
          <div className='log' style={{ height: 400, overflowY: 'auto', overflowX: 'auto' }}>
            {this.props.Missing && <div className="wrapper">
              <h1 className='text-info' style={{ textAlign: 'center', textDecoration: 'underline' }}>{this.props.Missing.title}</h1>
              {this.props.Missing.downlaodUrls && <Carousel autoPlay={true}>
                {this.props.Missing.downlaodUrls.map((image, index) => {
                  return <Carousel.Item key={index}>
                    <a href={image} target='_blank'> <img className='img-responsive' height={200} alt="900x500" src={image} /></a>
                  </Carousel.Item>
                })}
              </Carousel>}
              <hr className='style16' />
              <h3>Applicant Name: <b>{this.props.Missing.name}</b></h3>
              <h3>Missing Person Name: <b>{this.props.Missing.missingpersonname}</b></h3>
              <h3>Missing Person Height: <b>{this.props.Missing.missingpersonheight} cm</b></h3>
              <h3>Missing Person Identification Mark: <b>{this.props.Missing.anyotherIdentification}</b></h3>
              <h3>Place of Missing: <b><address>{this.props.Missing.placeofmissing}</address></b></h3>
              <h3>City: <b>{this.props.Missing.city}</b></h3>
              <h3>Relation with Missing Person: <b>{this.props.Missing.relationwiththeperson}</b></h3>
              <h3>Contact Info: <b>{this.props.Missing.contactiffound}</b></h3>
              <h3>Status of Application: <b>{this.props.Missing.status}</b></h3>
              <h3>NIC# of Applicant: <b>{this.props.Missing.NIC}</b></h3><br/><br/><br/>
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
function mapStateToProps(state) {
  return ({
    showMissingModal:state.admin.showMissingModal
  })
}

function mapActionsToProps(dispatch) {
  return ({
    hideMissing:()=>{
      dispatch(hideMissingAdminAction())
    },
    updateMissingStatus:(updateDetails)=>{
      dispatch(updateMissingStatusAction(updateDetails))
    }
  })
}
export default connect(mapStateToProps, mapActionsToProps)(MissngModalAdmin)