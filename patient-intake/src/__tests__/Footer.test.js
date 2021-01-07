import React from 'react';
import { render,screen,cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import Footer from '../components/Footer';

// REMINDER:
// Nested components within a component will be difficult to test.
// Test the nested component's functionality separately.
describe('Footer Component', () => {


    describe('Footer content', () => {
        beforeEach(() => {
        });
        
        afterEach(() => {
            cleanup();
        });
        
        test('Assert Copyright text in footer is present', () => {
          const { getByText } = render(<Footer />);
          const footerElement = getByText(/Patient Intake 2020/i);
          expect(footerElement).toBeInTheDocument();
          expect(footerElement).toBeVisible();
        });
        
        
    });

  });

