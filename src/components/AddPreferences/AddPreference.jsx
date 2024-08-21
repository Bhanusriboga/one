import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import {useHistory} from "react-router-dom"
import { addPreference, toastsuccess } from "../../utils/constants";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import "./Preference.css";
import {
  MinHeight,
  MaxHeight,
  Dosham,
  MotherTongue,
  ProfileCreatedFor,
  Religion,
  Star,
  Education,
  Occupation,
  Employeement,
  AnnualIncome,
  MaritalStatus,
  Disability,
  DrinkingHabits,
  SmokingHabits,
  EatingHabits,
} from "./Database";
import { useDispatch } from "react-redux";
import { addPreferencesPost } from "../../redux/slices/AddPreferences";
import { toast } from "react-toastify";

const AddPreference = () => {
  const [validation, setValidation] = useState({
    profileCreatedFor: {
      value: "",
      invalid: false,
      message: addPreference.ProfileCreatedFor,
    },
    minAge: { value: "", invalid: false, message: addPreference.MinAge },
    maxAge: { value: "", invalid: false, message: addPreference.MaxAge },
    minHeight: { value: "", invalid: false, message: addPreference.MinHeight },
    maxHeight: { value: "", invalid: false, message: addPreference.MaxHeight },
    motherTongue: {
      value: "",
      invalid: false,
      message: addPreference.MotherTongue,
    },
    religion: { value: "", invalid: false, message: addPreference.Religion },
    caste: { value: "", invalid: false, message: addPreference.Caste },
    star: { value: "", invalid: false, message: addPreference.Star },
    dosham: { value: "", invalid: false, message: addPreference.Dosham },
    education: { value: "", invalid: false, message: addPreference.Education },
    occupation: {
      value: "",
      invalid: false,
      message: addPreference.Occupation,
    },
    employment: {
      value: "",
      invalid: false,
      message: addPreference.Employment,
    },
    annualIncome: {
      value: "",
      invalid: false,
      message: addPreference.AnnualIncome,
    },
    city: { value: "", invalid: false, message: addPreference.City },
    state: { value: "", invalid: false, message: addPreference.State },
    country: { value: "", invalid: false, message: addPreference.Country },
    maritalStatus: {
      value: "",
      invalid: false,
      message: addPreference.MaritalStatus,
    },
    disability: {
      value: "",
      invalid: false,
      message: addPreference.Disability,
    },
    drinkingHabits: {
      value: "",
      invalid: false,
      message: addPreference.DrinkingHabits,
    },
    smokingHabits: {
      value: "",
      invalid: false,
      message: addPreference.SmokingHabits,
    },
    eatingHabits: {
      value: "",
      invalid: false,
      message: addPreference.EatingHabits,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch=useDispatch();
  const history=useHistory();
  const handleBlur = () => {
    let newValidation = { ...validation };
    const firstInvalidField = Object.keys(newValidation).find((key) => {
      return validation[key].value === "" || validation[key].value === "Select";
    });
    if (firstInvalidField) {
      newValidation[firstInvalidField].invalid = true;
      setErrorMessage(newValidation[firstInvalidField].message);
    } else {
      setErrorMessage("");
    }
    setValidation(newValidation);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValidation({
      ...validation,
      [name]: {
        ...validation[name],
        value: value,
        invalid: !value,
        message: !value
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`
          : "",
      },
    });
  };

  const handleSubmit = async () => {
    // event.preventDefault();
    // const form = event.target;
    // let newValidation = { ...validation };
    // let firstInvalidField = null;
    // for (let field of Object.keys(validation)) {
    //   const fieldElement = form[field];
    //   if (fieldElement.value == "" || fieldElement.value == "select") {
    //     if (!firstInvalidField) {
    //       firstInvalidField = field;
    //     }
    //     newValidation[field].invalid = true;
    //     break;
    //   }
    // }
    const data = await dispatch(addPreferencesPost(validation));
    if(data.payload.message=="Preferences Updated Successfully"){
      toast.success("Preferences Updated Successfully", toastsuccess);
    }
    // setValidation(newValidation);
    // setErrorMessage(
    //   firstInvalidField ? validation[firstInvalidField].message : ""
    // );
  };

  return (
    <div>
      <Form>
        <div className="mobile-view">
          <FaArrowLeft className="arrow" onClick={()=>history.goBack()}/>
          <h2 className="preference">{addPreference.hedding}</h2>
        </div>
        <div className="backgroundImg">
          <FormGroup className="religion-text">
          <h3 className="addPreferenceHeader d-none d-md-block" >{addPreference.hedding}</h3>
            <Label for="profileCreatedFor">
              <h5 className="profile">{addPreference.profile}</h5>
            </Label>
            <Input
              className={"input-height"}
              style={
                validation.profileCreatedFor.value == ""
                  ? { color: "rgba(172, 172, 172, 1)" }
                  : { color: "#000" }
              }
              type="select"
              id="profileCreatedFor"
              name="profileCreatedFor"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.profileCreatedFor.invalid}
              value={validation.profileCreatedFor.value}
            >
              <option
                value={"select"}
                selected
                disabled={validation.profileCreatedFor.value !== ""}
              >
                {addPreference.select}
              </option>
              {ProfileCreatedFor.map((item, id) => (
                <option key={id} value={item.toLocaleUpperCase()}>
                  {item}
                </option>
              ))}
            </Input>
            <FormFeedback>
              {validation.profileCreatedFor.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
          <div className="religion">
            <FormGroup className="minmaxage">
              <Label for="minAge">
                <h5 className="profile">{addPreference.minage}</h5>
              </Label>
              <Input
                type="number"
                className="input-height"
                id="minAge"
                name="minAge"
                placeholder="Enter"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.minAge.invalid}
                value={validation.minAge.value}
              />
              <FormFeedback>
                {validation.minAge.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
            <FormGroup className="minmaxage">
              <Label for="maxAge">
                <h5 className="profile">{addPreference.maxage}</h5>
              </Label>
              <Input
                type="number"
                className="input-height"
                id="maxAge"
                placeholder="Enter"
                name="maxAge"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.maxAge.invalid}
                value={validation.maxAge.value}
              />
              <FormFeedback>
                {validation.maxAge.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>
          <div className="religion">
            <FormGroup className="minmaxage">
              <Label for="minHeight">
                <h5 className="profile">{addPreference.minheight}</h5>
              </Label>
              <Input
                style={
                  validation.minHeight.value == ""
                    ? { color: "rgba(172, 172, 172, 1)" }
                    : { color: "#000" }
                }
                type="select"
                className="input-height"
                id="minHeight"
                name="minHeight"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.minHeight.invalid}
                value={validation.minHeight.value}
              >
                <option
                  value={"Select"}
                  selected
                  disabled={validation.minHeight.value !== ""}
                >
                  {addPreference.select}
                </option>
                {MinHeight.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <FormFeedback>
                {validation.minHeight.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>

            <FormGroup className="minmaxage">
              <Label for="maxHeight">
                <h5 className="profile">{addPreference.maxheight}</h5>
              </Label>
              <Input
                style={
                  validation.maxHeight.value == ""
                    ? { color: "rgba(172, 172, 172, 1)" }
                    : { color: "#000" }
                }
                type="select"
                className="input-height"
                id="maxHeight"
                name="maxHeight"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.maxHeight.invalid}
                value={validation.maxHeight.value}
              >
                <option
                  value={"Select"}
                  selected
                  disabled={validation.maxHeight.value !== ""}
                >
                  {addPreference.select}
                </option>
                {MaxHeight.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <FormFeedback>
                {validation.maxHeight.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>
          <FormGroup className="religion-text">
            <Label for="motherTongue">
              <h5 className="profile">{addPreference.mothertongue}</h5>
            </Label>
            <Input
              style={
                validation.motherTongue.value == ""
                  ? { color: "rgba(172, 172, 172, 1)" }
                  : { color: "#000" }
              }
              type="select"
              className="input-height"
              id="motherTongue"
              name="motherTongue"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.motherTongue.invalid}
              value={validation.motherTongue.value}
            >
              <option
                value={"Select"}
                selected
                disabled={validation.motherTongue.value !== ""}
              >
                {addPreference.select}
              </option>
              {MotherTongue.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Input>
            <FormFeedback>
              {validation.motherTongue.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
          <div className="religion">
            <FormGroup className="religion-text">
              <Label for="religion">
                <h5 className="profile">{addPreference.religion}</h5>
              </Label>
              <Input
                style={
                  validation.religion.value == ""
                    ? { color: "rgba(172, 172, 172, 1)" }
                    : { color: "#000" }
                }
                type="select"
                className="input-height"
                id="religion"
                name="religion"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.religion.invalid}
                value={validation.religion.value}
              >
                <option
                  value={"Select"}
                  selected
                  disabled={validation.religion.value !== ""}
                >
                  {addPreference.select}
                </option>
                {Religion.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <FormFeedback>
                {validation.religion.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
            <FormGroup className="religion-text">
              <Label for="caste">
                <h5 className="profile">{addPreference.caste}</h5>
              </Label>
              <Input
                type="text"
                placeholder="Enter"
                className="input-height"
                id="caste"
                name="caste"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.caste.invalid}
                value={validation.caste.value}
              />
              <FormFeedback>
                {validation.caste.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>
          <div className="religion">
            <FormGroup className="religion-text">
              <Label for="star">
                <h5 className="profile">{addPreference.star}</h5>
              </Label>
              <Input
                style={
                  validation.star.value == ""
                    ? { color: "rgba(172, 172, 172, 1)" }
                    : { color: "#000" }
                }
                type="select"
                className="input-height"
                id="star"
                name="star"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.star.invalid}
                value={validation.star.value}
              >
                <option
                  value={"Select"}
                  selected
                  disabled={validation.star.value !== ""}
                >
                  {addPreference.select}
                </option>
                {Star.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <FormFeedback>
                {validation.star.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
            <FormGroup className="religion-text">
              <Label for="dosham">
                <h5 className="profile">{addPreference.dosham}</h5>
              </Label>
              <Input
                style={
                  validation.dosham.value == ""
                    ? { color: "rgba(172, 172, 172, 1)" }
                    : { color: "#000" }
                }
                type="select"
                className="input-height"
                id="dosham"
                name="dosham"
                onBlur={handleBlur}
                onChange={handleInputChange}
                required
                invalid={validation.dosham.invalid}
                value={validation.dosham.value}
              >
                <option
                  value={"Select"}
                  selected
                  disabled={validation.dosham.value !== ""}
                >
                  {addPreference.select}
                </option>
                {Dosham.map((item, id) => (
                  <option key={id} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <FormFeedback>
                {validation.dosham.invalid && errorMessage}
              </FormFeedback>
            </FormGroup>
          </div>
        </div>
        <FormGroup className="profile-field-input">
          <Label for="education">
            <h5 className="profile">{addPreference.education}</h5>
          </Label>
          <Input
            style={
              validation.education.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="education"
            name="education"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.education.invalid}
            value={validation.education.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.education.value !== ""}
            >
              {addPreference.select}
            </option>
            {Education.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.education.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="occupation">
              <h5 className="profile">{addPreference.occupation}</h5>
            </Label>
            <Input
              style={
                validation.occupation.value == ""
                  ? { color: "rgba(172, 172, 172, 1)" }
                  : { color: "#000" }
              }
              type="select"
              className="input-height"
              id="occupation"
              name="occupation"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.occupation.invalid}
              value={validation.occupation.value}
            >
              <option
                value={"Select"}
                selected
                disabled={validation.occupation.value !== ""}
              >
                {addPreference.select}
              </option>
              {Occupation.map((item, id) => (
                <option key={id} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input>
            <FormFeedback>
              {validation.occupation.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>

          <FormGroup className="religion-text">
            <Label for="employment">
              <h5 className="profile">{addPreference.employmentstatus}</h5>
            </Label>
            <Input
              style={
                validation.employment.value == ""
                  ? { color: "rgba(172, 172, 172, 1)" }
                  : { color: "#000" }
              }
              type="select"
              className="input-height"
              id="employment"
              name="employment"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.employment.invalid}
              value={validation.employment.value}
            >
              <option
                value={"Select"}
                selected
                disabled={validation.employment.value !== ""}
              >
                {addPreference.select}
              </option>
              {Employeement.map((item, id) => (
                <option key={id} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input>
            <FormFeedback>
              {validation.employment.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="annualIncome">
              <h5 className="profile">{addPreference.annualincome}</h5>
            </Label>
            <Input
              style={
                validation.annualIncome.value == ""
                  ? { color: "rgba(172, 172, 172, 1)" }
                  : { color: "#000" }
              }
              type="select"
              className="input-height"
              id="annualIncome"
              name="annualIncome"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.annualIncome.invalid}
              value={validation.annualIncome.value}
            >
              <option
                value={"Select"}
                selected
                disabled={validation.annualIncome.value !== ""}
              >
                {addPreference.select}
              </option>
              {AnnualIncome.map((item, id) => (
                <option key={id} value={item}>
                  {item}
                </option>
              ))}
            </Input>
            <FormFeedback>
              {validation.annualIncome.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup className="religion-text">
            <Label for="city">
              <h5 className="profile">{addPreference.city}</h5>
            </Label>
            <Input
              type="text"
              className="input-height"
              placeholder="Enter"
              id="city"
              name="city"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.city.invalid}
              value={validation.city.value}
            />
            <FormFeedback>
              {validation.city.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>
        <div className="religion">
          <FormGroup className="religion-text">
            <Label for="state">
              <h5 className="profile">{addPreference.state}</h5>
            </Label>
            <Input
              type="text"
              className="input-height"
              id="state"
              placeholder="Enter"
              name="state"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.state.invalid}
              value={validation.state.value}
            />
            <FormFeedback>
              {validation.state.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup className="religion-text">
            <Label for="country">
              <h5 className="profile">{addPreference.country}</h5>
            </Label>
            <Input
              type="text"
              className="input-height"
              id="country"
              placeholder="Enter"
              name="country"
              onBlur={handleBlur}
              onChange={handleInputChange}
              required
              invalid={validation.country.invalid}
              value={validation.country.value}
            />
            <FormFeedback>
              {validation.country.invalid && errorMessage}
            </FormFeedback>
          </FormGroup>
        </div>
        <FormGroup className="profile-field-input">
          <Label for="maritalStatus">
            <h5 className="profile">{addPreference.maritalstatus}</h5>
          </Label>
          <Input
            style={
              validation.maritalStatus.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="maritalStatus"
            name="maritalStatus"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.maritalStatus.invalid}
            value={validation.maritalStatus.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.maritalStatus.value !== ""}
            >
              {addPreference.select}
            </option>
            {MaritalStatus.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.maritalStatus.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <FormGroup className="profile-field-input">
          <Label for="disability">
            <h5 className="profile">{addPreference.disability}</h5>
          </Label>
          <Input
            style={
              validation.disability.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="disability"
            name="disability"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.disability.invalid}
            value={validation.disability.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.disability.value !== ""}
            >
              {addPreference.select}
            </option>
            {Disability.map((item, id) => (
              <option key={id} value={item}>
                {item}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.disability.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <FormGroup className="profile-field-input">
          <Label for="drinkingHabits">
            <h5 className="profile">{addPreference.drinkinghabits}</h5>
          </Label>
          <Input
            style={
              validation.drinkingHabits.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="drinkingHabits"
            name="drinkingHabits"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.drinkingHabits.invalid}
            value={validation.drinkingHabits.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.drinkingHabits.value !== ""}
            >
              {addPreference.select}
            </option>
            {DrinkingHabits.map((item, id) => (
              <option key={id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.drinkingHabits.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <FormGroup className="profile-field-input">
          <Label for="smokingHabits">
            <h5 className="profile">{addPreference.smokinghabits}</h5>
          </Label>
          <Input
            style={
              validation.smokingHabits.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="smokingHabits"
            name="smokingHabits"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.smokingHabits.invalid}
            value={validation.smokingHabits.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.smokingHabits.value !== ""}
            >
              {addPreference.select}
            </option>
            {SmokingHabits.map((item, id) => (
              <option key={id} value={item.value}>
                {item.label}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.smokingHabits.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <FormGroup className="profile-field-input">
          <Label for="eatingHabits">
            <h5 className="profile">{addPreference.eatinghabits}</h5>
          </Label>
          <Input
            style={
              validation.eatingHabits.value == ""
                ? { color: "rgba(172, 172, 172, 1)" }
                : { color: "#000" }
            }
            type="select"
            className="input-height"
            id="eatingHabits"
            name="eatingHabits"
            onBlur={handleBlur}
            onChange={handleInputChange}
            required
            invalid={validation.eatingHabits.invalid}
            value={validation.eatingHabits.value}
          >
            <option
              value={"Select"}
              selected
              disabled={validation.eatingHabits.value !== ""}
            >
              {addPreference.select}
            </option>
            {EatingHabits.map((item, id) => (
              <option key={id} value={item.toLocaleUpperCase()}>
                {item}
              </option>
            ))}
          </Input>
          <FormFeedback>
            {validation.eatingHabits.invalid && errorMessage}
          </FormFeedback>
        </FormGroup>
        <Button
          className="submit-btn button"
          onClick={handleSubmit}
        >{addPreference.submit}</Button>
      </Form>
    </div>
  );
};

export default AddPreference;
