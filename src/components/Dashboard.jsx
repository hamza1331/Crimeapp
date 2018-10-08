import React, { Component } from 'react'
import Navbar from './Navbar'
export default class CardComponent extends Component {
  constructor(props){
    super(props)
    this.navigate = this.navigate.bind(this)
  }
  navigate(e){
    e.preventDefault()
    if(e.target.name==='reports'){
      this.props.history.push('/crimereport')
    }
    else if(e.target.name==='complaint'){
      this.props.history.push('/complain')
    }
    else if(e.target.name==='missing'){
      this.props.history.push('/missing')
    }
  }
  render() {
    return (
     <div>
       <Navbar history={this.props.history}/><br/><br/><br/><br/>
        <div className="container">
        <div className="jumbotron">
          <div className="row">
            <div className="col-md-3">
              <article className="card">
                <img style={{ maxHeight: 400, width: '100%' }} src='https://pixabay.com/get/ea36b4072cf2093ed1534705fb0938c9bd22ffd41cb2184197f9c27ba6/dawn-3358468_1920.jpg' alt="Sample photo" />
                <div className="text">
                  <h3 style={{ fontWeight: 'bolder' }}>CRIME REPORTS</h3>
                  <h3>DESCRIPTION GOES HERE...</h3>
                  <button name='reports' className='btn btn-info btn-block' onClick={this.navigate}>Go to Crime Reports</button><br />
                  </div>
              </article>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <article className="card">
                <img style={{ maxHeight: 400, width: '100%' }} src='https://pixabay.com/get/ea36b70b2ff11c22d9584518a33219c8b66ae3d01ab811439cf4c67c/new-york-city-336475_1920.jpg' alt="Sample photo" />
                <div className="text">
                  <h3 style={{ fontWeight: 'bolder' }}>COMPLAINTS</h3>
                  <h3>DESCRIPTION GOES HERE...</h3>
                  <button name='complaint' className='btn btn-info btn-block' onClick={this.navigate}>Go to Complaints</button><br />
                  </div>
              </article>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-3">
              <article className="card">
                <img style={{ maxHeight: 400, width: '100%' }} src='https://pixabay.com/get/ea33b6072afd033ed1534705fb0938c9bd22ffd41cb2184197f9c579a3/cobblestones-3678292_1920.jpg' alt="Sample photo" />
                <div className="text">
                  <h3 style={{ fontWeight: 'bolder' }}>MISSING PERSONS</h3>
                  <h3>DESCRIPTION GOES HERE...</h3>
                  <button name='missing' className='btn btn-info btn-block' onClick={this.navigate}>Go to Missing Persons</button><br />
                  </div>
              </article>
            </div>
            <div className="col-md-"></div>
          </div>
        </div>
      </div>
     </div>

    )
  }
}
