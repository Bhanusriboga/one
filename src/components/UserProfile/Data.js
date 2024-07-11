import { userProfile as title } from '../../utils/constants';

export const User = {
  id: 1,
  name: "John Doe",
  Data_of_birth: '2000-05-24',
  time_of_birth: "1988-06-15T14:30:00Z",
  Religion: 'Hinduism',
  religion: {
    religion_name: "Christianity",
    caste: "Catholic",
    gothra: "N/A",
    zodiac_sign: "Gemini",
    dosham: "None"
  },
  mother_tongue: "English",
  language_proficiency: ["English", "Spanish"],
  linkedin_id: "john-doe-12345",
  instagram_id: 'jhon-doe-12345',
  address: "123MainSt,Springfield",
  citizenship: "USA",
  family_information: {
    family_status: "Middle class",
    father_name: "Michael Doe",
    mother_name: "Jane Doe",
    siblings: ["Mark Doe", "Emma Doe"]
  },
  personal_information: {
    marital: ["married,divorced"],
    complexion: "Fair",
    body_type: "Athletic",
    weight: "75kg",
    any_disability: "None",
    height: "180cm",
    eating_habits: "Non-vegetarian",
    drinking_habits: "Occasionally",
    smoking_habits: "No",
    about_me: "Software engineer with a passion for travel and photography."
  },
  professional_details: {
    highest_education: "M.Sc. in Computer Science",
    name_of_institute: "MIT",
    year_of_passing: "2012",
    employ_status: "Employed",
    employed_in: "Private sector",
    occupation: "Software Engineer",
    work_location: "San Francisco, CA, USA",
    state: "California",
    city: "San Francisco"
  },

  Name: {
    name: "ABCDEF"
  },
  button: {
    back: 'Back'
  }
}

export const Personal = [
  { key: 'Caste :', value: User.religion.caste },
  { key: 'Gothra :', value: User.religion.gothra },
  { key: 'Zodiac Sign :', value: User.religion.zodiac_sign },
  { key: 'Dosham :', value: User.religion.dosham }
]
export const familyInformation = [
  { key: 'Family Status:', value: User.family_information.family_status },
  { key: 'Father:', value: User.family_information.father_name },
  { key: 'Mother Name', value: User.family_information.mother_name },
  { key: 'Siblings:', value: User.family_information.siblings }
]
export const PersonalInformation = [
  { key: 'Marital Status :', value: User.personal_information.marital },
  { key: 'Complexion :', value: User.personal_information.complexion },
  { key: 'Any Disabilities:', value: User.personal_information.any_disability },
  { key: 'Body Type:', value: User.personal_information.body_type },
  { key: 'Drinking Habits:', value: User.personal_information.drinking_habits },
  { key: 'Eating Habits:', value: User.personal_information.eating_habits },
  { key: 'Smoking Habits:', value: User.personal_information.smoking_habits },
  { key: 'Weight :', value: User.personal_information.weight },
  { key: 'Height :', value: User.personal_information.height },
]
export const ProfessionalDetails = [
  { key: 'Highest Education :', value: User.professional_details.highest_education },
  { key: 'Year Of Passing:', value: User.professional_details.year_of_passing },
  { key: 'Name Of the Institute :', value: User.professional_details.name_of_institute },
  { key: 'Occupation :', value: User.professional_details.occupation },
  { key: 'Employment Status :', value: User.professional_details.employ_status },
  { key: 'Employed in :', value: User.professional_details.employed_in },
  { key: 'Work Location :', value: User.professional_details.work_location },
  { key: 'City :', value: User.professional_details.city },
  { key: 'State :', value: User.professional_details.state }
]
export const ReligionDetails = [
  { value: title.Religion }
]
export const family = [{ value: title.Family.FamilyInformation }]
export const Personals = [{ value: title.personal.PersonalInformation }]
export const professionals = [{ value: title.Professional.ProfessionalDetail }]
export const personalData = [
  { key: "Date of birth:", value: User.Data_of_birth },
  { key: "time of birth:", value: User.time_of_birth },
  { key: "Religion:", value: User.Religion },
  { key: "Mother Tongue:", value: User.mother_tongue },
  { key: 'Language Proficiency:', value: User.language_proficiency },
  { key: 'Instagram id:', value: User.instagram_id },
  { key: 'LinkedIn id:', value: User.linkedin_id },
  { key: 'Address:', value: User.address },
  { key: 'Citizenship:', value: User.citizenship }
]
export const userName = [
  { value: User.Name.name }
]
export const buttons = [{ value: User.button.back }]


