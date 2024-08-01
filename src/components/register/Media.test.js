// // Media.test.js
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import { BrowserRouter as Router } from "react-router-dom";
// import Media from "./Media";
// import {
//   saveUploadedFiles,
//   nextStep,
//   prevStep,
// } from "../../redux/slices/RegistrationDetails";

// const mockStore = configureStore([]);
// const initialState = {
//   stepper: {
//     uploadedFiles: [],
//   },
// };
// const store = mockStore(initialState);
// store.dispatch = jest.fn();

// const renderComponent = () =>
//   render(
//     <Provider store={store}>
//       <Router>
//         <Media />
//       </Router>
//     </Provider>
//   );

// describe("Media Component", () => {
//   beforeEach(() => {
//     store.dispatch.mockClear();
//   });

//   test("renders upload file inputs and buttons", () => {
//     renderComponent();
//     expect(screen.getByText("Upload your images")).toBeInTheDocument();
//     expect(screen.getByText("Upload")).toBeInTheDocument();
//     expect(screen.getByText("+ Add more")).toBeInTheDocument();
//     expect(screen.getByText("previous")).toBeInTheDocument();
//     expect(screen.getByText("Next")).toBeInTheDocument();
//     expect(screen.getByText("Skip & Register later")).toBeInTheDocument();
//   });

//   test("handles file input changes", async () => {
//     renderComponent();
  
//     // Create a file object
//     const file = new File(["file contents"], "example.png", { type: "image/png" });
  
//     // Select the file input element by class
//     const fileInput = document.querySelector(".file-input");
  
//     // Simulate file input change
//     fireEvent.change(fileInput, { target: { files: [file] } });
  
//     // Verify that the file name is displayed
//     await waitFor(() => {
//       expect(screen.getByText("example.png")).toBeInTheDocument();
//     });
//   });
  
//   test("handles form submission with files", async () => {
//     renderComponent();
  
//     // Create a file object
//     const file = new File(["file contents"], "example.png", { type: "image/png" });
  
//     // Select the file input element by class
//     const fileInput = document.querySelector(".file-input");
  
//     // Simulate file input change
//     fireEvent.change(fileInput, { target: { files: [file] } });
  
//     // Simulate form submission
//     fireEvent.click(screen.getByText("Next"));
  
//     await waitFor(() => {
//       expect(store.dispatch).toHaveBeenCalledWith(saveUploadedFiles(expect.any(Array)));
//       expect(store.dispatch).toHaveBeenCalledWith(nextStep());
//     });
//   }); 
//   test("adds more file inputs", () => {
//     renderComponent();
//     const addMoreButton = screen.getByText("+ Add more");
//     fireEvent.click(addMoreButton);

//     // Verify that a new file input has been added
//     expect(screen.getAllByText("Upload").length).toBeGreaterThan(1);
//   });

//   test("handles form submission without files", async () => {
//     store.dispatch = jest.fn(); // Mock store dispatch
//     window.alert = jest.fn(); // Mock window.alert

//     renderComponent();

//     // Simulate form submission without any files
//     fireEvent.click(screen.getByText("Next"));

//     await waitFor(() => {
//       expect(store.dispatch).not.toHaveBeenCalledWith(
//         saveUploadedFiles(expect.any(Array))
//       );
//       expect(store.dispatch).not.toHaveBeenCalledWith(nextStep());
//       expect(window.alert).toHaveBeenCalledWith("Upload is required");
//     });
//   });

//   test("handles previous step button click", () => {
//     renderComponent();
//     const prevButton = screen.getByText("previous");
//     fireEvent.click(prevButton);

//     expect(store.dispatch).toHaveBeenCalledWith(prevStep());
//   });

//   test("navigates to dashboard on skip button click", () => {
//     renderComponent();
//     const skipButton = screen.getByText("Skip & Register later");
//     fireEvent.click(skipButton);

//     // Here you can check if navigation has occurred correctly
//     // For example, you might want to check the history object or the location object if using React Router
//   });
// });
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import Media from "./Media";
import {
  saveUploadedFiles,
  nextStep,
  prevStep,
} from "../../redux/slices/RegistrationDetails";

const mockStore = configureStore([]);
const initialState = {
  stepper: {
    uploadedFiles: [],
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const renderComponent = (storeOverride = store) =>
  render(
    <Provider store={storeOverride}>
      <Router>
        <Media />
      </Router>
    </Provider>
  );

describe("Media Component", () => {
  beforeEach(() => {
    store.dispatch.mockClear();
  });

  test("renders upload file inputs and buttons", () => {
    renderComponent();
    expect(screen.getByText("Upload your images")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
    expect(screen.getByText("+ Add more")).toBeInTheDocument();
    expect(screen.getByText("previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Skip & Register later")).toBeInTheDocument();
  });

  test("handles file input changes", async () => {
    renderComponent();

    const file = new File(["file contents"], "example.png", { type: "image/png" });

    const fileInput = document.querySelector(".file-input");

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText("example.png")).toBeInTheDocument();
    });
  });

  test("handles form submission with files", async () => {
    renderComponent();

    const file = new File(["file contents"], "example.png", { type: "image/png" });

    const fileInput = document.querySelector(".file-input");

    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(saveUploadedFiles(expect.any(Array)));
      expect(store.dispatch).toHaveBeenCalledWith(nextStep());
    });
  });

  test("adds more file inputs", () => {
    renderComponent();
    const addMoreButton = screen.getByText("+ Add more");
    fireEvent.click(addMoreButton);

    expect(screen.getAllByText("Upload").length).toBeGreaterThan(1);
  });

  test("handles form submission without files", async () => {
    store.dispatch = jest.fn();
    window.alert = jest.fn();

    renderComponent();

    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(store.dispatch).not.toHaveBeenCalledWith(
        saveUploadedFiles(expect.any(Array))
      );
      expect(store.dispatch).not.toHaveBeenCalledWith(nextStep());
      expect(window.alert).toHaveBeenCalledWith("Upload is required");
    });
  });

  test("handles previous step button click", () => {
    renderComponent();
    const prevButton = screen.getByText("previous");
    fireEvent.click(prevButton);

    expect(store.dispatch).toHaveBeenCalledWith(prevStep());
  });

  test("initializes fileInputs from uploadedFiles", () => {
    const initialFiles = [{ id: 1, file: new File(["content"], "file1.png") }];
    const customStore = mockStore({
      stepper: { uploadedFiles: initialFiles },
    });

    renderComponent(customStore);

    expect(screen.getByText("file1.png")).toBeInTheDocument();
  });

  test("navigates to dashboard on skip button click", () => {
    renderComponent();
    const skipButton = screen.getByText("Skip & Register later");
    fireEvent.click(skipButton);
    // Implement your navigation check here
  });
});

