import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, createLocation } from 'history';
import '@testing-library/jest-dom';
import EmergencyContact from '../components/EmergencyContact';
import MedicalHistory from '../components/MedicalHistory';

// REMINDER:
// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('Medical History Component', () => {
    
    describe('Test validation of input fields and button', () => {
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        
        
        test('Medical History page renders on initial screen render', async () => {
            const history = createMemoryHistory();
            const state = {
               patient: {
                "patient_middle_name":"crackle",
                "patient_emailid":"ricekrispies@kelloggs.com",
                "patient_address_line_2":"",
                "patient_first_name":"snap",
                "patient_last_name":"pop",
                "patient_contact_number":"74655966",
                "patient_sex":"M",
                "patient_ssn":"726596595",
                "patient_dob":"1980-10-01",
                "patient_address_line_1":"2 Lane Drive",
                "patient_address_city":"Somewheresville",
                "patient_address_state":"NE",
                "patient_zip_code":"78561",
                "reason_for_visit": "Stomach ache and shar pains",
                "patient_emergency_contact_name": "Clint Barton",
                "patient_emergency_contact_relationship": "Friend",
                "patient_emergency_contact_number": "9731234568",
                "insurance_company_name": "Blue Cross",
                "insurance_contact_number": "5551234560",
                "patient_insurance_id": "857412",
                "insurance_group_number": "8574120",
                "insurance_plan_name": "PPO"
               }
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/medical-history", state);
            
            const { getByRole, getByTestId, getByText } = await render(
                    <MedicalHistory history={history} location={location2} />
                );

            expect(screen.getByText(/Patient Medical History/)).toBeInTheDocument();
            expect(screen.getByText(/Family Medical History/)).toBeInTheDocument();
        });
        
        // test patient_allergies => string with a max length of 128
        // test if comma separated list
        // test no error when the two above conditions are met
        test('Assert entering allergies as a comma separated string is captured on Medical History screen/component', async () => {
            const history = createMemoryHistory();
            const state = {
               patient: {
                "patient_middle_name":"crackle",
                "patient_emailid":"ricekrispies@kelloggs.com",
                "patient_address_line_2":"",
                "patient_first_name":"snap",
                "patient_last_name":"pop",
                "patient_contact_number":"74655966",
                "patient_sex":"M",
                "patient_ssn":"726596595",
                "patient_dob":"1980-10-01",
                "patient_address_line_1":"2 Lane Drive",
                "patient_address_city":"Somewheresville",
                "patient_address_state":"NE",
                "patient_zip_code":"78561",
                "reason_for_visit": "Stomach ache and shar pains",
                "patient_emergency_contact_name": "Clint Barton",
                "patient_emergency_contact_relationship": "Friend",
                "patient_emergency_contact_number": "9731234568",
                "insurance_company_name": "Blue Cross",
                "insurance_contact_number": "5551234560",
                "patient_insurance_id": "857412",
                "insurance_group_number": "8574120",
                "insurance_plan_name": "PPO"
               }
            };
            
            // const location = createLocation('/emergency-contact');
            let location2 = {};
            location2.state = state;
            
            history.push("/medical-history", state);
            
            const { getByRole, getByTestId, getByText } = await render(
                    <MedicalHistory history={history} location={location2} />
                );
                
                
            const allergies = getByTestId("patient-allergies");

            expect(allergies).toBeInTheDocument();
            expect(allergies).toBeVisible();
            
            
            allergies.focus();
            fireEvent.change(allergies, {target: 
                {value: "ragweed, tree pollen, shellfish"}});
            allergies.blur();
            expect(allergies.value).toBe("ragweed, tree pollen, shellfish");
            
            const sibling = allergies.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            // expect(sibling).toHaveTextContent('Maximum length of 128 characters.');
            
        });




    });
    
  });
