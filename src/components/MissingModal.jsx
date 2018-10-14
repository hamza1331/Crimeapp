import React, { Component } from 'react'
import { Carousel } from "react-bootstrap";
import { hideMissingAction} from "../store/actions/actions";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
class MissngModal extends Component {
  constructor(props) {
    super(props)
    this.onCloseModal = this.onCloseModal.bind(this)
  }
  onCloseModal() {
    this.props.hideMissing()
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
              <h3>NIC# of Applicant: <b>{this.props.Missing.NIC}</b></h3>
            </div>}
          </div>
        </Modal>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return ({
    Missing:state.rootReducer.showMissing,
    showMissingModal:state.rootReducer.showMissingModal
  })
}

function mapActionsToProps(dispatch) {
  return ({
    hideMissing:()=>{
      dispatch(hideMissingAction())
    }
  })
}
export default connect(mapStateToProps, mapActionsToProps)(MissngModal)