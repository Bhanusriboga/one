import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import BasicsDetails from "./BasicsDetails";
import { saveFormData, nextStep } from "../../redux/slices/RegistrationDetails";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockStore = configureStore([]);
const initialState = {
  stepper: {
    formData1: {},
  },
};
const store = mockStore(initialState);

store.dispatch = jest.fn();

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <BasicsDetails />
      </Router>
    </Provider>
  );

describe("BasicsDetails Component", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
    toast.success.mockClear();
  });

  test("renders all form fields", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Date of Birth")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Place of Birth")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Time of Birth")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Postal Code")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Door Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
  });

  test("handles input changes", () => {
    renderComponent();
    const dateOfBirthInput = screen.getByPlaceholderText("Date of Birth");
    fireEvent.change(dateOfBirthInput, {
      target: { name: "dateOfBirth", value: "1990-01-01" },
    });
    expect(dateOfBirthInput.value).toBe("1990-01-01");

    const placeOfBirthInput = screen.getByPlaceholderText("Place of Birth");
    fireEvent.change(placeOfBirthInput, {
      target: { name: "placeOfBirth", value: "City" },
    });
    expect(placeOfBirthInput.value).toBe("City");
  });

  test("validates required fields", async () => {
    renderComponent();
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(
        screen.getAllByText("This field is required").length
      ).toBeGreaterThan(0);
    });
  });

  test("validates postal code length", async () => {
    renderComponent();
    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    fireEvent.change(postalCodeInput, {
      target: { name: "postalCode", value: "123" },
    });
    fireEvent.blur(postalCodeInput);

    await waitFor(() => {
      expect(
        screen.getByText("Postal code must be 6 digits")
      ).toBeInTheDocument();
    });
  });

  test("handles time of birth input", async () => {
    renderComponent();
    const timeOfBirthInput = screen.getByPlaceholderText("Time of Birth");
    fireEvent.change(timeOfBirthInput, {
      target: { name: "timeOfBirth", value: new Date("2024-01-01T08:30:00") },
    });

    await waitFor(() => {
      const timeValue = screen.getByDisplayValue("8:30 AM");
      expect(timeValue).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Date of Birth"), {
      target: { name: "dateOfBirth", value: "1990-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("Place of Birth"), {
      target: { name: "placeOfBirth", value: "City" },
    });
    fireEvent.change(screen.getByPlaceholderText("Time of Birth"), {
      target: { name: "timeOfBirth", value: new Date("2024-01-01T08:30:00") },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { name: "postalCode", value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText("Caste"), {
      target: { name: "caste", value: "CasteName" },
    });
    fireEvent.change(screen.getByPlaceholderText("Subcaste"), {
      target: { name: "subCaste", value: "SubcasteName" },
    });

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "User Basic Details Registered Successfully",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        saveFormData(expect.any(Object))
      );
      expect(store.dispatch).toHaveBeenCalledWith(nextStep());
    });
  });

  test("shows error messages for invalid inputs", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { name: "postalCode", value: "123" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Postal Code"));

    await waitFor(() => {
      expect(
        screen.getByText("Postal code must be 6 digits")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Date of Birth"), {
      target: { name: "dateOfBirth", value: "" },
    });
    fireEvent.blur(screen.getByPlaceholderText("Date of Birth"));

    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  });

  test("renders and handles input changes for address fields", () => {
    renderComponent();
  
    // Test for Door Number input
    const doorNoInput = screen.getByPlaceholderText("Door Number");
    fireEvent.change(doorNoInput, {
      target: { name: "doorNo", value: "123A" },
    });
    expect(doorNoInput.value).toBe("123A");
  
    // Test for Street Number input
    const streetNoInput = screen.getByPlaceholderText("Street Number");
    fireEvent.change(streetNoInput, {
      target: { name: "streetNo", value: "45" },
    });
    expect(streetNoInput.value).toBe("45");
  
    // Test for City input
    const cityInput = screen.getByPlaceholderText("City");
    fireEvent.change(cityInput, {
      target: { name: "city", value: "Metropolis" },
    });
    expect(cityInput.value).toBe("Metropolis");
  
    // Test for State input
    const stateInput = screen.getByPlaceholderText("State");
    fireEvent.change(stateInput, {
      target: { name: "state", value: "New State" },
    });
    expect(stateInput.value).toBe("New State");
  
    // Test for Country input
    const countryInput = screen.getByPlaceholderText("Country");
    fireEvent.change(countryInput, {
      target: { name: "country", value: "Wonderland" },
    });
    expect(countryInput.value).toBe("Wonderland");
  
    // Test for Postal Code input
    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    fireEvent.change(postalCodeInput, {
      target: { name: "postalCode", value: "543210" },
    });
    expect(postalCodeInput.value).toBe("543210");
  });
  
  test("validates address fields correctly", async () => {
    renderComponent();
  
    // Trigger validation for Door Number
    const doorNoInput = screen.getByPlaceholderText("Door Number");
    fireEvent.change(doorNoInput, {
      target: { name: "doorNo", value: "" },
    });
    fireEvent.blur(doorNoInput);
  
    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  
    // Trigger validation for City
    const cityInput = screen.getByPlaceholderText("City");
    fireEvent.change(cityInput, {
      target: { name: "city", value: "" },
    });
    fireEvent.blur(cityInput);
  
    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  
    // Trigger validation for State
    const stateInput = screen.getByPlaceholderText("State");
    fireEvent.change(stateInput, {
      target: { name: "state", value: "" },
    });
    fireEvent.blur(stateInput);
  
    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  
    // Trigger validation for Country
    const countryInput = screen.getByPlaceholderText("Country");
    fireEvent.change(countryInput, {
      target: { name: "country", value: "" },
    });
    fireEvent.blur(countryInput);
  
    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });
  
    // Trigger validation for Postal Code
    const postalCodeInput = screen.getByPlaceholderText("Postal Code");
    fireEvent.change(postalCodeInput, {
      target: { name: "postalCode", value: "123" },
    });
    fireEvent.blur(postalCodeInput);
  
    await waitFor(() => {
      expect(screen.getByText("Postal code must be 6 digits")).toBeInTheDocument();
    });
  });
  
});

