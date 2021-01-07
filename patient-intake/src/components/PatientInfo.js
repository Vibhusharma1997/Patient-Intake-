import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';
import * as util from '../utils/helpers.js';

class PatientInfo extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            patient: {
              patient_middle_name: '',
              patient_emailid: '',
              patient_address_line_2: ''
            },
            errors: {},
            buttonDisabled: true
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.validEmail = this.validEmail.bind(this);
    }
    
    componentDidMount() {
      // code
    }
    
    
    validEmail(str) {
      return (/^([a-zA-Z0-9_\-\+\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi).test(str);
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
      let errors = this.state.errors;
      const key = inputTarget.name;

      switch (key) {
        case 'patient_first_name':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 32) {
              delete errors[key];
          }
          this.setState({errors});
          break;
        case 'patient_middle_name':
          if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && (inputTarget.value === '' || inputTarget.value.length <= 32)) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_last_name':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 32) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_emailid':
          if (inputTarget.value !== '') {
            if(!this.validEmail(inputTarget.value) || inputTarget.value.length > 64) {
                errors[key] = "Not a valid email."
            } else if (errors[key] && this.validEmail(inputTarget.value) && inputTarget.value.length <= 64) {
              delete errors[key];
            }
          }
          
          this.setState({errors});
          break;
        case 'patient_contact_number':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 10) {
              errors[key] = "Maximum length of 10 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 10) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_sex':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (errors[key] && inputTarget.value !== '') {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_ssn':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 9) {
              errors[key] = "Maximum length of 9 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 9) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_dob':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (errors[key] && inputTarget.value !== '') {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_insurance_id':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 9) {
              errors[key] = "Maximum length of 9 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 9) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_address_line_1':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && inputTarget.value !== '' && inputTarget.value.length <= 32) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_address_line_2':
          if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && (inputTarget.value === '' || inputTarget.value.length <= 32)) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_address_city':
          if(inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 32) {
              errors[key] = "Maximum length of 32 characters.";
          } else if (errors[key] && (inputTarget.value === '' || inputTarget.value.length <= 32)) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_address_state':
          if (inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if (inputTarget.value !== '' && inputTarget.value.length > 16) {
              errors[key] = "Maximum length of 16 characters.";
          } else if (errors[key] && (inputTarget.value === '' || inputTarget.value.length <= 16)) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        case 'patient_zip_code':
          if (inputTarget.value === '') {
            errors[key] = "Field is required.";
          } else if ((inputTarget.value !== '' && inputTarget.value.length > 5) || (inputTarget.value !== '' &&inputTarget.value.length < 5)) {
              errors[key] = "Zip code is made up of 5 characters.";
          } else if (errors[key] && (inputTarget.value === '' || inputTarget.value.length === 5)) {
              delete errors[key];
          }
          
          this.setState({errors});
          break;
        default:
        // code
      }
      
      const { buttonDisabled } = this.state;
      let newButtonState = (Object.keys(this.state.patient).length < 13 || Object.keys(this.state.errors).length > 0);
      
      this.setState({buttonDisabled: newButtonState});
      
    }

    handleNext(e) {
        e.preventDefault();
        const finalState = this.state;
        delete finalState["buttonDisabled"];
        // Pass this component's state onto the next component to pass along to the final page prior to submisssion
        this.props.history.push({ 
            pathname: '/emergency-contact',
            state: finalState
        });
    }
    
    render() {
    
      let { buttonDisabled } = this.state;
      
        return(
          <div>
          <header>
            <nav className="fixed-top" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page"><a href="#">Home</a></li>
                <li className="breadcrumb-item">
                  <Router>
                    <Link to="/patient-info">Patient Information</Link>
                  </Router>
                </li>
              </ol>
            </nav>
            </header>
            <main role="main" className="container" style={{paddingTop: 70+'px'}}>
                <h1 data-testid="patient-info">Patient Information</h1>
                <hr />
                <br/>
                <form>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label className="col-form-label">
                          First Name:
                          </label>
                          <input
                            type="text" 
                            className="form-control" 
                            name="patient_first_name" 
                            placeholder="First Name" 
                            value={this.state.patient_first_name} 
                            onChange={this.handleChange} 
                            onBlur={this.handleValidation}
                            required/>
                            {this.state.errors.patient_first_name && 
                            <div className="invalid-feedback" style={{display: 'block'}}>
                              {this.state.errors.patient_first_name}
                            </div>}
                    </div>

                    <div className="col-md-4 mb-3">
                        <label className="col-form-label">
                          Middle Name/Initial <span className="text-muted">(optional)</span>:
                          </label>
                          <input type="text" className="form-control" name="patient_middle_name" placeholder="Middle Name" 
                          value={this.state.patient_middle_name} 
                          onChange={this.handleChange} 
                          onBlur={this.handleValidation}/>
                          {this.state.errors.patient_middle_name && 
                            <div className="invalid-feedback" style={{display: 'block'}}>
                              {this.state.errors.patient_middle_name}
                            </div>}
                    </div>
                    
                    <div className="col-md-4 mb-3">
                        <label className="col-form-label">
                          Last Name:
                          </label>
                          <input type="text" className="form-control" name="patient_last_name" placeholder="Last Name" 
                          value={this.state.patient_last_name} 
                          onChange={this.handleChange} 
                          onBlur={this.handleValidation}
                          required/>
                          {this.state.errors.patient_last_name && 
                            <div className="invalid-feedback" style={{display: 'block'}}>
                              {this.state.errors.patient_last_name}
                            </div>}
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="col-md-3 mb-3">
                      <label>Phone Number</label>
                      <input type="tel" className="form-control" name="patient_contact_number" placeholder="Phone Number" 
                      value={this.state.patient_contact_number} 
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required />
                       {this.state.errors.patient_contact_number && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_contact_number}
                        </div>}
                    </div>
                     <div className="col-md-4 mb-3">
                        <label>
                          Email Address:
                         </label>
                         <input type="email" className="form-control" name="patient_emailid" placeholder="me@example.com" 
                         value={this.state.patient_emailid} 
                         onChange={this.handleChange}
                         onBlur={this.handleValidation}
                         />
                         {this.state.errors.patient_emailid && 
                          <div className="invalid-feedback" style={{display: 'block'}}>
                            {this.state.errors.patient_emailid}
                          </div>}
                     </div>
                    <div className="col-md-4 mb-3">
                      <label>Birth Gender</label>
                      <select className="custom-select" name="patient_sex"
                      value={this.state.patient_sex}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required>
                        <option value="" defaultValue>Select birth gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                      {this.state.errors.patient_sex && 
                      <div className="invalid-feedback" style={{display: 'block'}}>
                        {this.state.errors.patient_sex}
                      </div>}
                    </div>
                </div>
                
                
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Social Security Number (SSN#)</label>
                      <input type="text" className="form-control" name="patient_ssn" placeholder="SSN" 
                      value={this.state.patient_ssn}
                      onChange={this.handleChange} 
                      onBlur={this.handleValidation}
                      required />
                     {this.state.errors.patient_ssn && 
                      <div className="invalid-feedback" style={{display: 'block'}}>
                        {this.state.errors.patient_ssn}
                      </div>}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label>Date of Birth</label>
                      <input type="date" className="form-control" name="patient_dob" placeholder="YYYY-MM-DD"
                      value={this.state.patient_dob}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required />
                     {this.state.errors.patient_dob && 
                      <div className="invalid-feedback" style={{display: 'block'}}>
                        {this.state.errors.patient_dob}
                      </div>}
                    </div>
                </div>
                
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>Address Line 1</label>
                      <input type="text" className="form-control" name="patient_address_line_1" placeholder="Address" 
                      value={this.state.patient_address_line_1} 
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required/>
                      {this.state.errors.patient_address_line_1 && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_address_line_1}
                        </div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Address Line 2</label>
                      <input type="text" className="form-control" name="patient_address_line_2" placeholder="Building/Apt/Suite" 
                      value={this.state.patient_address_line_2} 
                      onChange={this.handleChange}
                      onBlur={this.handleValidation} />
                      {this.state.errors.patient_address_line_2 && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_address_line_2}
                        </div>}
                    </div>
                  </div>
                
                <div className="form-row">
                    <div className="col-md-6 mb-3">
                      <label>City</label>
                      <input type="text" className="form-control" name="patient_address_city" placeholder="City"
                      value={this.state.patient_address_city}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required/>
                      {this.state.errors.patient_address_city && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_address_city}
                        </div>}
                    </div>
                    <div className="col-md-3 mb-3">
                      <label>State</label>
                      <select className="custom-select" name="patient_address_state" id="state"
                      value={this.state.patient_address_state}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required>
                        <option value="" defaultValue>Select a State</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                      </select>
                      {this.state.errors.patient_address_state && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_address_state}
                        </div>}
                        </div>
                    <div className="col-md-3 mb-3">
                      <label>Zip</label>
                      <input type="text" className="form-control" name="patient_zip_code" placeholder="Zip"
                      value={this.state.patient_zip_code}
                      onChange={this.handleChange}
                      onBlur={this.handleValidation}
                      required/>
                      {this.state.errors.patient_zip_code && 
                        <div className="invalid-feedback" style={{display: 'block'}}>
                          {this.state.errors.patient_zip_code}
                        </div>}
                    </div>
                  </div>
                    <br/>
                    <br/>
                    <input type="submit"
                    disabled={buttonDisabled}
                    className="btn btn-primary"
                    value="Next &#x2192;" onClick={e => this.handleNext(e)} />
                    <br/>
                    <br/>
                    </form>
                </main>
            </div>
            );
    }
}

export default PatientInfo;
