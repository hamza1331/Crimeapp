import React, { Component } from 'react'
import Navbar from './Navbar'
import { insertMissingPerson,showMissingAction,deleteMissingAction,countURLSAction } from "../store/actions/actions";
import { connect } from "react-redux";
import firebase from 'firebase';
import Loading from './load.gif'
import Compress from 'compress.js'
import MissingModal from './MissingModal'
class Missing extends Component {
  constructor(props) {
    super(props)
    this.initialState = {
      name: '',
      NIC: 0,
      title: '',
      city: '',
      missingpersonname: '',
      missingpersonheight: '',
      anyotherIdentification: '',
      relationwiththeperson: '',
      contactiffound: '',
      placeofmissing: '',
      status:'Pending',
      downlaodUrls: [],
      images: [],
      imageLinks: [],
      showImages: false,
      showLoading:false,
      missingId:'missing'+Math.round(Math.random()*100000)
    }
    this.state = {
      ...this.initialState
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handlePhotos = this.handlePhotos.bind(this)
    this.removePhoto = this.removePhoto.bind(this)
    this.handleDataUpload = this.handleDataUpload.bind(this)
    this.pictureUpload=this.pictureUpload.bind(this)
    this.showMissingMethod=this.showMissingMethod.bind(this)
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  componentDidMount(){
    if (this.props.isLoggedIn&&this.props.missingPersons.length===0) {
      let firebaseRef = firebase.database().ref('usermissingper').child(this.props.uid)
      firebaseRef.once('value', snap => {
        const posts = snap.val()
        if(posts.length!==0){
          posts.forEach(post => {
            let dataRef = firebase.database().ref('missing').child(post)
            dataRef.once('value', snapshot => {
              let missing = snapshot.val()
              this.props.insertMissingPerson(missing)
            })
          })
        }
      })
    }
  }
  handlePhotos(e) {
    for (let i = 0; i < e.target.files.length; i++) {
      let photos = this.state.images
      photos.push(e.target.files[i])
      this.setState({
        images: photos
      })
      let src = URL.createObjectURL(e.target.files[i]);
      let oldData = this.state.imageLinks
      oldData.push(src)
      this.setState({
        imageLinks: oldData
      })
    }
    this.setState({
      showImages: true
    })
  }
  pictureUpload(e) {
    e.preventDefault()
    this.setState({
      showLoading: true
    })
    const files = this.state.images
    let compress = new Compress()
    compress.compress(files, {
      size: 1, // the max size in MB, defaults to 2MB
      quality: .75, // the quality of the image, max is 1,
      maxWidth: 1024, // the max width of the output image, defaults to 1920px
      maxHeight: 768, // the max height of the output image, defaults to 1920px
      resize: true, // defaults to true, set false if you do not want to resize the image width and height
    }).then((data) => {
      data.forEach((img, index) => {
        const base64str = img.data
        const imgExt = img.ext
        const file = Compress.convertBase64ToFile(base64str, imgExt)
        var storageRef = firebase.storage().ref(`missingPersons/${this.state.missingId}/${index}`)
        //upload the file
        var task = storageRef.put(file);
        task.on('state_changed', function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   console.log('Upload is ' + progress.toFixed(2) + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              //   console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log(progress);
              break;
              default:
              return
          }
        }, function (error) {
          alert(error.message)
        }, () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            let oldUrls = this.state.downlaodUrls
            oldUrls.push(downloadURL)
            this.setState({
              downlaodUrls: oldUrls
            })
            if (this.state.downlaodUrls.length === this.state.imageLinks.length) {
              this.handleDataUpload()
            }
          });
        })
      })
    })

  }
  handleDataUpload(){
    let sendData = this.state
    delete sendData.showLoading
    delete sendData.imageLinks
    delete sendData.showImages
    delete sendData.images
    sendData.userId=this.props.uid
    let firebaseRef = firebase.database().ref('missing').child(this.state.missingId)
    firebaseRef.set(sendData).then(() => {
      let userRef = firebase.database().ref('usermissingper').child(this.props.uid)
      userRef.once('value', (snap) => {
        const data = snap.val()
        if (data) {
          let oldPosts = data
          oldPosts.push(this.state.missingId)
          userRef.set(oldPosts).then(() => {
            this.props.insertMissingPerson(sendData)
            this.setState({
              ...this.initialState
            })
          })
        }
        else {
          let newUserPosts = []
          newUserPosts.push(this.state.missingId)
          userRef.set(newUserPosts).then(() => {
            this.props.insertMissingPerson(sendData)
            this.setState({
              ...this.initialState
            })
          })
        }
      })

    }).catch(err => console.error(err))
  }
  removePhoto(e) {
    let newData = this.state.imageLinks.filter((imageLink, index) => index !== parseInt(e.target.id))
    this.setState({
      imageLinks: newData
    })
    let photos = this.state.images.filter((image, index) => index !== parseInt(e.target.id))
    this.setState({
      images: photos
    })
  }
  handleRemove(e) {
    e.preventDefault()
    this.props.countURLS(e.target.id)
    let missingId = this.props.missingPersons[e.target.id].missingId
    let firebaseRef = firebase.database().ref('missing').child(missingId)
    firebaseRef.remove().then(() => {
      let userRef = firebase.database().ref('usermissingper').child(this.props.uid)
      userRef.once('value', snap => {
        let data = snap.val()
        let updatedData = data.filter((data) => {
          return data!==missingId
        })
        userRef.set(updatedData).then(() => {
          for(let i=0;i<this.props.URLS;i++){
            let imageRef = firebase.storage().ref(`missingPersons/${missingId}/${i}`)
          imageRef.delete().then(()=>{
            if(i===this.props.URLS-1){
              this.props.deleteMissing(missingId)
            }
          }).catch(err=>console.error(err))
          }
        })
      }).catch(err => console.error(err))
    })
  }
  showMissingMethod(e){
    e.preventDefault()
    let missingDetails = {}
    missingDetails.index = e.target.id
    missingDetails.screen='missing'
    this.props.showMissing(missingDetails)
  }
  render() {
    return (
      <div>
        <Navbar history={this.props.history} /><br /><br /><br /><br />
      {this.props.isLoggedIn && <div className='container' style={{ marginTop: 15 }}>
          <div className="row">
            <div className="col-md-6 card" style={{ padding: 20 }}>
              <h2 className='text-center'>MISSING PERSON ENTRY</h2>
              <form className="form-horizontal" onSubmit={e => e.preventDefault()} method='post'>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="title">Missing Title:</label>
                  <div className="col-sm-10">
                    <input onChange={this.handleChange} value={this.state.title} type="text" autoComplete='off' autoFocus={true} className="form-control" id="title" placeholder="Missing Title" name="title" />
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
                  <label className="control-label col-sm-2" htmlFor="city">City</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.city} autoComplete='off' className="form-control" id="name" placeholder="Enter City" name="city" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="missingpersonname">Missing Person Name</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.missingpersonname} autoComplete='off' className="form-control" id="name" placeholder="Missing Person Name" name="missingpersonname" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="missingpersonheight">Missing Person Height (in cm)</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.missingpersonheight} autoComplete='off' className="form-control" id="name" placeholder="Missing Person Height (in cm)" name="missingpersonheight" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="anyotherIdentification">Any Other Identification</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.anyotherIdentification} autoComplete='off' className="form-control" id="name" placeholder="Any Other Identification" name="anyotherIdentification" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="relationwiththeperson">Relation with the person</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.relationwiththeperson} autoComplete='off' className="form-control" id="name" placeholder="Relation with the person" name="relationwiththeperson" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="contactiffound">Contact If Found</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.contactiffound} autoComplete='off' className="form-control" id="name" placeholder="Contact If Found" name="contactiffound" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-sm-2" htmlFor="placeofmissing">Place of missing</label>
                  <div className="col-sm-10">
                    <input type="text" onChange={this.handleChange} value={this.state.placeofmissing} autoComplete='off' className="form-control" id="name" placeholder="Place of missing" name="placeofmissing" />
                  </div>
                </div>
                {this.state.showImages && this.state.imageLinks.map((imageLink, index) => {
                  return <img onClick={this.removePhoto} alt='nothing' id={index} key={index} style={{ margin: 5 }} width={150} height={100} src={imageLink} />
                })}
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <label htmlFor="Upload">Upload Pix Of missing person</label>
                    <input type="file" accept="image/*" multiple onClick={() => this.setState({ imageLinks: [] })} onChange={this.handlePhotos} />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    {!this.state.showLoading && <button type="submit" className="btn btn-primary pull-right" onClick={this.pictureUpload}>Submit</button>}
                    {this.state.showLoading &&<button type='submit' className='btn btn-info pull-right'><img style={{width:"30%"}} src={Loading} alt="NOt found"/></button>}
                  </div>
                </div>


              </form>
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <ul className="list-group">
                {this.props.missingPersons.length>0&&this.props.missingPersons.map((missPerson, index) => {
                  return <div
                    key={index}>
                    <li
                      className='list-group-item list-group-item-info'>
                      <a href="#miss" id={index} onClick={this.showMissingMethod}>{missPerson.title}</a>
                      <span className='pull-right'>
                        <button id={index} onClick={this.handleRemove} className='btn btn-xs btn-danger'> Delete</button>
                      </span>
                    </li><br />
                  </div>
                })}
              </ul>
            </div>
          </div>
          <MissingModal/>
        </div>}
        {!this.props.isLoggedIn&&<div>
          <br/><br/><br/>
          <h2>User Must Login</h2>
        </div>}
      </div>
    )
  }
}
function mapStateToProps(state) {
  return ({
    isLoggedIn: state.rootReducer.isLoggedIn,
    missingPersons: state.rootReducer.missingPersons,
    uid:state.rootReducer.uid,
    URLS:state.rootReducer.URLS
  })
}

function mapActionsToProps(dispatch) {
  return ({
    insertMissingPerson: (missPerson) => {
      dispatch(insertMissingPerson(missPerson))
    },
    showMissing:(missingIndex)=>{
      dispatch(showMissingAction(missingIndex))
    },
    deleteMissing:(missingId)=>{
      dispatch(deleteMissingAction(missingId))
    },
    countURLS:(missingIndex)=>{
      dispatch(countURLSAction(missingIndex))
    }
  })
}
export default connect(mapStateToProps, mapActionsToProps)(Missing)