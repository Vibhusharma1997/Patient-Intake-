import React from 'react';
import { render,screen,cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import Home from '../components/Home';

// REMINDER:
// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('Home Component', () => {


    describe('Test homepage has expected elements & text', () => {
        beforeEach(() => {
            const { getByText } = render(<Home />);
        });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Assert Welcome text on screen', () => {
          const headerElement = screen.getByText(/Patient check-in/i);
          expect(headerElement).toBeInTheDocument();
        });
        
        test('Assert Copyright in footer on homepage only, is present', () => {
          const headerElement = screen.getByText(/Patient Intake 2020/i);
          expect(headerElement).toBeInTheDocument();
        });
        
        test('Assert Patient Information should not be present on the home page', () => {
          const headerElement = screen.queryByText('Home / Patient Information');
          expect(headerElement).not.toBeInTheDocument();
          
        });
        
        
        
    });

// test if button element is even present
    describe('Test begin button element is present', () => {
        
        beforeEach(() => {
            const { getByText } = render(<Home />);
        });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Check-in intro paragraph present', () => {
          const introCopy = screen.getByText(/identification/i);
          expect(introCopy).toBeInTheDocument();
        });
        
        
        test('Begin Check in Button is on home page', () => {
          const linkElement = screen.getByTestId('begin-button');
          expect(linkElement).toBeInTheDocument();
        });
        
     });

  });

