import React, { useState,useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Form
} from "reactstrap";
import Select from "react-select";
import { toast } from "react-toastify";
import "./BasicsDetails.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, saveFormData } from "../../redux/slices/RegistrationDetails";
import { prevStep } from "../../redux/slices/RegistrationDetails";


const subCastes = [
  "Golla",
  "Shaik",
  "Vaddi",
  "Agni",
  "Yadav",
  "Pandit",
  "Kanaga",
  "Kondareddy",
  "Velamakapu",
  "Velamareddy",
  "Setibalija",
  "Anke",
  "Yalama",
  "Bandari",
  "Cettibalija",
  "Cheemala",
  "Chinnkapu",
  "Dudekula",
  "Gazula",
  "Kudari",
  "Naika",
  "Palagiri",
  "Periki",
  "Pokanti",
  "Settivari",
  "Telaga",
  "Dasai",
  "Jalari",
  "Jalaru",
  "Mateshp",
  "Nagiri",
  "Peddaboya",
  "Pinjari",
  "Yerragolla",
  "Sidhanti",
  "Vaidika",
  "Bilishpalla",
  "Dhobi",
  "Gunje",
  "Palayakarlu",
  "Mettu",
  "Choudhary",
  "Gundaiah",
  "Mettukamsali",
  "Adupoli",
  "Chendi",
  "Desai",
  "Jutai",
  "Karnam",
  "Krishnam",
  "Munnuru",
  "Padupolu",
  "Pagani",
  "Pakanti",
  "Palli",
  "Pasnur",
  "Pedakapu",
  "Sajjanna",
  "Sunku",
  "Turpukapu",
  "Kapu",
  "Maipu",
  "Naga",
  "Padamasali",
  "Sahukar",
  "Sanka",
  "Talaka",
  "Tulasi",
  "Pathan",
  "Dupati",
  "Jella",
  "Rachama",
  "Sungulu",
  "Dasari",
  "Mangam",
  "Saki",
  "Vangam",
  "Konda",
  "Reddy",
  "Bohra",
  "Neeku",
  "Sheikhpathan",
  "Sudkula",
  "Suryabalija",
  "Banjara",
  "Boipari",
  "Devasat",
  "Lambani",
  "Lambari",
  "Meguat",
  "Sampanggi",
  "Palappu",
  "Nagala",
  "Adimulam",
  "Aryavyasa",
  "Kakunati",
  "Karumani",
  "Komati",
  "Alagolla",
  "Gouda",
  "Konar",
  "Namala",
  "Poojagolla",
  "Yelleu",
  "Desai",
];

