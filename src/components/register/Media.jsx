import React, { useState, useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Form} from "reactstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { prevStep ,saveUploadedFiles, nextStep,uploadedFilesAPICall } from "../../redux/slices/RegistrationDetails";
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

  const handleFileChange = (id, event) => {
    const newFileInputs = fileInputs.map((input) => {
      if (input.id === id) {
        return { ...input, file: event.target.files[0] };
      }
      return input;
    });
    setFileInputs(newFileInputs);
  };

  const handleAddMore = () => {
    setFileInputs([...fileInputs, { id: Math.random(), file: null }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData();
    // fileInputs.forEach((input, index) => {
    //   if (input.file) {
    //     formData.append(`file${index + 1}`, input.file);
    //   }
    // });
    // if (fileInputs.some((input) => input.file !== null)) {
      dispatch(saveUploadedFiles(fileInputs));
      dispatch(nextStep());
    // } else {
    //   alert("Upload is required");
    // }
  };
  const prev = ()=>{
    dispatch(prevStep())
  }

  const uploadImage = async (index) => {
    const file = fileInputRefs.current[index]?.click()
    const formData = new FormData();
    formData.append("file", file)
   const data = await dispatch(uploadedFilesAPICall(formData))
  }

  return (
    <div className="register4-maincontainer">
      <Form>
        {fileInputs.map((input, index) => (
          <div key={input.id} className="upload-container">
            <p className="upload-imag-text">Upload your images</p>
            <input
              type="file"
              ref={(el) => (fileInputRefs.current[index] = el)}
              onChange={(e) => handleFileChange(input.id, e)}
              className="file-input"
              style={{ display: "none" }}
            />

            <div className="Registration4-upload-btn">
              <button
                type="button"
                className="upload-btn"
                onClick={uploadImage(index)}
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
          <Link className="skip-btn" to='/dashboard'> Skip & Register later</Link>
      </Form>
    </div>
  );
}

export default Media;
