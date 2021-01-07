import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Button extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    handleClick(e, link) {
        e.preventDefault();
        this.props.history.push({ 
          pathname: link
      });
    }
    
    render() {
        return(
            <div>
                <Router>
                    <Link data-testid={`${this.props.propid}`} className="btn btn-primary" to={`${this.props.link}`}>{`${this.props.label}`}</Link>
                </Router>
            </div>
            );
    }
}


Button.propTypes = {
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    propid: PropTypes.string
};

export default Button;

