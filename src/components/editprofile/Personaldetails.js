import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';

const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const disabilitiesOptions = [
  "Visual Impairment",
  "Hearing Impairment",
  "Mobility Impairment",
  "Cognitive/Intellectual Impairment",
  "Psychiatric/Mental Health Condition",
  "Chronic Illness",
  "Other",
];
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
  { value: "Twice/ thrice a month", label: "Twice/ thrice a month" },
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
const familyStatusOptions = ["Underclass", "Low class", "Middle class", "Upper class"];
const familyTypeOptions = [
  "Nuclear Family",
  "Single-Parent Family",
  "Joint Family",
  "Blended Family",
];
const occupationsofFatherOptions = [
  "Business Owner",
  "Employed",
  "Professional",
  "Retired",
  "Unemployed",
  "Passed Away",
  "Others",
];
const occupationsOfMotherOptions = [
  "Others",
  "Home maker",
  "Employed",
  "Business",
  "Retired",
  "Unemployed",
  "Passed Away",
];
const noOfSiblingsOptions = ["1", "2", "3", "4", "5"];
const casteOptions = [ "Abdul",
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
  "Yerukula",];
const subcastOptions = ["Golla",
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
  "Desai",];
const starOptions = ["Abhijit",
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
  "Revathi",];
const zodiacSignOptions = ["Aries",
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
  "Pisces",];
const weightOptionsKg = Array.from({ length: 200 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} kg`,
}));

const initialDetails = {
  "Religion": {
    "Caste": "General",
    "Sub-Caste": "Sub-caste 1",
    "Gothra": "xyz",
    "Star": "Star 1",
    "Zodiac Sign": "Aries",
    "About Dosham": "xyz"
  },
  "Family Information": {
    "Family Status": "Middle class",
    "Family Type": "Nuclear Family",
    "Father Name": "John Doe",
    "Father Occupation": "Employed",
    "Mother Name": "Jane Doe",
    "Mother Occupation": "Home maker",
    "Siblings": "2"
  },
  "Personal Information": {
    "Marital Status": "Single",
    "Complexion": "Fair",
    "Any Disabilities": "Visual Impairment",
    "Body Type": "Slim",
    "Drinking Habits": "I don’t Drink",
    "Eating Habits": "Non Veg",
    "Smoking Habits": "Non-smoker",
    "Weight": "70",
    "Height": "5 ft 10 in",
    "About me": "xyzxyz",
  }
};

const Personaldetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    if (isEditing) {
      const newErrors = {};
      Object.entries(details).forEach(([section, sectionDetails]) => {
        Object.entries(sectionDetails).forEach(([key, value]) => {
          if (!value) {
            if (!newErrors[section]) newErrors[section] = {};
            newErrors[section][key] = `${key} is required`;
          }
        });
      });
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleChange = (e, section, key) => {
    const value = e.target.value;
    setDetails({
      ...details,
      [section]: {
        ...details[section],
        [key]: value
      }
    });

    if (errors[section] && errors[section][key]) {
      setErrors({
        ...errors,
        [section]: {
          ...errors[section],
          [key]: ''
        }
      });
    }
  };

  return (
    <Container>
      <div className='main-header mb-2'>
        <h2 className='main-heading'>{EditProfile.personaldetails}</h2>
        <button className="edit-btn ml-1" onClick={handleEdit}>
          {isEditing ? <>Save</> :
           <>
           {EditProfile.edit}
           <MdEdit className='edit-icon'/>
          </> }
        </button>
      </div>
      {Object.entries(details).map(([sectionTitle, sectionDetails]) => (
        <div key={sectionTitle}>
          <h3 className="sub-heading">{sectionTitle}</h3>
          <Row>
            {Object.entries(sectionDetails).map(([key, value], index) => (
              <Col md={6} key={index} className="mb-2">
                <Row>
                  <Col xs={6}><p className='keytext'>{key}:</p></Col>
                  <Col xs={6}>
                    {isEditing ? (
                      <>
                        {key === "Marital Status" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {maritalStatusOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Any Disabilities" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {disabilitiesOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Body Type" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {bodyTypeOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Complexion" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {complexionOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Drinking Habits" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {drinkingHabitsOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Smoking Habits" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {smokingHabitsOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Eating Habits" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {eatingHabitsOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Family Status" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {familyStatusOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Family Type" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {familyTypeOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Father Occupation" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {occupationsofFatherOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Mother Occupation" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {occupationsOfMotherOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Siblings" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {noOfSiblingsOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Height" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {heightOptions.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Weight" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {weightOptionsKg.map((option, i) => (
                              <option key={i} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Caste" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {casteOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Sub-Caste" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {subcastOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Star" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {starOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Zodiac Sign" ? (
                          <Form.Control
                            as="select"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            {zodiacSignOptions.map((option, i) => (
                              <option key={i} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : (
                          <Form.Control
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          />
                        )}
                      </>
                    ) : (
                      <p className='valuetext'>{value}</p>
                    )}
                  </Col>
                </Row>
                {errors[sectionTitle] && errors[sectionTitle][key] && (
                  <div className='error-message'>{errors[sectionTitle][key]}</div>
                )}
              </Col>
            ))}
          </Row>
          
        </div>
      ))}
      <hr/>
    </Container>
  );
};

export default Personaldetails;


