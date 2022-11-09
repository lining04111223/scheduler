//need React.createElement
import React from "react";
import { fireEvent,waitForElement } from "@testing-library/react";

//import helper functions from the react-testing-library
import { render, cleanup } from "@testing-library/react";

//test component
import Application from "components/Application";

afterEach(cleanup);

//A test that renders a React Component
it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});
