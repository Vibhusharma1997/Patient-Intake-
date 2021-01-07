import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';

class ConsentForm extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            patient: {},
            errors: {},
            buttonDisabled: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }
    
    componentDidMount() {
        const prevState = this.props ? this.props.location.state : Object.assign({});
        Object.keys(prevState).forEach((key) => {
            if(Object.keys(prevState[key])) {
                this.setState({patient: Object.assign({}, prevState.patient, this.state.patient)});
            }
            this.setState({[key]: prevState[key]});
        });
    }
    
    handleChange(e) {
        const patient = Object.assign({}, this.state.patient);
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        patient[name] = value;
        this.setState({patient});
    }
    
    handleValidation(e) {
      const inputTarget = e.target;
      const errors = this.state.errors;
      const key = inputTarget.name;
      
      switch (key) {
          case 'patient_reason_for_visit':
          // code
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 150) {
              errors[key] = "Maximum length of 150 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 150) {
              delete errors[key];
          }
          this.setState({errors});
          break;
        case 'patient_emergency_contact_name':
          // code
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 64) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 64) {
              delete errors[key];
          }
          this.setState({errors});
          break;
        default:
          // code
      }
      
    }

    handleNext(e) {
        e.preventDefault();
        const finalState = this.state;
        delete finalState["buttonDisabled"];
        this.props.history.push({ 
            pathname: '/review-page',
            state: finalState
        });
    }
    
    render () {
        
        let { buttonDisabled } = this.state;
        
        return (
            <div>
            <header>
                <nav className="fixed-top" aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page"><a href="#">Home</a></li>
                    <li className="breadcrumb-item">
                        <Router>
                            <Link to="/emergency-contact">Patient Consent Forms</Link>
                        </Router>
                    </li>
                  </ol>
                </nav>
            </header>
            <main role="main" className="container" style={{paddingTop: 70+'px'}}>
                <h1>Patient Consent</h1>
                <hr />
                <br/>
                <form>
                 <fieldset disabled>
                 <br/>
                <h3>Authorization for Release of Information</h3>
                <div className="form-row">
                    <p>May we leave testing results or referral info in email or voicemail?</p>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="auth_yes" onChange={this.handleChange} />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="auth_no" onChange={this.handleChange} />
                      <label className="form-check-label">No</label>
                    </div>
                </div>
                <div className="form-row">
                <p>Who may receive information on your behalf regarding testing or referrals?</p>
                <div className="form-check form-check-inline margin-1-1">
                      <label className="col-form-label">
                          Name:
                         </label>
                         <input type="text" className="form-control"
                         name="consent_initial" 
                         placeholder="Name"
                         value={this.state.consent_initial}
                         onChange={this.handleChange}
                         onBlur={this.handleValidation}
                         />
                         {this.state.errors.consent_initial && 
                          <div className="invalid-feedback" style={{display: 'block'}}>
                            {this.state.errors.consent_initial}
                          </div>}
                    </div>
                </div>
                
                <br/>
                <h3>Patient Consent for Treatment</h3>
                <div className="form-row">
                    
                    <ol>
                        <li>I voluntarily consent to any and all health care treatment and diagnostic procedures provided by this practice and its
associated physicians, clinicians and other personnel. I am aware that the practice of medicine and other health care
professions is not an exact science and I further state that I understand that no guarantee has been or can be made as
to the results of the treatments or examinations at the medical practice office.</li>
                    <li>I agree to be contacted via email or SMS with information related to my visit, like: a patient portal invitation, post-visit
satisfaction survey, appointment or checkup reminders, health tips, or new services that relate to me or my family.</li>
                    <li>I consent to the use and disclosure of my/the patient’s protected health information for purposes of obtaining payment for
services rendered to me/the patient, treatment and health care operations consistent with the practice's privacy
practices.</li>
                    <li>I authorize payment of medical benefits to the practice's physicians or their designee for services rendered.</li>
                    <li>I give permission to obtain all my medication/prescription history when using an electronic system to process prescriptions
for my medical treatment.</li>
                    </ol>
                    
                    
                </div>
                <br/>
                
                <div className="form-row">
                <p>I have received a copy of the Notice of Privacy Practice and Financial Policy Notice</p>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="family_cancer" onChange={this.handleChange} />
                      <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" name="family_cancer" onChange={this.handleChange} />
                      <label className="form-check-label">No</label>
                    </div>
                    <div className="form-check form-check-inline margin-1-1">
                      <label className="col-form-label">
                          Initial:
                         </label>
                         <input type="text" className="form-control"
                         name="consent_initial" 
                         placeholder="Name"
                         value={this.state.consent_initial}
                         onChange={this.handleChange}
                         onBlur={this.handleValidation}
                         />
                         {this.state.errors.consent_initial && 
                          <div className="invalid-feedback" style={{display: 'block'}}>
                            {this.state.errors.consent_initial}
                          </div>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                         <input type="text" className="form-control"
                         name="consent_signature" 
                         placeholder="X"
                         value={this.state.consent_signature}
                         onChange={this.handleChange}
                         onBlur={this.handleValidation}
                         />
                         <small className="form-text text-muted">
                              Patient or Authorized Person’s Signature
                        </small>
                         {this.state.errors.consent_signature && 
                          <div className="invalid-feedback" style={{display: 'block'}}>
                            {this.state.errors.consent_signature}
                          </div>}
                     </div>
                     <div className="col-md-3 mb-3">
                      <input type="date" className="form-control" name="consent_date" placeholder="YYYY-MM-DD"
                      value={this.state.consent_date}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required />
                      <small className="form-text text-muted">
                            Date
                        </small>
                     {this.state.errors.consent_date && 
                      <div className="invalid-feedback" style={{display: 'block'}}>
                        {this.state.errors.consent_date}
                      </div>}
                    </div>
                      
                     
                </div>
                </fieldset>
            
                    <br/>
                    <br/>
                    <input type="submit" 
                    className="btn btn-primary"
                    disabled={buttonDisabled}
                    value="Next &#x2192;" onClick={e => this.handleNext(e)} />
                    <br/>
                    <br/>
                    </form>
                </main>
            
            </div>
            );
    }
}

export default ConsentForm;
