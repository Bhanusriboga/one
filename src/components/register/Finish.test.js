import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Finish from "./Finish";
import { saveTextArea, prevStep } from "../../redux/slices/RegistrationDetails";

const mockStore = configureStore([]);
const initialState = {
  registration: {
    textArea: "",
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const renderComponent = (storeOverride = store) =>
  render(
    <Provider store={storeOverride}>
      <Router>
        <Finish />
      </Router>
    </Provider>
  );

describe("Finish Component", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
  });

  test("renders text area, buttons, and links", () => {
    renderComponent();
    expect(screen.getByText("Describe Yourself")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("previous")).toBeInTheDocument();
    expect(screen.getByText("Skip & Register later")).toBeInTheDocument();
  });

  test("handles text area input changes", () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New text" } });
    expect(screen.getByRole("textbox").value).toBe("New text");
  });

  test("shows error message for less than 10 characters on submit", () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Short" } });
    fireEvent.click(screen.getByText("Save"));
    expect(screen.getByText("Please describe yourself in at least 10 characters.")).toBeInTheDocument();
  });

  test("dispatches saveTextArea and shows modal on valid submit", async () => {
    renderComponent();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Valid text more than 10 characters" } });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(saveTextArea("Valid text more than 10 characters"));
      expect(screen.getByText("Registered Successfully")).toBeInTheDocument();
    });
  });

  test("toggles modal visibility on Cancel click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Save"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Registered Successfully")).not.toBeInTheDocument();
  });

  test("dispatches prevStep on previous button click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("previous"));
    expect(store.dispatch).toHaveBeenCalledWith(prevStep());
  });

  test("navigates to dashboard on link click", () => {
    renderComponent();
    const dashboardLink = screen.getByText("Go to Dashboard");
    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
  });

  test("does not dispatch saveTextArea or prevStep on Skip button click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("Skip & Register later"));
    expect(store.dispatch).not.toHaveBeenCalledWith(saveTextArea(expect.any(String)));
    expect(store.dispatch).not.toHaveBeenCalledWith(prevStep());
  });
});