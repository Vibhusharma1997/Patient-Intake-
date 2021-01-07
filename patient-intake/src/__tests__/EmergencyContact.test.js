import React from 'react';
import { HashRouter as Router, Link, withRouter } from 'react-router-dom';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, createLocation } from 'history';
import '@testing-library/jest-dom';
import EmergencyContact from '../components/EmergencyContact';

// REMINDER:
// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('EmergencyContact Component', () => {
    
    describe('Test validation of input fields and button', () => {
        beforeEach(() => {
            // investigate why beforeEach is not working when I place the render of component within in?
        });
        
        afterEach(() => {
            cleanup();
        });
        
        
        test('Assert Emergency Contact page renders & Next button is disabled on initial screen render', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            // const location = createLocation('/emergency-contact');
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole } = await render(
                    <EmergencyContact history={history} location={location2} />
                );
            expect(getByRole('button' )).toHaveAttribute('disabled');
            expect(screen.getByText("Emergency Contact & Insurance")).toBeInTheDocument();
        });
        
        test('Reason for visit textarea input should be present on EmergencyContact component/screen', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );
            
            const reasonVisit = getByTestId("reason-for-visit");
            expect(screen.getByText("Emergency Contact & Insurance")).toBeInTheDocument();
            expect(getByRole('button' )).toHaveAttribute('disabled');
            expect(reasonVisit).toBeInTheDocument();
        });
        
        
        test('Focus, then leaving reason for visit textarea should trigger error', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );
            
            const reasonVisit = getByTestId("reason-for-visit");
            expect(reasonVisit).toBeInTheDocument();
            
            reasonVisit.focus();
            reasonVisit.blur();

            const sibling = reasonVisit.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Field is required.');
            expect(getByRole('button' )).toHaveAttribute('disabled');
            
        });
        
        
        
        test.skip('Input <7000 characters should not trigger error', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );
            
            const reasonVisit = getByTestId("reason-for-visit");
            expect(reasonVisit).toBeInTheDocument();
            
            reasonVisit.focus();
            fireEvent.change(reasonVisit, {target: {value: "Stomach ache with occasional sharp pains"}});
            reasonVisit.blur();
            expect(reasonVisit.value).toBe("Stomach ache with occasional sharp pains");

            const sibling = reasonVisit.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            expect(getByText(/Next/)).toHaveAttribute('disabled');
            
        });
        
        
        test('Leaving insurance id field blank should not trigger an error message', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const insurID = getByPlaceholderText("Insurance ID#");
            
            insurID.focus();
            insurID.blur();

            const sibling = insurID.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            
        });
        
        
        test('Enter insurance id greater than 9 should cause an error message', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const insurID = getByPlaceholderText("Insurance ID#");
            
            insurID.focus();
            fireEvent.change(insurID, {target: {value: "1234567890"}});
            insurID.blur();
            expect(insurID.value).toBe("1234567890");

            const sibling = insurID.nextSibling;
            expect(sibling).toBeTruthy();
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Maximum length of 9 characters.');
            
        });
        
        
        test('Enter insurance id less than 9 characters, no error should display', async () => {
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
                "patient_zip_code":"78561"}
            };
            

            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const insurID = getByPlaceholderText("Insurance ID#");
            
            insurID.focus();
            fireEvent.change(insurID, {target: {value: "12345678"}});
            insurID.blur();
            expect(insurID.value).toBe("12345678");

            const sibling = insurID.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            
        });
        
        
        test('Leaving insurance group number field blank should not trigger an error message', async () => {
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
                "patient_zip_code":"78561"}
            };
            
            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const groupNumb = getByPlaceholderText("Group#");

            groupNumb.focus();
            groupNumb.blur();

            const sibling = groupNumb.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            
        });
        
        
         test('Enter group number greater than 32 characters trigger an error message', async () => {
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
                "patient_zip_code":"78561"}
            };
            

            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const groupNumb = getByPlaceholderText("Group#");
            
            groupNumb.focus();
            fireEvent.change(groupNumb, {target: {value: "1234567890123456789012345678901234567890"}});
            groupNumb.blur();
            expect(groupNumb.value).toBe("1234567890123456789012345678901234567890");
            
            const sibling = groupNumb.nextSibling;
            expect(sibling).toBeTruthy();
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Maximum length of 32 characters.');
            
        });
        

        test('Enter group number <=32 characters trigger, an error message should not be displayed to the user', async () => {
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
                "patient_zip_code":"78561"}
            };

            let location2 = {};
            location2.state = state;
            
            history.push("/emergency-contact", state);
            
            const { getByRole, getByTestId, getByText, getByPlaceholderText } = await render(
                    <EmergencyContact history={history} location={location2} />
                );

            const groupNumb = getByPlaceholderText("Group#");

            groupNumb.focus();
            fireEvent.change(groupNumb, {target: {value: "12345678901234567890"}});
            groupNumb.blur();
            expect(groupNumb.value).toBe("12345678901234567890");
            const sibling = groupNumb.nextSibling;
            
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
            
        });

    });
    
  });
