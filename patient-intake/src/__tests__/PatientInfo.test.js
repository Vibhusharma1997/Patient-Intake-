import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import PatientInfo from '../components/PatientInfo';

// REMINDER:
// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('PatientInfo Component', () => {
    
    describe('Test First name, middle name, and last name', () => {
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        
        
        test('Assert Next button is disabled on initial screen render', () => {
            const { getByRole } = render(<PatientInfo />);
            expect(getByRole('button')).toHaveAttribute('disabled');
        });
        
        
        test('Assert value entered in First Name input field is the expected value', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const firstNameInput = queryByPlaceholderText("First Name");
            firstNameInput.focus();
            fireEvent.change(firstNameInput, {target: {value: "Christopher"}});
            firstNameInput.blur();
            expect(firstNameInput.value).toBe("Christopher");
            // expect(getByRole('button')).toHaveAttribute('disabled');
        });
        
        
        test('Assert Next button remained disabled because requirements are not met', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const firstNameInput = queryByPlaceholderText("First Name");
            firstNameInput.focus();
            fireEvent.change(firstNameInput, {target: {value: "Christopher"}});
            firstNameInput.blur();
            expect(firstNameInput.value).toBe("Christopher");
            expect(getByRole('button')).toHaveAttribute('disabled');
        });
        
        
        test('Assert leaving First Name input field blank triggers error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const firstNameInput = queryByPlaceholderText("First Name");
            firstNameInput.focus();
            firstNameInput.blur();

            expect(firstNameInput.value).toBe("");
            
            const sibling = firstNameInput.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Field is required.');
        });
        
        test('Entering First Name greater than 32 characters triggers error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const firstNameInput = queryByPlaceholderText("First Name");
            firstNameInput.focus();
            fireEvent.change(firstNameInput, {target: {value: "ChristopherChristopherChristopherChristopher"}});
            firstNameInput.blur();
            expect(firstNameInput.value).toBe("ChristopherChristopherChristopherChristopher");
            
            const sibling = firstNameInput.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Maximum length of 32 characters.');
        });
        
        
        test('Enter a long First Name, <32 characters, in input field does not triggger error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const firstNameInput = queryByPlaceholderText("First Name");
            firstNameInput.focus();
            fireEvent.change(firstNameInput, {target: {value: "ChristopherChristopher"}});
            firstNameInput.blur();
            expect(firstNameInput.value).toBe("ChristopherChristopher");
            
            const sibling = firstNameInput.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
        });
        
        
        test('Leaving Middle Name input field blank should not trigger an error to be displayed', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const middleNameInput = queryByPlaceholderText("Middle Name");
            middleNameInput.focus();
            middleNameInput.blur();

            expect(middleNameInput.value).toBe("");
            
            const sibling = middleNameInput.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
        });
        
        
        test('Entering Middle Name greater than 32 characters triggers error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const middleNameInput = queryByPlaceholderText("Middle Name");
            middleNameInput.focus();
            fireEvent.change(middleNameInput, {target: {value: "ChristopherStevenEvansRogersBarnes"}});
            middleNameInput.blur();
            expect(middleNameInput.value).toBe("ChristopherStevenEvansRogersBarnes");
            
            const sibling = middleNameInput.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Maximum length of 32 characters.');
        });
        
        
        test('Enter a long Middle Name, <32 characters, in input field does not triggger error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const middleNameInput = queryByPlaceholderText("Middle Name");
            middleNameInput.focus();
            fireEvent.change(middleNameInput, {target: {value: "ChristopherChristopher"}});
            middleNameInput.blur();
            expect(middleNameInput.value).toBe("ChristopherChristopher");
            
            const sibling = middleNameInput.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
        });
        
        
        test('Assert leaving Last Name input field blank triggers error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const lastNameInput = queryByPlaceholderText("Last Name");
            lastNameInput.focus();
            lastNameInput.blur();

            expect(lastNameInput.value).toBe("");
            
            const sibling = lastNameInput.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Field is required.');
        });
        
        test('Entering Last Name greater than 32 characters triggers error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const lastNameInput = queryByPlaceholderText("Last Name");
            lastNameInput.focus();
            fireEvent.change(lastNameInput, {target: {value: "ChristopherChristopherChristopherChristopher"}});
            lastNameInput.blur();
            expect(lastNameInput.value).toBe("ChristopherChristopherChristopherChristopher");
            
            const sibling = lastNameInput.nextSibling;
            expect(sibling).toBeVisible();
            expect(sibling).toBeInTheDocument();
            expect(sibling).toHaveClass('invalid-feedback');
            expect(sibling).toHaveTextContent('Maximum length of 32 characters.');
        });
        
        
        test('Enter a long Last Name, <32 characters, in input field does not triggger error message rendering', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const lastNameInput = queryByPlaceholderText("Last Name");
            lastNameInput.focus();
            fireEvent.change(lastNameInput, {target: {value: "ChristopherChristopher"}});
            lastNameInput.blur();
            expect(lastNameInput.value).toBe("ChristopherChristopher");
            
            const sibling = lastNameInput.nextSibling;
            expect(sibling).toBeFalsy();
            expect(sibling).not.toBeInTheDocument();
        });
        
    });
    
    
    
    describe('Test Phone Number, Email, & Gender Drop down', () => {
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Assert value entered in Phone number input field is the expected value', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const phoneNumInput = queryByPlaceholderText("Phone Number");
            phoneNumInput.focus();
            fireEvent.change(phoneNumInput, {target: {value: "7513942266"}});
            phoneNumInput.blur();
            expect(phoneNumInput.value).toBe("7513942266");
        });
        
       
    });
    
    
    describe('Test Date of Birth, State Selection, & zip code', () => {
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Assert value entered in date of birth input field is the expected value', () => {
            const { getByRole, queryByPlaceholderText } = render(<PatientInfo />);
            const dobInput = queryByPlaceholderText("YYYY-MM-DD");
            dobInput.focus();
            fireEvent.change(dobInput, {target: {value: "1980-12-20"}});
            dobInput.blur();
            expect(dobInput.value).toBe("1980-12-20");
        });
        
    
    });
    
    
    
  });
