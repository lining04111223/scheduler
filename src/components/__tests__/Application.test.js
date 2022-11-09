//need React.createElement
import React from "react";

//import helper functions from the react-testing-library
import { render, cleanup } from "@testing-library/react";

//test component
import Application from "components/Application";

afterEach(cleanup);

//A test that renders a React Component
it("renders without crashing", () => {
  render(<Application />);
});
