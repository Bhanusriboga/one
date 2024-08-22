import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { registration1, toastError } from "../../utils/constants";
import "./BasicsDetails.css";
import { Row, Col, FormGroup, Input, FormFeedback, Form } from "reactstrap";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep,saveProfessionalData,professionalDetailsAPICall } from "../../redux/slices/RegistrationDetails";
import { toast } from "react-toastify";

function Professional() {
  const [formData, setFormData] = useState({
    highestEducation: "",
    occupation: "",
    annualIncome: "",
    WorkLocation: "",
    yearOfPassing: "",
    nameOfTheInstitute: "",
    employmentStatus: "",
    employedIn: "",
    workstate: "",
    workcity: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const education = ["PhD", "Masters", "Bachelors", "Others"];
  
  const occupation = [
    {label:"Business Owner",value:"BusinessOwner"},
    {label:"Celebrity",value:"Celebrity"},
    {label:"Self Employed",value:"SelfEmployed"},
    {label:"Government Employee",value:"GovernmentEmployee"},
    {label:"Corporate Employee",value:"CorporateEmployee"},
    {label:"Unemployed",value:"Unemployed"},
    {label:"Others",value:"Others"},
  ];
  const employmentStatus = [{label:"Full Time",value:"FullTime"},{label:"Part Time",value:"PartTime"},{label:"Contract",value:"Contract"}]; 
  const income = [
    "Less than 50k",
    "50K",
    "0 - 1 Lakh",
    "1 - 2 Lakhs",
    "2 - 4 Lakhs",
    "4 - 6 Lakhs",
    "6 - 8 Lakhs",
    "8 - 10 Lakhs",
    "10 - 12 Lakhs",
    "12 - 14 Lakhs",
    "14 - 16 Lakhs",
    "16 - 18 Lakhs",
    "18 - 20 Lakhs",
    "20 - 30 Lakhs",
    "30 - 40 Lakhs",
    "40 - 50 Lakhs",
    "50 - 60 Lakhs",
    "60 - 70 Lakhs",
    "70 - 80 Lakhs",
    "80 - 90 Lakhs",
    "90 - 1 Crore ",
    "1 Crore & Above",
  ];

  const { ProfessionalData } = useSelector((state)=>state.RegistrationDetails)
  const dispatch = useDispatch();

  useEffect(() => {
    if (ProfessionalData && Object.keys(ProfessionalData).length > 0) {
      setFormData(ProfessionalData);
    }
  }, [ProfessionalData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const sanitizedValue =
      name === "yearOfPassing" ? value.replace(/\D/g, "") : value;

    setFormErrors({});
    setFormData({
      ...formData,
      [name]: sanitizedValue,
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (!value) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required.",
      }));
    } else if (name === "yearOfPassing" && !/^\d{4}$/.test(value)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Enter a valid 4-digit year.",
      }));
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleNext = () => {
    const fields = [
      "highestEducation",
      "yearOfPassing",
      "nameOfTheInstitute",
      "occupation",
      "employmentStatus",
      "employedIn",
      "WorkLocation",
      "workstate",
      "workcity",
      "annualIncome",
    ];
    const newErrors = {};
    let isValid = true;

    for (const field of fields) {
      if (formData[field] === "") {
        newErrors[field] = true;
        isValid = false;
        break;
      }
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleNext()) {
      const data=await dispatch(professionalDetailsAPICall(formData));
      if(data?.payload?.message=="Professional details added successfully"||data?.payload?.message=="ProfessionalDetails Already Exists"){
        dispatch(saveProfessionalData(formData));
        dispatch(nextStep());
      }else{
        toast.error("Something went wrong", toastError)
      }
    }
  };

  const prev = async () => {
    await dispatch(prevStep());
  };

  return (
    <div className="container-fluid">
      <Form className="w-100">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="highestEducation"
                name="highestEducation"
                placeholder={registration1.education}
                value={formData.highestEducation}
                onChange={handleChange}
                onBlur={handleBlur}
                type="select"
                invalid={!!formErrors.highestEducation}>
                <option value="" disabled>
                  {registration1.education}
                </option>
                {education.map((high, index) => (
                  <option key={index} value={high}>
                    {high}
                  </option>
                ))}
              </Input>
              {formErrors.highestEducation && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="yearOfPassing"
                name="yearOfPassing"
                placeholder={registration1.year}
                value={formData.yearOfPassing}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                maxLength="4"
                invalid={!!formErrors.yearOfPassing}
                pattern="\d{4}"
              />
              {formErrors.yearOfPassing && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="nameOfTheInstitute"
                name="nameOfTheInstitute"
                placeholder={registration1.name}
                value={formData.nameOfTheInstitute}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                invalid={!!formErrors.nameOfTheInstitute}
              />
              {formErrors.nameOfTheInstitute && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="occupation"
                name="occupation"
                placeholder="Occupation*"
                value={formData.occupation}
                onChange={handleChange}
                onBlur={handleBlur}
                type="select"
                invalid={!!formErrors.occupation}>
                <option value="" disabled>
                  Occupation *
                </option>
                {occupation.map((occ, index) => (
                  <option key={index} value={occ.value}>
                    {occ.label}
                  </option>
                ))}
              </Input>
              {formErrors.occupation && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="employmentStatus"
                name="employmentStatus"
                placeholder={registration1.employment}
                value={formData.employmentStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                type="select"
                invalid={!!formErrors.employmentStatus}>
                <option value="" disabled>
                  {registration1.employment}
                </option>
                {employmentStatus.map((es, index) => (
                  <option key={index} value={es.value}>
                    {es.label}
                  </option>
                ))}
              </Input>
              {formErrors.employmentStatus && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="employedIn"
                name="employedIn"
                placeholder={registration1.employedinplaceholder}
                value={formData.employedIn}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                invalid={!!formErrors.employedIn}
              />
              {formErrors.employedIn && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="WorkLocation"
                name="WorkLocation"
                placeholder={registration1.locationplaceholder}
                value={formData.WorkLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                invalid={!!formErrors.WorkLocation}
              />
              {formErrors.WorkLocation && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="workstate"
                name="workstate"
                placeholder="State"
                value={formData.workstate}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                invalid={!!formErrors.workstate}
              />
              {formErrors.workstate && (
                <FormFeedback>{registration1.field}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="workcity"
                name="workcity"
                placeholder="City"
                value={formData.workcity}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                invalid={!!formErrors.workcity}
              />
              {formErrors.workcity && (
                <FormFeedback style={{ textIndent: "1em" }}>
                  {registration1.field}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={8}>
            <FormGroup>
              <Input
                className="dob1 custom-input"
                id="annualIncome"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                onBlur={handleBlur}
                type="select"
                invalid={!!formErrors.annualIncome}>
                <option value="" disabled>
                  {registration1.annualtext}
                </option>
                {income.map((inc, index) => (
                  <option key={index} value={inc}>
                    {inc}
                  </option>
                ))}
              </Input>
              {formErrors.annualIncome && (
                <FormFeedback>{registration1.annualincome}</FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
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

export default Professional;
