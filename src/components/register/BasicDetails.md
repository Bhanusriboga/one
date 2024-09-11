# BasicsDetails Component Documentation

## Overview
The `BasicsDetails` component is a React form used for capturing user information such as:
- Date of Birth
- Place of Birth
- Time of Birth
- Religion
- Mother Tongue
- Citizenship
- Language Proficiency
- Social Media Handles (Instagram, LinkedIn)
- Address Details (Door No, Street No)

The component validates user input and saves the data using Redux.

## Dependencies
- **React**: Core library for building the UI.
- **Reactstrap**: For Bootstrap-based UI components.
- **react-datepicker**: For date and time selection.
- **react-toastify**: To display notifications.
- **React Redux**: For state management.
- **Custom CSS**: Styling for this component is located in `BasicsDetails.css`.

## Props
This component doesn't receive any props directly. It relies on `Redux` for dispatching actions and accessing the global state.

## State Management
Local state is used to handle form data and validation:

```js
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
    addressLine: ""
});
```
## Form Fields
The form includes the following fields:

- **Date of Birth**: Uses react-datepicker for selecting a date.
- **Time of Birth**: Uses a time picker from react-datepicker.
- **Place of Birth**: Standard text input for entering the location.
- **Religion**: Dropdown for selecting a religion.
- **Mother Tongue**: Text input for the user’s mother tongue.
- **Citizenship**: Dropdown for selecting the country of citizenship.
- **Language Proficiency**: Text input for languages known.
- **Instagram/LinkedIn ID**: Text inputs for entering social media handles.
- **Address Fields**: Inputs for Door No., Street No., and Address Line.

## Conclusion
The BasicsDetails component is a fully functional form component for capturing and validating user details. It leverages Redux for state management and integrates react-toastify for notifications and react-datepicker for date/time selection.