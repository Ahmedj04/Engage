import { fireEvent, render, screen } from '@testing-library/react'
import Address from '../../pages/property/address'
import '@testing-library/jest-dom'
import Footer from '../../components/Footer'

// here i imported router & mocked router
import Router from 'next/router'
jest.mock('next/router', ()=> ({push: jest.fn()}))

// checking the address page loads correctly
describe('Check if address page loads correctly', () => {
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
      render(<Address/>);
      render(<footer/>)
    });

// NAVBAR
    test("Does navbar exists", () => {
      expect(screen.getByTestId("nav")).toBeInTheDocument();
      })

      test("Does footer exists", () => {
        expect(screen.getByTestId("footer")).toBeInTheDocument();
        })
    // address form
    test("Does address form exist", () => {
    expect(screen.getByTestId('main address')).toBeInTheDocument();
    })

    test("Does street input exist", () => {
      expect(screen.getByTestId('street')).toBeInTheDocument();
      })
    
      test("Does landmark input exist", () => {
        expect(screen.getByTestId('landmark')).toBeInTheDocument();
        })

        
      test("Does country input exist", () => {
        expect(screen.getByTestId('country')).toBeInTheDocument();
        })

           
      test("Does select province exist", () => {
        expect(screen.getByTestId('province')).toBeInTheDocument();
        })

        test("Does select city exist", () => {
          expect(screen.getByTestId('city')).toBeInTheDocument();
          })

          test("Does postal code input exist", () => {
            expect(screen.getByTestId('postal code')).toBeInTheDocument();
            })

            test("Does latitude input exist", () => {
              expect(screen.getByTestId('longitude')).toBeInTheDocument();
              })

              
            test("Does longitude input exist", () => {
              expect(screen.getByTestId('longitude')).toBeInTheDocument();
              })

              test("Does precision input exist", () => {
                expect(screen.getByTestId('precision')).toBeInTheDocument();
                })

               test("Does update address button hotel details exists", () => {
                 expect(screen.getByTestId("update")).toBeInTheDocument();
                   })
    
                  expect(Router.push).toHaveBeenCalledWith('/members')
                          })
   