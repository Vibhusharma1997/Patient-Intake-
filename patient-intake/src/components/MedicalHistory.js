import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';

class MedicalHistory extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            patient: {
              patient_allergies: '',
              insurance_pharmacy_network: '', // here until it is removed
              patient_drinker: '0',
              patient_cancer: '0',
              patient_currently_pregnant: '0',
              patient_diabetes: '0',
              patient_drinker: '0',
              patient_high_blood_pressure: '0',
              patient_heart_disease: '0',
              patient_metal_implants: '0',
              patient_pacemaker: '0',
              patient_smoker: '0',
              family_bleeding_disorder: '0',
              family_cancer: '0',
              family_diabetes: '0',
              family_heart_conditions: '0',
              family_heart_disease: '0',
              family_high_blood_pressure: '0',
              family_sickle_cell_disease: '0',
              family_stroke: '0'
            },
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
        const value = target.type === 'checkbox' ? target.checked ? '1' : '0' : target.value;
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
            if (inputTarget.value !== '') {
              let allergies = inputTarget.value;
              
              if(allergies.indexOf(',') < 0 && allergies.split(',').length < 1) {
                  errors[key] = "Please provide a comma separated list of allergies the patient has.";
              } else if ((allergies.indexOf(',') >= 0 && allergies.split(',').length >= 1) && (allergies.length > 128)) {
                  errors[key] = "Maximum length of 128 characters.";
              }
            } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.indexOf(',') >= 0 && inputTarget.value.split(',').length >= 1) {
                delete errors[key];
            }
            this.setState({errors});
            break;
          default:
          //code
      }
      
      const { buttonDisabled } = this.state;
      let newButtonState = (Object.keys(this.state.patient).length < 13 || Object.keys(this.state.errors).length > 0);
      
      this.setState({buttonDisabled: newButtonState});
      
    }

    handleNext(e) {
        e.preventDefault();
        const finalState = this.state;
        delete finalState["buttonDisabled"];
        this.props.history.push({ 
            pathname: '/consent-form',
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
                        <Link to="/medical-history">Medical History</Link>
                      </Router>  
                    </li>
                  </ol>
                </nav>
            </header>
            <main role="main" className="container" style={{paddingTop: 70+'px'}}>
                <h1>Medical History</h1>
                <hr />
                <br/>
                <form>
            
                <h3>Patient Medical History</h3>
                <p className="instructions">Select all that apply to <strong>you</strong>. If none apply, proceed to the next section.</p>
                <div className="form-row">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="patient_drinker" name="patient_drinker" onChange={this.handleChange} />
                      <label className="form-check-label" htmlFor="patient_drinker">Alcohol Drinker</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_smoker" onChange={this.handleChange} />
                      <label className="form-check-label">Smoker</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_currently_pregnant" onChange={this.handleChange} />
                      <label className="form-check-label">Currently Pregnant</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_diabetes" onChange={this.handleChange} />
                      <label className="form-check-label">Diabetes (Type I / II)</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_cancer" onChange={this.handleChange} />
                      <label className="form-check-label">Cancer</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_metal_implants" onChange={this.handleChange} />
                      <label className="form-check-label">Metal implants</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="patient_pacemaker" onChange={this.handleChange} />
                      <label className="form-check-label">Pacemaker</label>
                    </div>
                </div>
                <br/>
                <br/>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <label>Allergies</label>
                        <textarea className="form-control" rows="3" 
                        name="patient_allergies"
                        data-testid="patient-allergies"
                        value={this.state.patient_allergies}
                         onChange={this.handleChange}
                         onBlur={this.handleValidation}
                        />
                        {this.state.errors.patient_allergies && 
                          <div className="invalid-feedback" style={{display: 'block'}}>
                            {this.state.errors.patient_allergies}
                          </div>}
                    </div>
                  </div>
                <br/>
                <br/>
                
                <h3>Family Medical History</h3>
                <p className="instructions">Select all that apply to members of <strong>your family</strong>, immediate and extended. If none apply, proceed to the next section.</p>
                <div className="form-row">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_cancer" onChange={this.handleChange} />
                      <label className="form-check-label">Cancer</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_diabetes" onChange={this.handleChange} />
                      <label className="form-check-label">Diabetes (Type I /II)</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_heart_conditions" onChange={this.handleChange} />
                      <label className="form-check-label">Heart Conditions/Disease</label>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_bleeding_disorder" onChange={this.handleChange} />
                      <label className="form-check-label">Blood Disorder (e.g. Hemophilia, Clotting)</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_stroke" onChange={this.handleChange} />
                      <label className="form-check-label">Stroke</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" name="family_sickle_cell_disease" onChange={this.handleChange} />
                      <label className="form-check-label">Sickle Cell Disease</label>
                    </div>
                </div>
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



export default MedicalHistory;