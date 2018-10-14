import React, { Component } from 'react';
import { connect } from "react-redux";
import {showAllMissingAction,showMissingAction} from '../store/actions/actions'
import Navbar from './Navbar'
import './Home.css'
import firebase from 'firebase'
import MissingModal from './MissingModal'
class Home extends Component {
    constructor(props){
        super(props)
        this.showMissing = this.showMissing.bind(this)
    }
    componentDidMount(){
        if(this.props.allMissing.length===0){
        let firebaseRef = firebase.database().ref('missing')
      firebaseRef.once('value',snap=>{
      snap.forEach((Key)=>{
        let dataRef = firebaseRef.child(Key.ref.key).key
        let missing = snap.child(dataRef).val()
        this.props.showAllMissing(missing)
      })
    }).then(()=>{
        console.log(this.props.allMissing)
    }).catch(err=>console.error(err))
    }
    }
    showMissing(e){
        e.preventDefault()
        let missingDetails = {}
        missingDetails.index = e.target.id
        missingDetails.screen='home'
        this.props.showMissingModal(missingDetails)
    }
    render() {
        return(
            <div>
           <Navbar history={this.props.history}/>
            <br/><br/><br/>
            <div className='row container'>
            <h1 style={{textAlign:'center',textDecoration:'underline'}} classNames='text-info'>MISSING PERSONS</h1><hr className='style16'/><br/>
            {this.props.allMissing && this.props.allMissing.map((missing,index)=>{
                return <div key={missing.missingId}>
                <div className="col-md-3">
                <article className="card">
                  <img style={{ maxHeight: 400, width: '100%' }} src={missing.downlaodUrls[0]} alt="NOthing" />
                  <div className="text">
                    <h3 style={{ fontWeight: 'bolder' }}>{missing.title}</h3>
                    <h3>City: {missing.city}</h3>
                    <button name='missing' id={index} className='btn btn-info btn-block' onClick={this.showMissing}>Show Missing Persons</button><br />
                    </div>
                </article>
              </div>
              <div className="col-md-1"></div>
                </div>
            })}
            </div>
            <MissingModal/>
            </div>
        )
        // )
    }
}

function mapStateToProps(state){
    return({
        isLoggedIn:state.rootReducer.isLoggedIn,
        allMissing:state.rootReducer.allMissing
    })
}

function mapActionsToProps(dispatch){
    return({
        showAllMissing:(missing)=>{
            dispatch(showAllMissingAction(missing))
        },
        showMissingModal:(missingDetail)=>{
            dispatch(showMissingAction(missingDetail))
        }
    })
}


export default connect(mapStateToProps,mapActionsToProps)(Home);