const castes = [
  "Abdul",
  "Achari",
  "Adiandra",
  "Ailceej",
  "Archakulu",
  "Aryakashtirya",
  "Aryavysya",
  "Asadulu",
  "Baaraju",
  "Bajakas",
  "Balija",
  "Barber",
  "Bestha",
  "Bondil",
  "Bothula",
  "Boya",
  "Brahman",
  "Budabukkala",
  "Bukava",
  "Camsula",
  "Chakala",
  "Chakali",
  "Chenchu",
  "Devara",
  "Dhobi",
  "Dommara",
  "Ediga",
  "Ekaradorabiddalu",
  "Ekili",
  "Elakula",
  "Elems",
  "Fishers",
  "Gandla",
  "Gangtredhu",
  "Jangam",
  "Kadulu",
  "Kalali",
  "Kalasali",
  "Kaligullu",
  "Kama",
  "Kamasala",
  "Kamma",
  "Kammara",
  "Kantlli",
  "Kapu",
  "Kapuvelama",
  "Karnam",
  "Kavunis",
  "Kayunllu",
  "Khan",
  "Kolli",
  "Komati",
  "Kommari",
  "Koppalavelama",
  "Kopplavelama",
  "Kouda",
  "Koya",
  "Kummara",
  "Kuppalavelama",
  "Kuraba",
  "Madarlu",
  "Madiga",
  "Madivili",
  "Mala",
  "Mandiga",
  "Mandula",
  "Mangala",
  "Mangali",
  "Marwadi",
  "Maryali",
  "Miniramanu",
  "Modugu",
  "Mond",
  "Muslim",
  "Muthrasi",
  "Nadar",
  "Nagvamsham",
  "Naidu",
  "Nainera",
  "Nayaka",
  "Naybrahmanulu",
  "Nese",
  "Odde",
  "Padmasali",
  "Pagani",
  "Palaeikri",
  "Palikapu",
  "Palle",
  "Petti",
  "Pingari",
  "Pujari",
  "Rabbari",
  "Rajaka",
  "Rajakulu",
  "Rajasthani",
  "Rajulu",
  "Ralliya",
  "Reddy",
  "Relli",
  "Sakala",
  "Sakli",
  "Sali",
  "Salilu",
  "Salivahana",
  "Sarabandu",
  "Satyam",
  "Sayed",
  "Segu",
  "Setti",
  "Shadi",
  "Sheetbarjen",
  "Sheikh",
  "Sugali",
  "Talari",
  "Telagamamdelu",
  "Telakula",
  "Teli",
  "Teluku",
  "Tentkalu",
  "Togata",
  "Uppara",
  "Vaddi",
  "Vadi",
  "Vangam",
  "Vedava",
  "Velama",
  "Vikanasa",
  "Visali",
  "Visalu",
  "Vishnu",
  "Viswabrahman",
  "Vysya",
  "Vyyulu",
  "Xasxa",
  "Yadav",
  "Yalama",
  "Yalavala",
  "Yanadi",
  "Yeava",
  "Yellu",
  "Yerkula",
  "Yerukala",
  "Yerukula",
];
const star = [
  "Abhijit",
  "Anuradha",
  "Ashwini",
  "Bharani",
  "Chitra",
  "Dhanishta",
  "Karthikai",
  "Rohini",
  "Mrigasiram",
  "Ardra /Thiruvathirai",
  "Punarpoosam",
  "PusamPushyam",
  "Aslesha",
  "Makam",
  "Poorva Phalguni",
  "Uthraphalguni",
  "Hastham",
  "Chitra",
  "Swathi",
  "Vishakha",
  "Anuradha",
  "Jyeshta",
  "Mulam",
  "Poorvashada",
  "Uthrashada",
  "Revathi",
  "Sravanam",
  "Sathabhisha",
  "Swati",
  "Poorvabhadrapada",
  "Utharabhadrapada",
  "Vishakha",
  "Revathi",
];

