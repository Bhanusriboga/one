import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Professional from "./Professional";
import {
  saveProfessionalData,
  nextStep,
  prevStep,
} from "../../redux/slices/RegistrationDetails";

const mockStore = configureStore([]);
const initialState = {
  registration: {
    ProfessionalData: {},
  },
};
const store = mockStore(initialState);

store.dispatch = jest.fn();

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Router>
        <Professional />
      </Router>
    </Provider>
  );

describe("Professional Component", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
  });

  test("renders all input fields and buttons", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/education/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/year/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/occupation/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/employment/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/location/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/state/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/annual income/i)).toBeInTheDocument();
    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
    expect(screen.getByText(/skip & register later/i)).toBeInTheDocument();
  });

  test("handles input changes", () => {
    renderComponent();
    const educationInput = screen.getByPlaceholderText(/education/i);
    fireEvent.change(educationInput, { target: { value: "Masters" } });
    expect(educationInput.value).toBe("Masters");
  });

  test("validates and submits the form", async () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/education/i), {
      target: { value: "Masters" },
    });
    fireEvent.change(screen.getByPlaceholderText(/year/i), {
      target: { value: "2020" },
    });
    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: "XYZ Institute" },
    });
    fireEvent.change(screen.getByPlaceholderText(/occupation/i), {
      target: { value: "Corporate Employee" },
    });
    fireEvent.change(screen.getByPlaceholderText(/employment/i), {
      target: { value: "Full Time" },
    });
    fireEvent.change(screen.getByPlaceholderText(/location/i), {
      target: { value: "City Center" },
    });
    fireEvent.change(screen.getByPlaceholderText(/state/i), {
      target: { value: "California" },
    });
    fireEvent.change(screen.getByPlaceholderText(/city/i), {
      target: { value: "Los Angeles" },
    });
    fireEvent.change(screen.getByPlaceholderText(/annual income/i), {
      target: { value: "10 - 12 Lakhs" },
    });

    fireEvent.click(screen.getByText(/next/i));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(saveProfessionalData(expect.any(Object)));
      expect(store.dispatch).toHaveBeenCalledWith(nextStep());
    });
  });

  test("shows validation errors on empty required fields", async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/next/i));

    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
    });
  });

  test("handles previous button click", () => {
    renderComponent();
    fireEvent.click(screen.getByText(/previous/i));
    expect(store.dispatch).toHaveBeenCalledWith(prevStep());
  });

  test("initializes fields from state", () => {
    const customStore = mockStore({
      registration: {
        ProfessionalData: {
          highestEducation: "Bachelors",
          yearOfPassing: "2018",
        },
      },
    });

    render(
      <Provider store={customStore}>
        <Router>
          <Professional />
        </Router>
      </Provider>
    );

    expect(screen.getByDisplayValue(/bachelors/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2018/i)).toBeInTheDocument();
  });
  test("shows validation errors and does not submit with incomplete data", async () => {
    renderComponent();

    // Leave all fields empty and try to submit
    fireEvent.click(screen.getByText(/next/i));

    await waitFor(() => {
      expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
      // Ensure the dispatch for saveProfessionalData is not called
      expect(store.dispatch).not.toHaveBeenCalledWith(saveProfessionalData(expect.any(Object)));
      // Ensure the dispatch for nextStep is not called
      expect(store.dispatch).not.toHaveBeenCalledWith(nextStep());
    });
  });

  test("navigates to dashboard on skip button click", () => {
    renderComponent();

    // Mock history object to check navigation
    const history = {
      push: jest.fn(),
    };

    render(
      <Provider store={store}>
        <Router>
          <Professional />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText(/skip & register later/i));

    expect(history.push).toHaveBeenCalledWith('/dashboard');
  });
  test("shows validation error for required fields on blur", async () => {
    renderComponent();
  
    // Focus and blur the 'education' input without entering a value
    const educationInput = screen.getByPlaceholderText(/education/i);
    fireEvent.focus(educationInput);
    fireEvent.blur(educationInput);
  
    await waitFor(() => {
      // Check if the error message for 'education' field is shown
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });
  
    // Focus and blur the 'yearOfPassing' input with an invalid year
    const yearInput = screen.getByPlaceholderText(/year/i);
    fireEvent.change(yearInput, { target: { value: "202" } }); // Invalid year
    fireEvent.blur(yearInput);
  
    await waitFor(() => {
      // Check if the error message for 'yearOfPassing' field is shown
      expect(screen.getByText(/enter a valid 4-digit year/i)).toBeInTheDocument();
    });
  
    // Fix the year input to a valid year
    fireEvent.change(yearInput, { target: { value: "2022" } });
    fireEvent.blur(yearInput);
  
    await waitFor(() => {
      // Check if the error message for 'yearOfPassing' field is removed
      expect(screen.queryByText(/enter a valid 4-digit year/i)).not.toBeInTheDocument();
    });
  });
  test("shows no validation error for non-required fields on blur", async () => {
    renderComponent();
  
    // Focus and blur the 'nameOfTheInstitute' input without entering a value
    const instituteInput = screen.getByPlaceholderText(/name/i);
    fireEvent.focus(instituteInput);
    fireEvent.blur(instituteInput);
  
    await waitFor(() => {
      // No validation message should be shown as this field is not required
      expect(screen.queryByText(/this field is required/i)).not.toBeInTheDocument();
    });
  });
    
});



// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import { BrowserRouter as Router } from "react-router-dom";
// import Professional from "./Professional";
// import {
//   saveProfessionalData,
//   nextStep,
//   prevStep,
// } from "../../redux/slices/RegistrationDetails";

// const mockStore = configureStore([]);
// const initialState = {
//   registration: {
//     ProfessionalData: {},
//   },
// };
// const store = mockStore(initialState);

// store.dispatch = jest.fn();

// const renderComponent = () =>
//   render(
//     <Provider store={store}>
//       <Router>
//         <Professional />
//       </Router>
//     </Provider>
//   );

// describe("Professional Component", () => {
//   beforeEach(() => {
//     store.dispatch.mockClear();
//   });

//   // Existing test cases...

//   test("shows validation errors and does not submit with incomplete data", async () => {
//     renderComponent();

//     // Leave all fields empty and try to submit
//     fireEvent.click(screen.getByText(/next/i));

//     await waitFor(() => {
//       expect(screen.getAllByText(/this field is required/i).length).toBeGreaterThan(0);
//       // Ensure the dispatch for saveProfessionalData is not called
//       expect(store.dispatch).not.toHaveBeenCalledWith(saveProfessionalData(expect.any(Object)));
//       // Ensure the dispatch for nextStep is not called
//       expect(store.dispatch).not.toHaveBeenCalledWith(nextStep());
//     });
//   });

//   test("navigates to dashboard on skip button click", () => {
//     renderComponent();

//     // Mock history object to check navigation
//     const history = {
//       push: jest.fn(),
//     };

//     render(
//       <Provider store={store}>
//         <Router>
//           <Professional />
//         </Router>
//       </Provider>
//     );

//     fireEvent.click(screen.getByText(/skip & register later/i));

//     expect(history.push).toHaveBeenCalledWith('/dashboard');
//   });
// });
