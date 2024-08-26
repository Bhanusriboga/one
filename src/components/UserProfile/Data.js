import { userProfile as title } from '../../utils/constants';

export const User=(userData) => {
 return {
  Personal: [
    { key: 'Caste :', value: userData?.personalDetails?.caste },
    { key: 'Gothra :', value: userData?.personalDetails?.gothram},
    { key: 'Zodiac Sign :', value: userData?.personalDetails?.zodiacSign},
    { key: 'Dosham :', value: userData?.personalDetails?.haveDosham }
  ],
  familyInformation: [
    { key: 'Family Status:', value: userData?.personalDetails?.familyStatus },
    { key: 'Father:', value: userData?.personalDetails?.fatherName },
    { key: 'Mother Name', value: userData?.personalDetails?.motherName },
    { key: 'Siblings:', value: userData?.personalDetails?.noOfSiblings }
  ],
  PersonalInformation:[
    { key: 'Marital Status :', value: userData?.personalDetails?.maritalStatus },
    { key: 'Complexion :', value: userData?.personalDetails?.complexion },
    { key: 'Any Disabilities:', value: userData?.personalDetails?.anyDisabilities },
    { key: 'Body Type:', value: userData?.personalDetails?.bodyType },
    { key: 'Drinking Habits:', value: userData?.personalDetails?.drinkingHabits },
    { key: 'Eating Habits:', value: userData?.personalDetails?.eatingHabits },
    { key: 'Smoking Habits:', value: userData?.personalDetails?.smokingHabits },
    { key: 'Weight :', value: userData?.personalDetails?.weight },
    { key: 'Height :', value: userData?.personalDetails?.height },
  ],
  ProfessionalDetails:[
    { key: 'Highest Education :', value: userData?.professionalDetails?.highestEducation },
    { key: 'Year Of Passing:', value: userData?.professionalDetails?.yearOfPassOut },
    { key: 'Name Of the Institute :', value: userData?.professionalDetails?.nameOfInstitute },
    { key: 'Occupation :', value: userData?.professionalDetails?.occupation },
    { key: 'Employment Status :', value: userData?.professionalDetails?.employmentType },
    { key: 'Employed in :', value: userData?.professionalDetails?.employedIn },
    { key: 'Work Location :', value: userData?.professionalDetails?.workLocation },
    { key: 'City :', value: userData?.professionalDetails?.city },
    { key: 'State :', value: userData?.professionalDetails?.state }
  ],
  personalData: [
    { key: "Date of birth:", value: userData?.basicDetails?.dateOfBirth },
    { key: "time of birth:", value: userData?.basicDetails?.timeOfBirth },
    { key: "Religion:", value: userData?.basicDetails?.religion },
    { key: "Mother Tongue:", value: userData?.basicDetails?.motherTongue},
    { key: 'Language Proficiency:', value: userData?.basicDetails?.languageProficiency},
    { key: 'Instagram id:', value: userData?.basicDetails?.instgramId },
    { key: 'LinkedIn id:', value: userData?.basicDetails?.linkedinId },
    { key: 'Address:', value: userData?.basicDetails?.doorNumber },
    { key: 'Citizenship:', value: userData?.basicDetails?.citizenShip }
  ],
  userName: userData?.userName,
  buttons:userData?.button?.back
 }
}
export const Personal = [
  { key: 'Caste :', value: User?.religion?.caste },
  { key: 'Gothra :', value: User?.religion?.gothra },
  { key: 'Zodiac Sign :', value: User?.religion?.zodiac_sign },
  { key: 'Dosham :', value: User?.religion?.dosham }
]
export const familyInformation = [
  { key: 'Family Status:', value: User?.family_information?.family_status },
  { key: 'Father:', value: User?.family_information?.father_name },
  { key: 'Mother Name', value: User?.family_information?.mother_name },
  { key: 'Siblings:', value: User?.family_information?.siblings }
]
export const PersonalInformation = [
  { key: 'Marital Status :', value: User?.personal_information?.marital },
  { key: 'Complexion :', value: User?.personal_information?.complexion },
  { key: 'Any Disabilities:', value: User?.personal_information?.any_disability },
  { key: 'Body Type:', value: User?.personal_information?.body_type },
  { key: 'Drinking Habits:', value: User?.personal_information?.drinking_habits },
  { key: 'Eating Habits:', value: User?.personal_information?.eating_habits },
  { key: 'Smoking Habits:', value: User?.personal_information?.smoking_habits },
  { key: 'Weight :', value: User?.personal_information?.weight },
  { key: 'Height :', value: User?.personal_information?.height },
]
export const ProfessionalDetails = [
  { key: 'Highest Education :', value: User?.professional_details?.highest_education },
  { key: 'Year Of Passing:', value: User?.professional_details?.year_of_passing },
  { key: 'Name Of the Institute :', value: User?.professional_details?.name_of_institute },
  { key: 'Occupation :', value: User?.professional_details?.occupation },
  { key: 'Employment Status :', value: User?.professional_details?.employ_status },
  { key: 'Employed in :', value: User?.professional_details?.employed_in },
  { key: 'Work Location :', value: User?.professional_details?.work_location },
  { key: 'City :', value: User?.professional_details?.city },
  { key: 'State :', value: User?.professional_details?.state }
]
export const ReligionDetails = [
  { value: title?.Religion }
]
export const family = [{ value: title?.Family?.FamilyInformation }]
export const Personals = [{ value: title?.personal?.PersonalInformation }]
export const professionals = [{ value: title?.Professional?.ProfessionalDetail }]
export const personalData = [
  { key: "Date of birth:", value: User?.Data_of_birth },
  { key: "time of birth:", value: User?.time_of_birth },
  { key: "Religion:", value: User?.Religion },
  { key: "Mother Tongue:", value: User?.mother_tongue },
  { key: 'Language Proficiency:', value: User?.language_proficiency },
  { key: 'Instagram id:', value: User?.instagram_id },
  { key: 'LinkedIn id:', value: User?.linkedin_id },
  { key: 'Address:', value: User?.address },
  { key: 'Citizenship:', value: User?.citizenship }
]
export const userName = [
  { value: User?.Name?.name }
]
export const buttons = [{ value: User?.button?.back }]