const zodiacSign = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];
const family = ["Underclass", "Low class", "Middle class", "Upper class"];
const familyTypes = [
  "Nuclear Family",
  "Single-Parent Family",
  "Joint Family",
  "Blended Family",
];
const occupationsofFather = [
  "Business Owner",
  "Employed",
  "Professional",
  "Retired",
  "Unemployed",
  "Passed Away",
  "Others",
];
const occupationsOfMother = [
  "Others",
  "Home maker",
  "Employed",
  "Business",
  "Retired",
  "Unemployed",
  "Passed Away",
];
const noOfSiblings = ["1", "2", "3", "4", "5"];
const maritalStatus = ["Single", "Married", "Divorced", "Widowed"];
const disabilitiesOptions = [
  "Visual Impairment",
  "Hearing Impairment",
  "Mobility Impairment",
  "Cognitive/Intellectual Impairment",
  "Psychiatric/Mental Health Condition",
  "Chronic Illness",
  "Other",
];

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    caste: "",
    subCaste: "",
    gothrum: "",
    star: "",
    zodiacSign: "",
    dosham: "",
    family: "",
    familyType: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    maritalStatus: "",
    disability: "",
    height: "",
    weightUnit: "",
    weight: "",
    bodyType: "",
    complexion: "",
    drinkingHabits: "",
    smokingHabits: "",
    aboutYourself: "",
    eatingHabits: "",
  });
  const personalData = useSelector((store)=>store.RegistrationDetails.personalData)
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({
    caste: "",
    subCaste: "",
    gothrum: "",
    star: "",
    zodiacSign: "",
    dosham: "",
    family: "",
    familyType: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    maritalStatus: "",
    disability: "",
    height: "",
    weightUnit: "",
    weight: "",
    bodyType: "",
    complexion: "",
    drinkingHabits: "",
    smokingHabits: "",
    aboutYourself: "",
    eatingHabits: "",
  });
  const [currentError, setCurrentError] = useState("");

  const formFields = [
    "caste",
    "subCaste",
    "gothrum",
    "star",
    "zodiacSign",
    "dosham",
    "family",
    "familyType",
    "fatherName",
    "fatherOccupation",
    "motherName",
    "motherOccupation",
    "siblings",
    "maritalStatus",
    "disability",
    "height",
    "weightUnit",
    "weight",
    "bodyType",
    "complexion",
    "drinkingHabits",
    "smokingHabits",
    "aboutYourself",
    "eatingHabits",
  ];
  const handleBlur = (name) => {
    const value = formData[name];
    validateField(name, value);
  };
  const handleSelectChange = (selectedOption, action) => {
    setFormData({ ...formData, [action.name]: selectedOption.value });
    validateField(action.name, selectedOption.value);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };
  
  const validateField = (name, value) => {
    let error = "";
    if (!value || (typeof value === "string" && value.trim() === "")) {
      error = `${name} is required`;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  
    if (error) {
      setCurrentError(name);
    } else if (currentError === name) {
      setCurrentError("");
    }
    return !error;
  };
  
  const validateForm = () => {
    let isValid = true;
    for (const field of formFields) {
      isValid = validateField(field, formData[field]) && isValid;
      if (!isValid) break;
    }
    return isValid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("User personal Registered Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
  
      dispatch(saveFormData(formData));
      dispatch(nextStep());
    } else if (currentError) {
      const errorField = document.getElementById(currentError);
      if (errorField) errorField.focus();
    }
  };
  
  
  const prev = () => {
    dispatch(prevStep());
  };

  const generateHeightOptions = () => {
    const options = [];
    for (let feet = 3; feet <= 7; feet++) {
      for (let inches = 0; inches < 12; inches++) {
        options.push({
          value: `${feet} ft ${inches} in`,
          label: `${feet} ft ${inches} in`,
        });
      }
    }
    return options;
  };

  const heightOptions = generateHeightOptions();
  const weightUnits = [
    { value: "kg", label: "Kg" },
    { value: "lbs", label: "Lbs" },
  ];

  const casteOptions = castes.map((caste) => ({ value: caste, label: caste }));
  const subCasteOptions = subCastes.map((subCaste) => ({
    value: subCaste,
    label: subCaste,
  }));
  const starOptions = star.map((s) => ({ value: s, label: s }));
  const zodiacSignOptions = zodiacSign.map((z) => ({ value: z, label: z }));
  const familyOptions = family.map((item) => ({ value: item, label: item }));
  const familyTypeOptions = familyTypes.map((item) => ({
    value: item,
    label: item,
  }));
  const fatherOccupationOptions = occupationsofFather.map((item) => ({
    value: item,
    label: item,
  }));
  const motherOccupationOptions = occupationsOfMother.map((item) => ({
    value: item,
    label: item,
  }));
  const siblingsOptions = noOfSiblings.map((item) => ({
    value: item,
    label: item,
  }));
  const maritalStatusOptions = maritalStatus.map((status) => ({
    value: status,
    label: status,
  }));
  const disabilitiesOptionsList = disabilitiesOptions.map((disability) => ({
    value: disability,
    label: disability,
  }));
  const weightOptionsKg = Array.from({ length: 200 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} kg`,
  }));
  const weightOptionsLbs = Array.from({ length: 440 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} lbs`,
  }));

  const bodyTypeOptions = [
    { value: "Slim", label: "Slim" },
    { value: "Athletic", label: "Athletic" },
    { value: "Average", label: "Average" },
    { value: "Heavy", label: "Heavy" },
  ];

  const complexionOptions = [
    { value: "Pale", label: "Pale" },
    { value: "Fair", label: "Fair" },
    { value: "Medium", label: "Medium" },
    { value: "Naturally brown", label: "Naturally brown" },
    { value: "Black", label: "Black" },
  ];

  const drinkingHabitsOptions = [
    { value: "I don’t Drink", label: "I don’t Drink" },
    { value: "Once a week", label: "Once a week" },
    { value: "Twice/ trice a month", label: "Twice/ trice a month" },
    { value: "Almost every night", label: "Almost every night" },
    { value: "Very rarely", label: "Very rarely" },
  ];

  const smokingHabitsOptions = [
    { value: "Non-smoker", label: "Non-smoker" },
    { value: "Occasional smoker", label: "Occasional smoker" },
    { value: "Regular smoker", label: "Regular smoker" },
  ];

  const eatingHabitsOptions = [
    { value: "Veg", label: "Veg" },
    { value: "Non Veg", label: "Non Veg" },
    { value: "Vegan", label: "Vegan" },
  ];
  useEffect(() => {
    if (personalData && Object.keys(personalData).length > 0) {
      setFormData(personalData);

      
    }
  }, [personalData]);
  return (
    <>
      <Form>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <h1 className="registrationHeading">Religion Information</h1>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Select
                id="caste"
                name="caste"
                value={casteOptions.find(
                  (option) => option.value === formData.caste
                )}
                options={casteOptions}
                onChange={handleSelectChange}
                onBlur={() => handleBlur("caste")}
                classNamePrefix="react-select"
                className="dob1 custom-input"
                placeholder="Caste"
              />
              {errors.caste && currentError === "caste" && (
                <FormFeedback className="d-block">{errors.caste}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Select
                id="subCaste"
                name="subCaste"
                value={subCasteOptions.find(
                  (option) => option.value === formData.subCaste
                )}
                options={subCasteOptions}
                onChange={handleSelectChange}
                onBlur={() => handleBlur("subCaste")}
                classNamePrefix="react-select"
                className="dob1 custom-input"
                placeholder="Subcaste"
              />
              {errors.subCaste && currentError === "subCaste" && (
                <FormFeedback className="d-block">
                  {errors.subCaste}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form className="mb-3">
          <Col md={12}>
            <FormGroup check inline>
              <Label check>
                <Input type="radio" name="marryCommunity"  className="textinput"/> Willing to marry
                from other community also
              </Label>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                id="gothrum"
                name="gothrum"
                value={formData.gothrum}
                onChange={handleChange}
                onBlur={() => handleBlur("gothrum")}
                className="dob1 custom-input"
                placeholder="Gothru(m)"
              />
              {errors.gothrum && currentError === "gothrum" && (
                <FormFeedback className="d-block">
                  {errors.gothrum}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Input
                type="select"
                id="star"
                name="star"
                value={formData.star}
                onChange={handleChange}
                onBlur={() => handleBlur("star")}
                className="dob1 custom-input"
                invalid={!!errors.star}>
                <option value="" disabled>
                  Star
                </option>
                {starOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.star && currentError === "star" && (
                <FormFeedback className="d-block">{errors.star}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Input
                type="select"
                id="zodiacSign"
                name="zodiacSign"
                value={formData.zodiacSign}
                onChange={handleChange}
                onBlur={() => handleBlur("zodiacSign")}
                className="dob1 custom-input"
                invalid={!!errors.zodiacSign}>
                <option value="" disabled>
                  Zodiac Sign
                </option>
                {zodiacSignOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.zodiacSign && currentError === "zodiacSign" && (
                <FormFeedback className="d-block">
                  {errors.zodiacSign}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
  <Col md={6}>
    <FormGroup className="dob1 custom-input">
      <div className="border rounded p-2 d-flex align-items-center">
        <Label className="mb-2 me-3">Have Dosham?</Label>
        <div className="d-flex align-items-center">
          <FormGroup check className="me-3">
            <Label check>
              <Input
                type="radio"
                name="dosham"
                value="Yes"
                checked={formData.dosham === "Yes"}
                onChange={handleChange}
                invalid={formData.dosham === "" && errors.dosham}
              />
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="dosham"
                value="No"
                checked={formData.dosham === "No"}
                onChange={handleChange}
                invalid={formData.dosham === "" && errors.dosham}
              />
              No
            </Label>
          </FormGroup>
        </div>
      </div>
      {errors.dosham && currentError === "dosham" && (
        <FormFeedback className="d-block ms-3">
          {errors.dosham}
        </FormFeedback>
      )}
    </FormGroup>
  </Col>
</Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <h1 className="registrationHeading">Family Details</h1>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="family"
                name="family"
                value={formData.family}
                onChange={handleChange}
                onBlur={() => handleBlur("family")}
                className="dob1 custom-input"
                invalid={!!errors.family}>
                <option value="" disabled>
                  Family
                </option>
                {familyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.family && currentError === "family" && (
                <FormFeedback className="d-block">{errors.family}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="familyType"
                name="familyType"
                value={formData.familyType}
                onChange={handleChange}
                onBlur={() => handleBlur("familyType")}
                className="dob1 custom-input"
                invalid={!!errors.familyType}>
                <option value="" disabled>
                  Family Type
                </option>
                {familyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.familyType && currentError === "familyType" && (
                <FormFeedback className="d-block">
                  {errors.familyType}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                onBlur={() => handleBlur("fatherName")}
                className="dob1 custom-input"
                placeholder="Father's Name"
              />
              {errors.fatherName && currentError === "fatherName" && (
                <FormFeedback className="d-block">
                  {errors.fatherName}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="fatherOccupation"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                onBlur={() => handleBlur("fatherOccupation")}
                className="dob1 custom-input"
                invalid={!!errors.fatherOccupation}>
                <option value="" disabled>
                  Father Occupation
                </option>
                {fatherOccupationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.fatherOccupation &&
                currentError === "fatherOccupation" && (
                  <FormFeedback className="d-block">
                    {errors.fatherOccupation}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                onBlur={() => handleBlur("motherName")}
                className="dob1 custom-input"
                placeholder="Mother's Name"
              />
              {errors.motherName && currentError === "motherName" && (
                <FormFeedback className="d-block">
                  {errors.motherName}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="motherOccupation"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                onBlur={() => handleBlur("motherOccupation")}
                className="dob1 custom-input"
                invalid={!!errors.motherOccupation}>
                <option value="" disabled>
                  Mother Occupation
                </option>
                {motherOccupationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.motherOccupation &&
                currentError === "motherOccupation" && (
                  <FormFeedback className="d-block">
                    {errors.motherOccupation}
                  </FormFeedback>
                )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="siblings"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
                onBlur={() => handleBlur("siblings")}
                className="dob1 custom-input"
                invalid={!!errors.siblings}>
                <option value="" disabled>
                  Number of Siblings
                </option>
                {siblingsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.siblings && currentError === "siblings" && (
                <FormFeedback className="d-block">
                  {errors.siblings}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={12}>
            <FormGroup>
              <h1 className="registrationHeading">Personal Information</h1>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Input
                type="select"
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                onBlur={() => handleBlur("maritalStatus")}
                className="dob1 custom-input"
                invalid={!!errors.maritalStatus}>
                <option value="" disabled>
                  Marital Status
                </option>
                {maritalStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.maritalStatus && currentError === "maritalStatus" && (
                <FormFeedback className="d-block">
                  {errors.maritalStatus}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Input
                type="select"
                id="disability"
                name="disability"
                value={formData.disability}
                onChange={handleChange}
                onBlur={() => handleBlur("disability")}
                className="dob1 custom-input"
                invalid={!!errors.disability}>
                <option value="" disabled>
                  Disabilities
                </option>
                {disabilitiesOptionsList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.disability && currentError === "disability" && (
                <FormFeedback className="d-block">
                  {errors.disability}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                onBlur={() => handleBlur("height")}
                className="dob1 custom-input"
                invalid={!!errors.height}>
                <option value="" disabled>
                  Height
                </option>
                {heightOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.height && currentError === "height" && (
                <FormFeedback className="d-block">{errors.height}</FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Row form>
                <Col md={6}>
                  <Input
                    type="select"
                    id="weightUnit"
                    name="weightUnit"
                    value={formData.weightUnit}
                    onChange={handleChange}
                    onBlur={() => handleBlur("weightUnit")}
                    className="dob1 custom-input"
                    invalid={!!errors.weightUnit}>
                    <option value="" disabled>
                      Weight
                    </option>
                    {weightUnits.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Input>
                  {errors.weightUnit && currentError === "weightUnit" && (
                    <FormFeedback className="d-block">
                      {errors.weightUnit}
                    </FormFeedback>
                  )}
                </Col>
                <Col md={6}>
                  <Input
                    type="select"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    onBlur={() => handleBlur("weight")}
                    className="dob1 custom-input"
                    invalid={!!errors.weight}
                    disabled={!formData.weightUnit}>
                    <option value="" disabled>
                      Select
                    </option>
                    {(formData.weightUnit === "kg"
                      ? weightOptionsKg
                      : weightOptionsLbs
                    ).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Input>
                  {errors.weight && currentError === "weight" && (
                    <FormFeedback className="d-block">
                      {errors.weight}
                    </FormFeedback>
                  )}
                </Col>
              </Row>
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="bodyType"
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                onBlur={() => handleBlur("bodyType")}
                className="dob1 custom-input"
                invalid={!!errors.bodyType}>
                <option value="" disabled>
                  Body Type
                </option>
                {bodyTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.bodyType && currentError === "bodyType" && (
                <FormFeedback className="d-block">
                  {errors.bodyType}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="complexion"
                name="complexion"
                value={formData.complexion}
                onChange={handleChange}
                onBlur={() => handleBlur("complexion")}
                className="dob1 custom-input"
                invalid={!!errors.complexion}>
                <option value="" disabled>
                  Complexion
                </option>
                {complexionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.complexion && currentError === "complexion" && (
                <FormFeedback className="d-block">
                  {errors.complexion}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="drinkingHabits"
                name="drinkingHabits"
                value={formData.drinkingHabits}
                onChange={handleChange}
                onBlur={() => handleBlur("drinkingHabits")}
                className="dob1 custom-input"
                invalid={!!errors.drinkingHabits}>
                <option value="" disabled>
                  Drinking Habits
                </option>
                {drinkingHabitsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.drinkingHabits && currentError === "drinkingHabits" && (
                <FormFeedback className="d-block">
                  {errors.drinkingHabits}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="smokingHabits"
                name="smokingHabits"
                value={formData.smokingHabits}
                onChange={handleChange}
                onBlur={() => handleBlur("smokingHabits")}
                className="dob1 custom-input"
                invalid={!!errors.smokingHabits}>
                <option value="" disabled>
                  Smoking Habits
                </option>
                {smokingHabitsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.smokingHabits && currentError === "smokingHabits" && (
                <FormFeedback className="d-block">
                  {errors.smokingHabits}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
        </Row>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Input
                type="textarea"
                id="aboutYourself"
                name="aboutYourself"
                value={formData.aboutYourself}
                onChange={handleChange}
                onBlur={() => handleBlur("aboutYourself")}
                className="registration1-input"
                placeholder="About Yourself (interests, hobbies, etc.)"
                rows="4"
              />
              {errors.aboutYourself && currentError === "aboutYourself" && (
                <FormFeedback className="d-block">
                  {errors.aboutYourself}
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Input
                type="select"
                id="eatingHabits"
                name="eatingHabits"
                value={formData.eatingHabits}
                onChange={handleChange}
                onBlur={() => handleBlur("eatingHabits")}
                className="dob1 custom-input"
                invalid={!!errors.eatingHabits}>
                <option value="" disabled>
                  Eating Habits
                </option>
                {eatingHabitsOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
              {errors.eatingHabits && (
                <FormFeedback className="d-block">
                  {errors.eatingHabits}
                </FormFeedback>
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
      
    </>
  );
};

export default PersonalDetails;
