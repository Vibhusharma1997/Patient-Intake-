import React from 'react';
import { HashRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom';
import Button from './Button.js';
import logo from '../logo.svg';
import '../App.css';

class ThankYou extends React.Component {
    
    
    constructor(props) {
        super(props);
        
        this.state = {
            patient: {},
            checkInComplete: false
        }
    }
    
    componentDidMount() {
        const prevState = this.props ? this.props.location.state : Object.assign({});
        Object.keys(prevState).forEach((key) => {
            if(Object.keys(prevState[key])) {
                this.setState({[key]: Object.assign({}, prevState[key])});
            }
            this.setState({[key]: prevState[key]});
        });
    }
    
    
    render () {
        if (Object.keys(this.state).length < 1) {
          return <h3>Loading...</h3>;
        }
        
        return (
            <div className="homepage">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <br />
                <h1>Thank you for checking in!</h1>
                {this.state.checkInComplete && <Button label="Back to homepage &#x2192;" link="/" /> }
                <br/>
                <br/>
            </div>
        );
    }
}

export default ThankYou;
