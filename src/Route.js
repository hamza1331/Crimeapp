import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './components/Home'
import history from './History'
import Dashboard from './components/Dashboard'
import Complain from './components/Complain'
import Crimereport from './components/Crimereport'
import Missing from './components/Missing'
// import createBrowserHistory from 'history/createBrowserHistory'

// const history = createBrowserHistory()

class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    <Route path="/Dashboard" component={Dashboard} />
                    <Route exact path="/" component={Home} />
                    <Route path="/complain" component={Complain} />
                    <Route path="/missing" component={Missing} />
                    <Route path="/crimereport" component={Crimereport} />
                </div>
            </Router>
        )
    }
}

export default Routers;