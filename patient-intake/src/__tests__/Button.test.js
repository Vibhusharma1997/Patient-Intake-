import React from 'react';
import { render, screen,cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
//@testing-library/jest-dom
import Button from '../components/Button';
import PatientInfo from '../components/PatientInfo';
import App from '../App';

// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('Testing Button component', () => {


    describe('Button component rendering correctly', () => {
        // beforeEach(() => {
        //     const { getByText, getByTestId } = render(<Button propid="patient-button" label="Begin Check In >>" link="/patient-info" />);
        // });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Button component renders in document', () => {
            const { getByText, getByTestId } = render(<Button propid="patient-button" label="Begin Check In >>" link="/patient-info" />);
        // const handleClick = jest.fn()
            const buttonElement = getByTestId("patient-button");
            expect(buttonElement).toBeInTheDocument();
        });
        
        
        test('Button component renders with passed ID', () => {
            const { getByText, getByTestId } = render(<Button propid="patient-button" label="Begin Check In >>" link="/patient-info" />);
        // const handleClick = jest.fn()
            const buttonElement = getByTestId("patient-button");
            expect(buttonElement).toBeTruthy();
        });
        
        test('Button not disabled', () => {
            const { getByText, getByTestId } = render(<Button propid="patient-button" label="Begin Check In >>" link="/patient-info" />);
        // const handleClick = jest.fn()
            const buttonElement = getByTestId("patient-button");
            expect(buttonElement).toBeEnabled();
        });
        
        test.skip('Button click on homepage', () => {
        render(
                <Router>
                    <App/>
                </Router>
                );
        // const handleClick = jest.fn()
        expect(screen.getByText(/Welcome to Patient Check-In/i)).toBeInTheDocument();
        const buttonElement = screen.getByTestId("begin-button");
        const leftClick = { button: 0 };
        userEvent.click(buttonElement, leftClick);
        expect(screen.getByText(/Patient Information/i)).toBeInTheDocument();
        });

        
    });
 

  });

// test if the click on button takes the user to expected page - url check
// mock functions needed


