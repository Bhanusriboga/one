import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  FormFeedback,
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { registration1 } from "../../utils/constants";
import "./BasicsDetails.css";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nextStep,
  saveFormData,
  BasicDetailsAPICall
} from "../../redux/slices/RegistrationDetails";
import {updateMydata} from "../../redux/slices/AuthSlice";
function BasicsDetails() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    placeOfBirth: "",
    timeOfBirth: null,
    religion: "",
    motherTongue: "",
    citizenship: "",
    languageProficiency: "",
    instagramId: "",
    linkedInId: "",
    doorNo: "",
    streetNo: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [selectedTime, setSelectedTime] = useState(null);
  const [errors, setErrors] = useState({});
  const formData1 = useSelector((store) => store.RegistrationDetails.formData1);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "postalCode") {
      if (/^\d{0,6}$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else if (name === "timeOfBirth") {
      const dateValue = value ? new Date(value) : null;
      setSelectedTime(dateValue);
      setFormData({
        ...formData,
        [name]: dateValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };

    if (fieldName === "postalCode") {
      if (value.length !== 6) {
        newErrors[fieldName] = "Postal code must be 6 digits";
      } else {
        delete newErrors[fieldName];
      }
    } else if (fieldName === "timeOfBirth") {
      if (!value) {
        newErrors[fieldName] = "This field is required";
      } else {
        delete newErrors[fieldName];
      }
    } else if (fieldName !== "instagramId" && fieldName !== "linkedInId") {
      if (typeof value === "string" && value.trim() === "") {
        newErrors[fieldName] = "This field is required";
      } else {
        delete newErrors[fieldName];
      }
    }

    setErrors(newErrors);
  };

  const validateAllFields = () => {
    const newErrors = {};
    for (const field in formData) {
      const value = formData[field];
      if (
        (typeof value === "string" &&
          value.trim() === "" &&
          field !== "instagramId" &&
          field !== "linkedInId") ||
        (field === "timeOfBirth" && !value)
      ) {
        newErrors[field] = "This field is required";
        break;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateAllFields()) {
      const data = await dispatch(BasicDetailsAPICall(formData));
      if(data?.payload?.message === "Basic details added successfully" || data?.payload?.message ==="Basic Details Already Exists Please Updated your Details"){
        dispatch(updateMydata());
        toast.success("User Basic Details Registered Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(saveFormData(formData));
        dispatch(nextStep());
      }else{
        toast.error("Something went wrong", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    if (formData1 && Object.keys(formData1).length > 0) {
      setFormData(formData1);

      if (formData1.timeOfBirth) {
        setSelectedTime(new Date(formData1.timeOfBirth));
      }
    }
  }, [formData1]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div className="container-fluid">
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.dateOfBirth}
                />
                {errors.dateOfBirth && (
                  <FormFeedback className="errormsg">
                    {errors.dateOfBirth}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="placeOfBirth"
                  name="placeOfBirth"
                  type="text"
                  placeholder="Place of Birth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.placeOfBirth}
                />
                {errors.placeOfBirth && (
                  <FormFeedback className="errormsg">
                    {errors.placeOfBirth}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={8}>
              <FormGroup>
                <DatePicker
                  selected={selectedTime}
                  onChange={(date) => {
                    setSelectedTime(date);
                    handleChange({
                      target: {
                        name: "timeOfBirth",
                        value: date,
                      },
                    });
                  }}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Time of Birth"
                  className="dob1"
                  id="timeOfBirth"
                  customInput={
                    <Input
                      value={
                        selectedTime ? selectedTime.toLocaleTimeString() : ""
                      }
                      invalid={!!errors.timeOfBirth}
                      onBlur={handleBlur}
                    />
                  }
                />

                {errors.timeOfBirth && (
                  <FormFeedback className="errormsg">
                    {errors.timeOfBirth}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="religion"
                  name="religion"
                  type="select"
                  value={formData.religion}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.religion}>
                  <option value="" disabled>
                    {registration1.religion}
                  </option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                </Input>
                {errors.religion && (
                  <FormFeedback className="errormsg">
                    {errors.religion}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="motherTongue"
                  name="motherTongue"
                  type="select"
                  value={formData.motherTongue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.motherTongue}>
                  <option value="" disabled>
                    {registration1.mother}
                  </option>
                  <option value="Telugu">Telugu</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Malayalam">Malayalam</option>
                </Input>
                {errors.motherTongue && (
                  <FormFeedback className="errormsg">
                    {errors.motherTongue}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="citizenship"
                  name="citizenship"
                  type="text"
                  placeholder="Citizenship"
                  value={formData.citizenship}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.citizenship}
                />
                {errors.citizenship && (
                  <FormFeedback className="errormsg">
                    {errors.citizenship}
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
                  id="languageProficiency"
                  name="languageProficiency"
                  type="text"
                  placeholder="Language Proficiency"
                  value={formData.languageProficiency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.languageProficiency}
                />
                {errors.languageProficiency && (
                  <FormFeedback className="errormsg">
                    {errors.languageProficiency}
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
                  id="instagramId"
                  name="instagramId"
                  type="text"
                  placeholder="Instagram ID"
                  value={formData.instagramId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.instagramId}
                />
                {errors.instagramId && (
                  <FormFeedback className="errormsg">
                    {errors.instagramId}
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
                  id="linkedInId"
                  name="linkedInId"
                  type="text"
                  placeholder="LinkedIn ID"
                  value={formData.linkedInId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.linkedInId}
                />
                {errors.linkedInId && (
                  <FormFeedback className="errormsg">
                    {errors.linkedInId}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <h1 className="registrationHeading">{registration1.address}</h1>
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="doorNo"
                  name="doorNo"
                  type="text"
                  placeholder="Door Number"
                  value={formData.doorNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.doorNo}
                />
                {errors.doorNo && (
                  <FormFeedback className="errormsg">
                    {errors.doorNo}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="streetNo"
                  name="streetNo"
                  type="text"
                  placeholder="Street Number"
                  value={formData.streetNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.streetNo}
                />
                {errors.streetNo && (
                  <FormFeedback className="errormsg">
                    {errors.streetNo}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.city}
                />
                {errors.city && (
                  <FormFeedback className="errormsg">
                    {errors.city}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.state}
                />
                {errors.state && (
                  <FormFeedback className="errormsg">
                    {errors.state}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.country}
                />
                {errors.country && (
                  <FormFeedback className="errormsg">
                    {errors.country}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroup>
                <Input
                  className="dob1 custom-input"
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={!!errors.postalCode}
                />
                {errors.postalCode && (
                  <FormFeedback className="errormsg">
                    {errors.postalCode}
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
          </Row>
        </div>
        <div className="mb-5 d-flex flex-column gap-2 ms-md-5 mt-md-5">
          <div className="row ms-md-5">
            <div className="col-md-7 ms-md-5">
              <Button type="submit" className="btn registerNext">
                Next
              </Button>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-9 ms-md-5">
              <Link className="btn btn-link skip-btn" to="/dashboard">
                Skip & Register later
              </Link>
            </div>
          </div> */}
        </div>
      </Form>
    </div>
  );
}

export default BasicsDetails;
