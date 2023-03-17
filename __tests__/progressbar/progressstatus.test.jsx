import { render, screen, within } from "@testing-library/react";
import ProgressStatus from "../../components/progressStatus";
import "@testing-library/jest-dom";
import Color from "../../components/colors/Color";
import axios from "axios";
//progressStatus
describe("Check progresstatus exists correctly", () => {
beforeEach(() => {
Object.defineProperty(window, "matchMedia", {
writable: true,
value: jest.fn().mockImplementation((query) => ({
matches: false,
media: query,
onchange: null,
addListener: jest.fn(), // Deprecated
removeListener: jest.fn(), // Deprecated
addEventListener: jest.fn(),
removeEventListener: jest.fn(),
dispatchEvent: jest.fn(),
})),
});
});
//testing the main div (parent element)
test("Does parent element exists", () => {
render(
<ProgressStatus 
name={["Upload Image", "Image Details"]}
selected={1}
color={Color.light}
/>
);
// Checking the child0
expect(screen.getByTestId("child0")).toBeInTheDocument();
});

test('check main exists',()=>{
    render(<ProgressStatus name={['Upload Image', 'Image Details']} selected={2} color={Color.light} />);
    const main = screen.getByTestId('main');
       const child0=within(main).getByTestId("child0")
          expect(main).toContainElement(child0) 
              })

    test("Does child0 element exists", ()=>{
    render(<ProgressStatus name={['Upload Image', 'Image Details']} selected={2} color={Color.light} />);
    expect(screen.getByTestId("child0")).toBeInTheDocument();
    });

test("Does child element exists", ()=>{
    render(<ProgressStatus name={[]} selected={1} color={Color.light} />);
    expect(screen.getByTestId("main")).toBeInTheDocument();
    });
test("Does child element exists", ()=>{
render(<ProgressStatus name={[]} selected={1} color={Color.light} />);
expect(screen.getByTestId("no-name")).toBeInTheDocument();
});
//light color & name
test("Does child1 element exists",()=>{
render(<ProgressStatus name={['Upload Image', 'Image Details']} selected={1} color={Color.light}/>);
expect(screen.getByTestId("child1")).toBeInTheDocument();
});

//dark color & selected 1
test("Does child1 element exists",()=>{
render(<ProgressStatus name={['Upload Image', 'Image Details']} selected={1} color={Color.dark} />);
expect(screen.getByTestId("child1")).toBeInTheDocument();
});
//checking Selected element 2
test("Does child1 element exists",()=>{
render(<ProgressStatus name={['Upload Image', 'Image Details']} selected={2} color={Color.dark} />);
expect(screen.getByTestId("child1")).toBeInTheDocument();
});
});

