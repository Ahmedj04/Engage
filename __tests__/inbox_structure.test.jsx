import { fireEvent, render, screen } from '@testing-library/react'
import Inbox from '../pages/property/inbox'
import '@testing-library/jest-dom'

// Checking Inbox page loading
describe('Check if basicdetails page loads correctly', () => {
    beforeEach(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
              matches: false,
              media: query,
              onchange: null,
              addListener: jest.fn(), // Deprecated
              removeListener: jest.fn(), // Deprecated
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            }))
          });
        render(<Inbox />);
    });
    
    // Inbox (List of messages) Table
    test('Does inbox table for messages exist', () => {
        const inboxTable = screen.getByTestId("test_inbox_table")
        expect(inboxTable).toBeInTheDocument();
    })

})  