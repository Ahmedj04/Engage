import { fireEvent, render, screen } from '@testing-library/react'
import ReadMessage from '../pages/property/inbox/readmessage'
import '@testing-library/jest-dom'

// Checking Inbox page loading
describe('Check if read message page loads correctly', () => {
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
        render(<ReadMessage />);
    });

    //  //test reply button 
    //  test("To detect reply button click",()=>{
    //     const reply_btn=screen.getByTestId("test-reply-button");
    //      fireEvent.click(reply_btn);
        
    //    })
    
    // Email Field
    test('Does Inbox page has email input field for reply', () => {
       //fetching button
        const reply_btn=screen.getByTestId("test-reply-button");
        //clicking button to make email field available 
        fireEvent.click(reply_btn);
       
        const email = screen.getByTestId("test_email")
        expect(email).toBeInTheDocument();
    })
    
    // Message Field
    test("Email field is required for reply", () => {
        const reply_btn=screen.getByTestId("test-reply-button");
        fireEvent.click(reply_btn);
       expect(screen.getByTestId("test_email")).toBeRequired();
    })

    test('Does Inbox page has message textbox field for reply', () => {
        //fetching button
         const reply_btn=screen.getByTestId("test-reply-button");
         //clicking button to make email field available 
         fireEvent.click(reply_btn);
         const message = screen.getByTestId("test_message")
         expect(message).toBeInTheDocument();
     })
     
     // Message Field
     test("Message field is required for reply", () => {
         const reply_btn=screen.getByTestId("test-reply-button");
         fireEvent.click(reply_btn);
        expect(screen.getByTestId("test_message")).toBeRequired();
     })


    //  test buttons 
     test("Read Message has 14 buttons total:inbox, delete, reply, send and cancel\'s", () => {
        const reply_btn=screen.getByTestId("test-reply-button");
         fireEvent.click(reply_btn);
        const btns= screen.getAllByRole("button");
        expect(btns.length===14).toBeTruthy();
      })

})  