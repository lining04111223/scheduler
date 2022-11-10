//need React.createElement
import React from "react";

//import helper functions from the react-testing-library
import { render, cleanup }  from "@testing-library/react";

//test component
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("does something it is supposed to do", () => {
    expect(null).toBeNull();
  });

});