import React, { Component } from 'react'
import Navbar from './Navbar'
import { insertCrimeAction, showCrimeAction, deleteCrimeAction } from "../store/actions/actions";
import { connect } from "react-redux";
import firebase from 'firebase'
import CrimeModal from './CrimeModal'
import Loading from './load.gif'
class Crimereport extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      name: '',
      NIC: 0,
      contact: '',
      address: '',
      city: '',
      victim: '',
      description: '',
      typeOfCrime: 'default',
      title: '',
      status: 'Pending',
      showLoading:false,
      crimeId:'crime' + Math.round(Math.random() * 100000)
    }
    this.state = {
      ...this.initialState
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.showDetails = this.showDetails.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount() {
    if (this.props.isLoggedIn&&this.props.Crimes.length===0) {
      let firebaseRef = firebase.database().ref('userposts').child(this.props.uid)
      firebaseRef.once('value', snap => {
        const posts = snap.val()
        posts.forEach(post => {
          let dataRef = firebase.database().ref('crimes').child(post)
          dataRef.once('value', snapshot => {
            let crime = snapshot.val()
            console.log(crime)
            this.props.insertCrime(crime)
          })
        })
      })
    }
  }
  showDetails(e) {
    e.preventDefault()
    this.props.showCrime(e.target.id)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      showLoading:true
    })
    let firebaseRef = firebase.database().ref('crimes').child(this.state.crimeId)
    let sendData = this.state
    delete sendData.showLoading
    sendData.userId=this.props.uid
    firebaseRef.set(sendData).then(() => {
      let userRef = firebase.database().ref('userposts').child(this.props.uid)
      userRef.once('value', (snap) => {
        const data = snap.val()
        if (data) {
          let oldPosts = data
          oldPosts.push(this.state.crimeId)
          userRef.set(oldPosts).then(() => {
            this.props.insertCrime(sendData)
            this.setState({
              ...this.initialState
            })
          })
        }
        else {
          let newUserPosts = []
          newUserPosts.push(this.state.crimeId)
          userRef.set(newUserPosts).then(() => {
            this.props.insertCrime(this.state)
            this.setState({
              ...this.initialState
            })
          })
        }
      })

    }).catch(err => console.error(err))
  }
  handleRemove(e) {
    e.preventDefault()
    let crimeId = this.props.Crimes[e.target.id].crimeId
    let firebaseRef = firebase.database().ref('crimes').child(crimeId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('userposts').child(this.props.uid)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==crimeId
        })
        userRef.set(updatedData).then(() => {
          this.props.deleteCrime(crimeId)
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
              <h2 className='text-center'>CRIME REPORT</h2>
              <form className="form-horizontal" onSubmit={e => e.preventDefault()} method='post'>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="title">Crime Title:</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} value={this.state.title} type="text" autoComplete='off' autoFocus={true} className="form-control" id="title" placeholder="Crime Title" name="title" />
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
                    <input type="text" onChange={this.handleChange} value={this.state.address} autoComplete='off' className="form-control" id="name" placeholder="Enter Address of Crime" name="address" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="city">City</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.city} autoComplete='off' className="form-control" id="name" placeholder="Enter City" name="city" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="victim">Victim Name</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.victim} autoComplete='off' className="form-control" id="name" placeholder="Enter Victim Name" name="victim" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="contact">Contact Number</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.contact} autoComplete='off' className="form-control" id="name" placeholder="Contact#" name="contact" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="typeOfCrime">Type Of Crime</label>
                  <div className="col-sm-10">
                    <select onChange={this.handleChange} name='typeOfCrime' className='form-control'>
                      <option value="default">** Select Crime Type **</option>
                      <option value="Kidnapping">Kidnapping</option>
                      <option value="Murder">Murder</option>
                      <option value="Threat">Threat</option>
                      <option value="Rape">Rape</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="description">Description</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" rows="5" value={this.state.description} onChange={this.handleChange} style={{ resize: 'none' }} name='description' placeholder='Description of Crime'></textarea>
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
              <h2 className='text-info' style={{ textAlign: 'center', textDecoration: 'underline' }}>CRIMES</h2>
              <ul className="list-group">
                {this.props.Crimes.length>0 && this.props.Crimes.map((crime, index) => {
                  return <div
                    key={index}>
                    <li
                      className='list-group-item list-group-item-info'>
                      <a href="#crm" id={index} onClick={this.showDetails}>{crime.title}</a>
                      <span className='pull-right'>
                        <button id={index} onClick={this.handleRemove} className='btn btn-xs btn-danger'> Delete</button>
                      </span>
                    </li><br />
                  </div>
                })}
              </ul>
            </div>
          </div>
          <CrimeModal />
        </div>}
        {!this.props.isLoggedIn && <div><br /><br /><br />
          <h2>User must login...</h2>

        </div>}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return ({
    isLoggedIn: state.rootReducer.isLoggedIn,
    Crimes: state.rootReducer.crimes,
    uid: state.rootReducer.uid
  })
}

function mapActionsToProps(dispatch) {
  return ({
    insertCrime: (crime) => {
      dispatch(insertCrimeAction(crime))
    },
    showCrime: (crimeIndex) => {
      dispatch(showCrimeAction(crimeIndex))
    },
    deleteCrime: (crimeId) => {
      dispatch(deleteCrimeAction(crimeId))
    }
  })
}
export default connect(mapStateToProps, mapActionsToProps)(Crimereport)
