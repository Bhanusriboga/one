
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Details.css';
import { MdEdit } from "react-icons/md";
import { EditProfile } from '../../utils/constants';
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
    "Siblings": "1"
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
          if (!value) {
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
    setDetails({
      ...details,
      [section]: {
        ...details[section],
        [key]: e.target.value
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
                        {key === "About me" ? (
                          <textarea
                            className='form-control'
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          />
                        ) : (
                          <input
                            type="text"
                            className='form-control'
                            value={value}
                            onChange={(e) => handleChange(e, sectionTitle, key)}
                          />
                        )}
                        {errors[sectionTitle] && errors[sectionTitle][key] && <p className="error-text">{errors[sectionTitle][key]}</p>}
                      </>
                    ) : (
                      <p className='valtext'>{value}</p>
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

