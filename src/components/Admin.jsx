import React, { Component } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux';
import firebase from 'firebase'
import Loading from './load.gif'
import { insertComplainAdminAction,insertMissingAdminAction,insertReportAdminAction,
        deleteCrimeAdminAction,deleteComplainAdminAction,deleteMissingAdminAction,
        showComplainAdminAction,showMissingAdminAction,showCrimeAdminAction
} from "../store/actions/actions";
import MissingModal from './MissingAdminModal'
import ComplainModal from './ComplainAdminModal'
import CrimeModal from './CrimeModalAdmin'
class Admin extends Component {
  constructor(props){
    super(props)
    this.grabComplains=this.grabComplains.bind(this)
    this.grabComplains=this.grabComplains.bind(this)
    this.grabCrimes=this.grabCrimes.bind(this)
    this.handleRemoveMissing=this.handleRemoveMissing.bind(this)
    this.handleRemoveComplain=this.handleRemoveComplain.bind(this)
    this.handleRemoveCrime=this.handleRemoveCrime.bind(this)
    this.handleShowCrime=this.handleShowCrime.bind(this)
    this.handleShowMissing=this.handleShowMissing.bind(this)
    this.handleShowComplain=this.handleShowComplain.bind(this)
    this.state={
      showLoading:false,
      showDeleteLoading:false,
      Crime:{},
      Complain:{},
      Missing:{}
    }
  }
  componentDidMount(){
    if(this.props.isLoggedIn){
      if(this.props.allComplains.length===0){
        this.setState({showLoading:true})
        this.grabComplains()
      }
      if(this.props.allCrimes.length===0){
        this.grabCrimes()
      }
      if(this.props.allMissing.length===0){
        this.grabMissing()
      }
    }
  }
  handleShowCrime(e){
    e.preventDefault()
    let crime = this.props.allCrimes[e.target.id]
    this.setState({
      Crime:crime
    })
    this.props.showCrime()
  }
  handleShowComplain(e){
    e.preventDefault()
    let complain = this.props.allComplains[e.target.id]
    this.setState({
      Complain:complain
    })
    this.props.showComplain()
  }
  handleShowMissing(e){
    e.preventDefault()
    let missing = this.props.allMissing[e.target.id]
    this.setState({
      Missing:missing
    })
    this.props.showMissing()
  }
  grabComplains(){
    let firebaseRef = firebase.database().ref('complaints')
      firebaseRef.once('value',snap=>{
      snap.forEach((Key)=>{
        let dataRef = firebaseRef.child(Key.ref.key).key
        let complain = snap.child(dataRef).val()
        this.props.insertComplain(complain)
      })
    }).then(()=>{
      return
    })
  }
  grabCrimes(){
    let firebaseRef = firebase.database().ref('crimes')
      firebaseRef.once('value',snap=>{
      snap.forEach((Key)=>{
        let dataRef = firebaseRef.child(Key.ref.key).key
        let crime = snap.child(dataRef).val()
        this.props.insertCrime(crime)
      })
    }).then(()=>{
      return
    })
  }
  grabMissing(){
    let firebaseRef = firebase.database().ref('missing')
      firebaseRef.once('value',snap=>{
      snap.forEach((Key)=>{
        let dataRef = firebaseRef.child(Key.ref.key).key
        let missing = snap.child(dataRef).val()
        this.props.insertMissing(missing)
      })
    }).then(()=>{
      this.setState({showLoading:false})
      return
    })
  }
  handleRemoveMissing(e){
    e.preventDefault()
    this.setState({showDeleteLoading:true})
    let missingId = this.props.allMissing[e.target.id].missingId
    let count = this.props.allMissing[e.target.id].downlaodUrls.length
    let missing =this.props.allMissing.filter((missing)=>missing.missingId===missingId)
    let userId = missing[0].userId
    let firebaseRef = firebase.database().ref('missing').child(missingId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('usermissingper').child(userId)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==missingId
        })
        userRef.set(updatedData).then(() => {
          for(let i=0;i<count;i++){
            let imageRef = firebase.storage().ref(`missingPersons/${missingId}/${i}`)
          imageRef.delete().then(()=>{
            if(i===count-1){
              this.props.deleteMissing(missingId)
              this.setState({showDeleteLoading:false})
            }
          }).catch(err=>console.error(err))
          }
        })
      }).catch(err => console.error(err))
    })
  }
  handleRemoveComplain(e){
    e.preventDefault()
    this.setState({showDeleteLoading:true})
    let complainId = e.target.id
    let complain =this.props.allComplains.filter((complain)=>complain.complainId===complainId)
    let userId = complain[0].userId
    let firebaseRef = firebase.database().ref('complaints').child(complainId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('usercomplaints').child(userId)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==complainId
        })
        userRef.set(updatedData).then(() => {
          this.props.deleteComplain(complainId)
          this.setState({showDeleteLoading:false})
        })
      }).catch(err => console.error(err))
    })
  }
  handleRemoveCrime(e){
    e.preventDefault()
    this.setState({showDeleteLoading:true})
    let crimeId = e.target.id
    let crime =this.props.allCrimes.filter((crime)=>crime.crimeId===crimeId)
    let userId = crime[0].userId
    let firebaseRef = firebase.database().ref('crimes').child(crimeId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('userposts').child(userId)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==crimeId
        })
        userRef.set(updatedData).then(() => {
          this.props.deleteCrime(crimeId)
          this.setState({showDeleteLoading:false})
        })
      }).catch(err => console.error(err))
    })
  }
  render() {
    return (
      <div>
          <Navbar history={this.props.history}/>
          <br/>
          <br/>
        {!this.props.isLoggedIn&& <h1 className='container' style={{marginTop:screen.height/10}}>User Must Login</h1>}
        {this.props.isLoggedIn&& <div className='container' style={{marginTop:screen.height/10}}>
      {this.state.showLoading&&<div><center><img src={Loading} alt="NOt found"/></center></div>}  
      
      {this.props.allMissing.length &&<div className="container" style={{maxHeight:400,overflowY:'scroll',overflowX:'auto'}}>
      <h1 className='text-info' style={{textAlign:'center',textDecoration:'underline'}}>MISSING PERSONS</h1><br/><br/>
              <ul className='list-group'>
                {this.props.allMissing.map((missing,index)=>{
                  return <div 
                  key={missing.missingId}>
                     <li
                   style={{width:screen.width*0.8}}
                   className='list-group-item list-group-item-info'>
                   <a href="#get" id={index} onClick={this.handleShowMissing}>{missing.title}</a>
                   <span className='pull-right'>
                   {!this.state.showDeleteLoading&&<button id={index} onClick={this.handleRemoveMissing} className='btn btn-xs btn-danger'> Delete</button>}
                   {this.state.showDeleteLoading && <button id={index} className='btn btn-xs btn-danger'><img style={{width:'0.9em'}} src={Loading} alt="Not found"/></button>}
                   </span>
                   </li><br/>
                  </div>
                })}
              </ul>
            </div>}
            <br/><br/>
      {this.props.allComplains.length &&<div className="container" style={{maxHeight:400,overflowY:'scroll',overflowX:'auto'}}>
      <h1 className='text-info' style={{textAlign:'center',textDecoration:'underline'}}>COMPLAINS</h1><br/><br/>
              <ul className='list-group'>
                {this.props.allComplains.map((complain,index)=>{
                  return <div 
                  key={complain.complainId}>
                     <li
                   style={{width:screen.width*0.8}}
                   className='list-group-item list-group-item-info'>
                   <a href="#get" id={index} onClick={this.handleShowComplain}>{complain.title}</a>
                   <span className='pull-right'>
                   {!this.state.showDeleteLoading&&<button id={complain.complainId} onClick={this.handleRemoveComplain} className='btn btn-xs btn-danger'> Delete</button>}
                   {this.state.showDeleteLoading && <button id={index} className='btn btn-xs btn-danger'><img style={{width:'0.9em'}} src={Loading} alt="Not found"/></button>}
                   </span>
                   </li><br/>
                  </div>
                })}
              </ul>
            </div>}
            <br/><br/>
      {this.props.allCrimes.length &&<div className="container" style={{maxHeight:400,overflowY:'scroll',overflowX:'auto'}}>
      <h1 className='text-info' style={{textAlign:'center',textDecoration:'underline'}}>CRIME REPORTS</h1><br/><br/>
              <ul className='list-group'>
                {this.props.allCrimes.map((crime,index)=>{
                  return <div 
                  key={crime.crimeId}>
                     <li
                   style={{width:screen.width*0.8}}
                   className='list-group-item list-group-item-info'>
                   <a href="#get" id={index} onClick={this.handleShowCrime}>{crime.title}</a>
                   <span className='pull-right'>
                   {!this.state.showDeleteLoading&&<button id={crime.crimeId} onClick={this.handleRemoveCrime} className='btn btn-xs btn-danger'> Delete</button>}
                   {this.state.showDeleteLoading && <button id={index} className='btn btn-xs btn-danger'><img style={{width:'0.9em'}} src={Loading} alt="Not found"/></button>}
                   
                   </span>
                   </li><br/>
                  </div>
                })}
              </ul>
            </div>}
            <br/><br/>
       
            <MissingModal Missing={this.state.Missing}/>
            <ComplainModal Complain={this.state.Complain}/>
            <CrimeModal Crime={this.state.Crime}/>
        </div>
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return ({
    isLoggedIn:state.admin.adminLoggedIn,
    allComplains:state.admin.allComplains,
    allCrimes:state.admin.allCrimes,
    allMissing:state.admin.allMissing
  })
}

function mapActionsToProps(dispatch) {
  return ({
    insertComplain:(complain)=>{
      dispatch(insertComplainAdminAction(complain))
    },
    insertCrime:(crime)=>{
      dispatch(insertReportAdminAction(crime))
    },
    insertMissing:(missing)=>{
      dispatch(insertMissingAdminAction(missing))
    },
    deleteCrime:(crimeId)=>{
      dispatch(deleteCrimeAdminAction(crimeId))
    },
    deleteComplain:(complainId)=>{
      dispatch(deleteComplainAdminAction(complainId))
    },
    deleteMissing:(missingId)=>{
      dispatch(deleteMissingAdminAction(missingId))
    },
    showMissing:()=>{
      dispatch(showMissingAdminAction())
    },
    showCrime:()=>{
      dispatch(showCrimeAdminAction())
    },
    showComplain:()=>{
      dispatch(showComplainAdminAction())
    }
  })
}
export default connect(mapStateToProps,mapActionsToProps)(Admin)