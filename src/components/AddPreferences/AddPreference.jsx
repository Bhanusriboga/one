import React, { useState, useEffect } from "react";
import {Button,Form,FormGroup,Label,Input,FormFeedback,Container,} from "reactstrap";
import "./Preference.css";
import {MinHeight,MaxHeight,Dosham,MotherTongue,ProfileCreatedFor,Religion,Star,Education,Occupation,Employeement,AnnualIncome,MaritalStatus,Disability,DrinkingHabits,SmokingHabits,EatingHabits} from "./Database";

const AddPreference = () => {
  const [validation, setValidation] = useState({
    profileCreatedFor: { invalid: false, message: "Profile is required." },
    minAge: { invalid: false, message: "minage is required." },
    maxAge: { invalid: false, message: "maxage is required." },
    minHeight: { invalid: false, message: "minHight is required." },
    maxHeight: { invalid: false, message: "maxHight is required." },
    motherTongue: { invalid: false, message: "motherTongue is required." },
    religion: { invalid: false, message: "religion is required." },
    caste: { invalid: false, message: "caste is required." },
    star: { invalid: false, message: "star is required." },
    dhosam: { invalid: false, message: "dhosam is required." },
    education: { invalid: false, message: "education is required." },
    occupation: { invalid: false, message: "occupation is required." },
    employment: { invalid: false, message: "employment is required." },
    annualIncome: { invalid: false, message: "annualIncome is required." },
    city: { invalid: false, message: "city is required." },
    state: { invalid: false, message: "state is required." },
    country: { invalid: false, message: "country is required." },
    maritalStatus: { invalid: false, message: "maritalStatus is required." },
    disability: { invalid: false, message: "disability is required." },
    drinkingHabits: { invalid: false, message: "drinkingHabits is required." },
    smokingHabits: { invalid: false, message: "smokingHabits is required." },
    eatingHabits: { invalid: false, message: "eatingHabits is required." },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = () => {
    let newValidation = { ...validation };
    const firstInvalidField = Object.keys(newValidation).find((key) => {
      return (
        !document.getElementById(key).value ||
        document.getElementById(key).value == "Select"
      );
    });
    if (firstInvalidField) {
      newValidation[firstInvalidField].invalid = true;
      setErrorMessage(newValidation[firstInvalidField].message);
    } else {
      setErrorMessage("");
    }
    setValidation(newValidation);
  };
  const handleChange = (field) => {
    let newValidation = { ...validation };
    newValidation[field].invalid = false;
    setValidation(newValidation);
    const firstInvalidField = Object.keys(newValidation).find(
      (key) => !document.getElementById(key).value
    );
    setErrorMessage(
      firstInvalidField ? newValidation[firstInvalidField].message : ""
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    let newValidation = { ...validation };
    let firstInvalidField = null;
    for (let field of Object.keys(validation)) {
      const fieldElement = form[field];
      if (!fieldElement.value) {
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
        newValidation[field].invalid = !fieldElement.value;
        break;
      } else {
        return;
      }
    }
    setValidation(newValidation);
    setErrorMessage(
      firstInvalidField ? validation[firstInvalidField].message : ""
    );
  };

  return (
    <div>
      <Form noValidate onSubmit={handleSubmit}>
        <div className="mobile-view">
          <h2 className="preference ">Add Preferences</h2>
        </div>

        <FormGroup className="religion-text">
          <Label for="profileCreatedFor">
            <h5 className="profile">Profile Created For</h5>
          </Label>
          <Input
             className="input-height"
            type="select"
            id="profileCreatedFor"
            onBlur={handleBlur}
            onChange={() => handleChange("profileCreatedFor")}
            required
            invalid={validation.profileCreatedFor.invalid}
          >
            <option value={"Select"} selected disabled  
            className="select-text1">
            Select
            </option>
            {ProfileCreatedFor.map((item, id) => {
              return (
                <option key={id} value={item.select}>
                  {item}
                </option>
              );
            })}
          </Input>
          <FormFeedback>
            {validation.profileCreatedFor.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <div className="backgroungImg">
          <div className="religion">
            <FormGroup className="minmaxage">
              <Label for="minAge">
                <h5 className="profile">Min Age</h5>
              </Label>
              <Input
                type="number"
                placeholder="Enter"
                className="input-height"
                id="minAge"
                onBlur={handleBlur}
                onChange={() => handleChange("minAge")}
                required
                invalid={validation.minAge.invalid}
              />
              <FormFeedback>
                {validation.minAge.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="minmaxage">
              <Label for="maxAge">
                <h5 className="profile">Max Age</h5>
              </Label>
              <Input
                type="number"
                placeholder="Enter"
                className="input-height"
                id="maxAge"
                onBlur={handleBlur}
                onChange={() => handleChange("maxAge")}
                required
                invalid={validation.maxAge.invalid}
              />
              <FormFeedback>
                {validation.maxAge.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>

          <div className="religion">
            <FormGroup className="minmaxage">
              <Label for="minHeight">
                <h5 className="profile">Min Height </h5>
              </Label>
              <Input
                type="select"
                className="input-height"
                id="minHeight"
                onBlur={handleBlur}
                onChange={() => handleChange("minHeight")}
                required
                invalid={validation.minHeight.invalid}
              >
                  <option value={"Select"} selected disabled>
                  Select
                </option>

                {MinHeight.map((item, id) => {
                  return (
                    <option key={id} value={item.select}>
                      {item}
                    </option>
                  );
                })}
              </Input>
              <FormFeedback>
                {validation.minHeight.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="minmaxage">
              <Label for="maxHeight">
                <h5 className="profile">Max Height </h5>
              </Label>
              <Input
                type="select"
                className="input-height"
                id="maxHeight"
                onBlur={handleBlur}
                onChange={() => handleChange("maxHeight")}
                required
                invalid={validation.maxHeight.invalid}
              >
                  <option value={"Select"} selected disabled>
                  Select
                </option>

                {MaxHeight.map((item, id) => {
                  return (
                    <option key={id} value={item.select}>
                      {item}
                    </option>
                  );
                })}
              </Input>
              <FormFeedback>
                {validation.maxHeight.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>

          <FormGroup className="religion-text">
            <Label for="motherTongue">
              <h5 className="profile">Mother Tongue </h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="motherTongue"
              onBlur={handleBlur}
              onChange={() => handleChange("motherTongue")}
              required
              invalid={validation.motherTongue.invalid}
            >
              <option value={"Select"} selected disabled>
                Select
              </option>

              {MotherTongue.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.motherTongue.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <div className="religion">
            <FormGroup className="religion-text">
              <Label for="religion">
                <h5 className="profile">Religion </h5>
              </Label>
              <Input
                className="input-height"
                type="select"
                id="religion"
                onBlur={handleBlur}
                onChange={() => handleChange("religion")}
                required
                invalid={validation.religion.invalid}
              >
                <option value={"Select"} selected disabled>
                  Select
                </option>

                {Religion.map((item, id) => {
                  return (
                    <option key={id} value={item.select}>
                      {item}
                    </option>
                  );
                })}
              </Input>
              <FormFeedback data-testid="religion">
                {validation.religion.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="religion-text">
              <Label for="caste">
                <h5 className="profile">Caste</h5>
              </Label>
              <Input
                type="text"
                placeholder="Enter"
                className="input-height"
                id="caste"
                onBlur={handleBlur}
                onChange={() => handleChange("caste")}
                required
                invalid={validation.caste.invalid}
              />
              <FormFeedback>
                {validation.caste.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>
        </div>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="star">
              <h5 className="profile">Star</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="star"
              onBlur={handleBlur}
              onChange={() => handleChange("star")}
              required
              invalid={validation.star.invalid}
            >
              <option value={"Select"} selected disabled>
                Select
              </option>

              {Star.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.star.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="religion-text">
            <Label for="dhosam">
              <h5 className="profile">Dosham</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="dhosam"
              onBlur={handleBlur}
              onChange={() => handleChange("dhosam")}
              required
              invalid={validation.dhosam.invalid}
            >
              <option value={"Select"} selected disabled>
                Select
              </option>

              {Dosham.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.dhosam.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>

        <FormGroup className="profile-field-input">
          <Label for="education">
            <h5 className="profile">Education</h5>
          </Label>
          <Input
            type="select"
            className="input-height"
            id="education"
            onBlur={handleBlur}
            onChange={() => handleChange("education")}
            required
            invalid={validation.education.invalid}
          >
            <option value={"Select"} selected disabled>
              Select
            </option>

            {Education.map((item, id) => {
              return (
                <option key={id} value={item.select}>
                  {item}
                </option>
              );
            })}
          </Input>
          <FormFeedback>
            {validation.education.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="occupation">
              <h5 className="profile">Occupation</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="occupation"
              onBlur={handleBlur}
              onChange={() => handleChange("occupation")}
              required
              invalid={validation.occupation.invalid}
            >
              <option value={"Select"} selected disabled>
                Select
              </option>
              {Occupation.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.occupation.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="religion-text">
            <Label for="employment">
              <h5 className="profile">Employment Type</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="employment"
              onBlur={handleBlur}
              onChange={() => handleChange("employment")}
              required
              invalid={validation.employment.invalid}
            >
              <option value={"Select"} selected disabled>
                Select
              </option>
              {Employeement.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.employment.invalid && errorMessage}
            </FormFeedback>{" "}
          </FormGroup>
        </div>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="annualIncome">
              <h5 className="profile">Annual Income </h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="annualIncome"
              onBlur={handleBlur}
              onChange={() => handleChange("annualIncome")}
              required
              invalid={validation.annualIncome.invalid}
            >
             <option value={"Select"} selected disabled>
                Select
              </option>
              {AnnualIncome.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.annualIncome.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="religion-text">
            <Label for="city">
              <h5 className="profile">City</h5>
            </Label>
            <Input
              type="text"
              placeholder="Enter"
              className="input-height"
              id="city"
              onBlur={handleBlur}
              onChange={() => handleChange("city")}
              required
              invalid={validation.city.invalid}
            />
            <FormFeedback>
              {validation.city.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="state">
              <h5 className="profile">State</h5>
            </Label>
            <Input
              type="text"
              placeholder="|Enter"
              className="input-height"
              id="state"
              onBlur={handleBlur}
              onChange={() => handleChange("state")}
              required
              invalid={validation.state.invalid}
            />
            <FormFeedback>
              {validation.state.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="religion-text">
            <Label for="country">
              <h5 className="profile">Country</h5>
            </Label>
            <Input
              type="text"
              placeholder="|Enter"
              className="input-height"
              id="country"
              onBlur={handleBlur}
              onChange={() => handleChange("country")}
              required
              invalid={validation.country.invalid}
            />
            <FormFeedback>
              {validation.country.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>

        <div>
          <FormGroup className="profile-field-input">
            <Label for="maritalStatus">
              <h5 className="profile">Marital Status</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="maritalStatus"
              onBlur={handleBlur}
              onChange={() => handleChange("maritalStatus")}
              required
              invalid={validation.maritalStatus.invalid}
            >
             <option value={"Select"} selected disabled>
                Select
              </option>
              {MaritalStatus.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.maritalStatus.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="profile-field-input">
            <Label for="disability">
              <h5 className="profile">Disability</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="disability"
              onBlur={handleBlur}
              onChange={() => handleChange("disability")}
              required
              invalid={validation.disability.invalid}
            >
             <option value={"Select"} selected disabled>
                Select
              </option>
              {Disability.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.disability.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>

        <FormGroup className="profile-field-input">
          <Label for="drinkingHabits">
            <h5 className="profile">Drinking Habits</h5>
          </Label>
          <Input
            type="select"
            className="input-height"
            id="drinkingHabits"
            onBlur={handleBlur}
            onChange={() => handleChange("drinkingHabits")}
            required
            invalid={validation.drinkingHabits.invalid}
          >
          <option value={"Select"} selected disabled>
                Select
              </option>
              {DrinkingHabits.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
          </Input>
          <FormFeedback>
            {validation.drinkingHabits.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>

        <FormGroup className="profile-field-input">
          <Label for="smokingHabits">
            <h5 className="profile">Smoking Habits</h5>
          </Label>
          <Input
            type="select"
            className="input-height"
            id="smokingHabits"
            onBlur={handleBlur}
            onChange={() => handleChange("smokingHabits")}
            required
            invalid={validation.smokingHabits.invalid}
          >
          <option value={"Select"} selected disabled>
                Select
              </option>
              {SmokingHabits.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
          </Input>
          <FormFeedback>
            {validation.smokingHabits.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>

        <div>
          <FormGroup className="profile-field-input">
            <Label for="eatingHabits">
              <h5 className="profile">Eating Habits</h5>
            </Label>
            <Input
              type="select"
              className="input-height"
              id="eatingHabits"
              onBlur={handleBlur}
              onChange={() => handleChange("eatingHabits")}
              required
              invalid={validation.eatingHabits.invalid}
            >
             <option value={"Select"} selected disabled>
                Select
              </option>
              {EatingHabits.map((item, id) => {
                return (
                  <option key={id} value={item.select}>
                    {item}
                  </option>
                );
              })}
            </Input>
            <FormFeedback>
              {validation.eatingHabits.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>

        <div >
          <Button  className="mb-2 button " 
          type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPreference;
