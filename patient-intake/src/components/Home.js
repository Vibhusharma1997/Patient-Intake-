import React from 'react';
import { HashRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import Button from './Button';
import Footer from './Footer';
import logo from '../logo.svg';
import '../App.css';

class Home extends React.Component {
    render () {
        return (
            <div className="homepage">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <br />
                <h1>Welcome to Patient Check-In</h1>
                <p className="lead">Please have your driver's license or a form of identification and your insurance card at hand.</p>
                <Button propid="begin-button" label="Begin Check In &#x2192;" link="/patient-info" />
                <br/>
                <br/>
                <Footer />
            </div>
        );
    }
}

export default Home;
