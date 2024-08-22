import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';

const maritalStatusOptions = ["Select","Single", "Married", "Divorced", "Widowed"];
const disabilitiesOptions = [
  "Select",
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
  {value:"Select",label:"Select"},
  { value: "Slim", label: "Slim" },
  { value: "Athletic", label: "Athletic" },
  { value: "Average", label: "Average" },
  { value: "Heavy", label: "Heavy" },
];
const complexionOptions = [
  {value:"Select",label:"Select"},
  { value: "Pale", label: "Pale" },
  { value: "Fair", label: "Fair" },
  { value: "Medium", label: "Medium" },
  { value: "Naturally brown", label: "Naturally brown" },
  { value: "Black", label: "Black" },
];
const drinkingHabitsOptions = [
  {value:"Select",label:"Select"},
  { value: "I don’t Drink", label: "I don’t Drink" },
  { value: "Once a week", label: "Once a week" },
  { value: "Twice/ thrice a month", label: "Twice/ thrice a month" },
  { value: "Almost every night", label: "Almost every night" },
  { value: "Very rarely", label: "Very rarely" },
];
const smokingHabitsOptions = [
  {value:"Select",label:"Select"},
  { value: "Non-smoker", label: "Non-smoker" },
  { value: "Occasional smoker", label: "Occasional smoker" },
  { value: "Regular smoker", label: "Regular smoker" },
];
const eatingHabitsOptions = [
  {value:"Select",label:"Select"},
  { value: "Veg", label: "Veg" },
  { value: "Non Veg", label: "Non Veg" },
  { value: "Vegan", label: "Vegan" },
];
const familyStatusOptions = ["Select","Underclass", "Low class", "Middle class", "Upper class"];
const familyTypeOptions = [
  "Select",
  "Nuclear Family",
  "Single-Parent Family",
  "Joint Family",
  "Blended Family",
];
const occupationsofFatherOptions = [
  "Select",
  "Business Owner",
  "Employed",
  "Professional",
  "Retired",
  "Unemployed",
  "Passed Away",
  "Others",
];
const occupationsOfMotherOptions = [
  "Select",
  "Others",
  "Home maker",
  "Employed",
  "Business",
  "Retired",
  "Unemployed",
  "Passed Away",
];
const noOfSiblingsOptions = ["Select","1", "2", "3", "4", "5"];
const casteOptions = ["Select", "Abdul",
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
const subcastOptions = ["Select","Golla",
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
const starOptions = ["Select","Abhijit",
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
const zodiacSignOptions = ["Select","Aries",
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
import { useDispatch, useSelector } from 'react-redux';
import { updatepersonaldetails, getpersonaldetails } from '../../redux/slices/users';
const initialDetails = {
  "Religion": {
    "Caste": "",
    "Sub-Caste": "",
    "Gothra": "",
    "Star": "",
    "Zodiac Sign": "",
    "About Dosham": ""
  },
  "Family Information": {
    "Family Status": "",
    "Family Type": "",
    "Father Name": "",
    "Father Occupation": "",
    "Mother Name": "",
    "Mother Occupation": "",
    "Siblings": ""
  },
  "Personal Information": {
    "Marital Status": "",
    "Complexion": "",
    "Any Disabilities": "",
    "Body Type": "",
    "Drinking Habits": "",
    "Eating Habits": "",
    "Smoking Habits": "",
    "Weight": "",
    "Height": "",
    "About me": "",
  }
};

const Personaldetails = () => {
  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { personaldetails } = useSelector(state => state.users)
  useEffect( () => {
     dispatch(getpersonaldetails());
  }, [])

  useEffect(() => {
    console.log(personaldetails,"personaldetails")
    if (personaldetails) {
      setDetails({
        "Religion": {
          "Caste": personaldetails?.caste?.toLowerCase(),
          "Sub-Caste": personaldetails?.subCaste?.toLowerCase(),
          "Gothra": personaldetails?.gothram?.toLowerCase(),
          "Star": personaldetails?.star?.toLowerCase(),
          "Zodiac Sign": personaldetails?.zodiacSign?.toLowerCase(),
          "About Dosham": personaldetails?.whatTypeOfDosham?.toLowerCase()
        },
        "Family Information": {
          "Family Status": personaldetails?.familyStatus?.toLowerCase(),
          "Family Type": personaldetails?.familyType?.toLowerCase(),
          "Father Name": personaldetails?.fatherName?.toLowerCase(),
          "Father Occupation": personaldetails?.fatherOccupation?.toLowerCase(),
          "Mother Name": personaldetails?.motherName?.toLowerCase(),
          "Mother Occupation": personaldetails?.motherOccupation?.toLowerCase(),
          "Siblings": personaldetails?.noOfSiblings?.toLowerCase()
        },
        "Personal Information": {
          "Marital Status": personaldetails?.maritalStatus?.toLowerCase(),
          "Complexion": personaldetails?.complexion?.toLowerCase(),
          "Any Disabilities": personaldetails?.anyDisabilities?.toLowerCase(),
          "Body Type": personaldetails?.bodyType?.toLowerCase(),
          "Drinking Habits": personaldetails?.drinkingHabits?.toLowerCase(),
          "Eating Habits": personaldetails?.eatingHabits?.toLowerCase(),
          "Smoking Habits": personaldetails?.smokingHabits?.toLowerCase(),
          "Weight": personaldetails?.weight?.toLowerCase(),
          "Height": personaldetails?.height?.toLowerCase(),
          "About me": personaldetails?.description?.toLowerCase(),
        }
      })
    }
  }, [personaldetails])
  const handleEdit = async () => {
    if (isEditing) {
      const newErrors = {};
      Object.entries(details).forEach(([section, sectionDetails]) => {
        Object.entries(sectionDetails).forEach(([key, value]) => {
          if (key !== 'Any Disabilities' && !value) {
            if (!newErrors[section]) newErrors[section] = {};
            newErrors[section][key] = `${key} is required`;
          }
          
        });
      });
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const payload = {
          "caste": details.Religion.Caste,
          "subCaste": details.Religion['Sub-Caste'],
          "gothram": details.Religion.Gothra,
          "star": details.Religion.Star,
          "zodiacSign": details.Religion['Zodiac Sign'],
          "haveDosham": details.Religion['About Dosham'] != '' ? true : false,
          "whatTypeOfDosham": details.Religion['About Dosham'],
          "familyStatus": details['Family Information']['Family Status'],
          "familyType": details['Family Information']['Family Type'],
          "fatherName": details['Family Information']['Father Name'],
          "fatherOccupation": details['Family Information']['Father Occupation'],
          "motherName": details['Family Information']['Mother Name'],
          "motherOccupation": details['Family Information']['Mother Occupation'],
          "noOfSiblings": details['Family Information'].Siblings,
          "maritalStatus": details['Personal Information']['Marital Status'],
          "anyDisabilities": details['Personal Information']['Any Disabilities'],
          "height": details['Personal Information'].Height,
          "weightType": details['Personal Information'].Weight,
          "weight": details['Personal Information'].Weight,
          "bodyType": details['Personal Information']['Body Type'],
          "complexion": details['Personal Information'].Complexion,
          "smokingHabits": details['Personal Information']['Smoking Habits'],
          "eatingHabits": details['Personal Information']['Eating Habits'],
          "description": details['Personal Information']['About me'],
          "drinkingHabits": details['Personal Information']['Drinking Habits']
        }
        const editresponse = await dispatch(updatepersonaldetails(payload));
        console.log(editresponse, 'editresponse')
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
              <MdEdit className='edit-icon' />
            </>}
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
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {maritalStatusOptions.map((option, i) => (
                              <option key={i} disabled={i==0}  value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Any Disabilities" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                          <option hidden disabled  value=''>Select</option>
                            {disabilitiesOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Body Type" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {bodyTypeOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Complexion" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {complexionOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Drinking Habits" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {drinkingHabitsOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Smoking Habits" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {smokingHabitsOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Eating Habits" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {eatingHabitsOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Family Status" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {familyStatusOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Family Type" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {familyTypeOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Father Occupation" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {occupationsofFatherOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Mother Occupation" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {occupationsOfMotherOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Siblings" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {noOfSiblingsOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Height" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {heightOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Weight" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {weightOptionsKg.map((option, i) => (
                              <option key={i} disabled={i==0} value={option.value}>{option.label}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Caste" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {casteOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Sub-Caste" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {subcastOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Star" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {starOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
                            ))}
                          </Form.Control>
                        ) : key === "Zodiac Sign" ? (
                          <Form.Control
                            as="select"
                            value={value ||""}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          >
                            <option hidden disabled  value=''>Select</option>
                            {zodiacSignOptions.map((option, i) => (
                              <option key={i} disabled={i==0} value={option}>{option}</option>
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
                    ) 
                    : 
                    (
                      
                        <p>{value || '-'}</p>
                       )
                    
                      }
                      {errors[sectionTitle] && errors[sectionTitle][key] && (
                        <div className='error-text'>{errors[sectionTitle][key]}</div>
                      )}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
          
        </div>
      ))}
      <hr />
    </Container>

  );
};

export default Personaldetails;


