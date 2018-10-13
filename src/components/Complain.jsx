import React, { Component } from 'react'
import Navbar from './Navbar'
import firebase from 'firebase'
import { insertComplaint,showComplainAction,deleteComplainAction } from "../store/actions/actions";
import ComplainModal from './ComplainModal'
import { connect } from "react-redux";
import Loading from './load.gif'
class Complain extends Component {
  constructor(props){
    super(props)
    this.initialState={
      name:'',
      NIC:0,
      contact:'',
      address:'',
      city:'',
      description:'',
      typeOfComplain:'default',
      title:'',
      status:'Pending',
      showLoading:false,
      complainId:'complain' + Math.round(Math.random() * 100000)
    }
    this.state={
      ...this.initialState
    }
    this.handleChange=this.handleChange.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleRemove=this.handleRemove.bind(this)
  }
  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  componentDidMount(){
    if (this.props.isLoggedIn) {
      let firebaseRef = firebase.database().ref('usercomplaints').child(this.props.uid)
      firebaseRef.once('value', snap => {
        const posts = snap.val()
        if(posts.length!==0){
          posts.forEach(post => {
            let dataRef = firebase.database().ref('complaints').child(post)
            dataRef.once('value', snapshot => {
              let complain = snapshot.val()
              this.props.insertComplaint(complain)
            })
          })
        }
      })
    }
  }
  handleSubmit(e){
    e.preventDefault()
    this.setState({
      showLoading:true
    })
    let sendData = this.state
    delete sendData.showLoading
    let firebaseRef = firebase.database().ref('complaints').child(this.state.complainId)
    firebaseRef.set(sendData).then(() => {
      let userRef = firebase.database().ref('usercomplaints').child(this.props.uid)
      userRef.once('value', (snap) => {
        const data = snap.val()
        if (data) {
          let oldPosts = data
          oldPosts.push(this.state.complainId)
          userRef.set(oldPosts).then(() => {
            this.props.insertComplaint(sendData)
            this.setState({
              ...this.initialState
            })
          })
        }
        else {
          let newUserPosts = []
          newUserPosts.push(this.state.complainId)
          userRef.set(newUserPosts).then(() => {
            this.props.insertComplaint(sendData)
            this.setState({
              ...this.initialState
            })
          })
        }
      })

    }).catch(err => console.error(err))
  }
  handleRemove(e){
    e.preventDefault()
    let complainId = this.props.Complains[e.target.id].complainId
    let firebaseRef = firebase.database().ref('complaints').child(complainId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('usercomplaints').child(this.props.uid)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==complainId
        })
        userRef.set(updatedData).then(() => {
          this.props.deleteComplain(complainId)
        })
      }).catch(err => console.error(err))
    })
  }
  render() {
    return (
      <div>
        <Navbar history={this.props.history} /><br /><br /><br /><br />
        {this.props.isLoggedIn && <div className='container' style={{ marginTop: 15 }}>
          <div className="row">
            <div className="col-md-6 card" style={{ padding: 20 }}>
              <h2 className='text-center'>COMPLAIN</h2>
              <form className="form-horizontal" onSubmit={e => e.preventDefault()} method='post'>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="title">Complain Title:</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} value={this.state.title} type="text" autoComplete='off' autoFocus={true} className="form-control" id="title" placeholder="Complain Title" name="title" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="name">YOUR NAME:</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} value={this.state.name} type="text" autoComplete='off' className="form-control" id="name" placeholder="Your Name" name="name" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="NIC">NIC#</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} value={this.state.NIC} type="number" minLength={13} min='1000000000000' max={9999999999999} maxLength={13} className="form-control" id="pwd" placeholder="Enter Your NIC#" name="NIC" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="address">Address</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.address} autoComplete='off' className="form-control" id="name" placeholder="Enter Address" name="address" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="city">City</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.city} autoComplete='off' className="form-control" id="name" placeholder="Enter City" name="city" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="contact">Contact Number</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.contact} autoComplete='off' className="form-control" id="name" placeholder="Contact#" name="contact" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="typeOfComplain">Type Of Complain</label>
                  <div className="col-sm-10">
                    <select onChange={this.handleChange} name='typeOfComplain' className='form-control'>
                      <option value="default">** Select Complain Type **</option>
                      <option value="Road Rage">Road Rage</option>
                      <option value="Mentally torture">Mentally torture</option>
                      <option value="Physically torture">Physically torture</option>
                      <option value="Blackguardism">Blackguardism</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="description">Description</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" rows="5" value={this.state.description} onChange={this.handleChange} style={{ resize: 'none' }} name='description' placeholder='Description of Complain'></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                   {!this.state.showLoading && <button type="submit" className="btn btn-primary pull-right" onClick={this.handleSubmit}>Submit</button>}
                   {this.state.showLoading && <button type='submit' className='btn btn-info pull-right'><img style={{width:"30%"}} src={Loading} alt="NOt found"/></button>}
                  </div>
                </div>
              
              </form>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
            <h2 className='text-info' style={{ textAlign: 'center', textDecoration: 'underline' }}>COMPLAINS</h2>
            <ul className="list-group">
            {this.props.Complains.map((complain,index)=>{
              return  <div 
              key={index}>
                 <li className='list-group-item list-group-item-info'>
               <a href="#" id={index} onClick={e=>this.props.showComplain(e.target.id)}>{complain.title}</a>
               <span className='pull-right'>
               <button id={index} onClick={this.handleRemove} className='btn btn-xs btn-danger'> Delete</button>
               </span>
               </li><br/>
              </div>
            })}
            </ul>
            </div>
          </div>
          <ComplainModal/>
        </div>}
        {!this.props.isLoggedIn && <div>
          <br/><br/><br/>
          <h2>User Must Login...</h2>
        </div>}
      </div>
    )
  }
}
function mapStateToProps(state){
  return({
      isLoggedIn:state.rootReducer.isLoggedIn,
      Complains:state.rootReducer.complains,
      uid:state.rootReducer.uid
  })
}

function mapActionsToProps(dispatch){
  return({
    insertComplaint:(comp)=>{
        dispatch(insertComplaint(comp))
      },
      showComplain:(complainIndex)=>{
        dispatch(showComplainAction(complainIndex))
      },
      deleteComplain:(complainId)=>{
        dispatch(deleteComplainAction(complainId))
      }
  })
}
export default connect(mapStateToProps,mapActionsToProps)(Complain)