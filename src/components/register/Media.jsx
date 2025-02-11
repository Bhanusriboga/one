import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "reactstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { prevStep, saveUploadedFiles, nextStep, uploadedFilesAPICall } from "../../redux/slices/RegistrationDetails";
import "./Media.css";

function Media() {
  const dispatch = useDispatch();
  const { uploadedFiles } = useSelector((store) => store.RegistrationDetails);

  const [fileInputs, setFileInputs] = useState(
    uploadedFiles.length > 0
      ? uploadedFiles
      : [{ id: Math.random(), file: null }]
  );

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setFileInputs(uploadedFiles);
    }
  }, [uploadedFiles]);

  const fileInputRefs = useRef([]);

  const handleFileChange = async (id, event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newFileInputs = fileInputs.map((input) => {
        if (input.id === id) {
          return { ...input, file };
        }
        return input;
      });
      setFileInputs(newFileInputs);
      await uploadImage(file, index);  
    }
  };

  const handleAddMore = () => {
    setFileInputs([...fileInputs, { id: Math.random(), file: null }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(saveUploadedFiles(fileInputs));
    dispatch(nextStep());
  };

  const prev = () => {
    dispatch(prevStep());
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
       await dispatch(uploadedFilesAPICall(formData));
      // Handle success (e.g., update state, show success message)
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="register4-maincontainer">
      <Form>
        {fileInputs.map((input, index) => (
          <div key={input.id} className="upload-container">
            <p className="upload-imag-text">Upload your images</p>
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleFileChange(input.id, e, index)}  // Pass index to handleFileChange
              className="file-input"
              style={{ display: "none" }}
            />

            <div className="Registration4-upload-btn">
              <button
                type="button"
                className="upload-btn"
                onClick={() => fileInputRefs.current[index]?.click()}
              >
                Upload
              </button>
              <span className="file-name">
                {input.file ? input.file.name : "No file chosen"}
              </span>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddMore} className="add-more-btn">
          + Add more
        </button>
        <div className="back-next-btn-container">
          <button className="previous-btn" onClick={prev}>
            {" "}
            <FaArrowLeft
              style={{
                paddingRight: "5px",
                fontSize: "25px",
                paddingTop: "5px",
              }}
            />
            previous
          </button>
          <button className="previous-btn" onClick={handleSubmit}>
            Next
            <FaArrowRight
              style={{
                paddingLeft: "5px",
                alignSelf: "center",
                fontSize: "25px",
                paddingTop: "5px",
              }}
            />
          </button>
        </div>
        <Link className="skip-btn" to="/dashboard"> Skip & Register later</Link>
      </Form>
    </div>
  );
}

export default Media;