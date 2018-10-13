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
                <img style={{ maxHeight: 400, width: '100%' }} src='https://images.unsplash.com/photo-1539239601483-f4d03f6ccafa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5bdb9cb4074ab2aba36249e2e38e9233&auto=format&fit=crop&w=1500&q=80' alt="Sample photo" />
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
                <img style={{ maxHeight: 400, width: '100%' }} src='https://images.unsplash.com/photo-1539201910954-e296265bbe50?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ec7a913876bd136e02dd54a9a1538fd3&auto=format&fit=crop&w=1500&q=80' alt="Sample photo" />
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
                <img style={{ maxHeight: 400, width: '100%' }} src='https://images.unsplash.com/photo-1499377193864-82682aefed04?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=71c8f98090468daa45a13fe3e5785571&auto=format&fit=crop&w=1522&q=80' alt="Sample photo" />
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
