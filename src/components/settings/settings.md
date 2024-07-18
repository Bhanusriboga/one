**Overview**

The Settings component provides a user interface for managing various account settings, including email changes, password updates, profile privacy options, and profile deletion. It is built using React and the reactstrap library for form elements and styling.

**Dependencies**

- react
- reactstrap
- Settings.css (for custom styling)

**State Variables**

- email: Stores the current email address.
- otp: Stores the OTP entered by the user.
- newMail: Stores the new email address.
- currentPassword: Stores the current password.
- newPassword: Stores the new password.
- confirmPassword: Stores the confirmation of the new password.
- showOtp: Boolean flag to show/hide OTP input fields.
- profilePrivacy: Boolean flag for profile privacy settings.
- deleteProfile: Boolean flag to indicate if the profile deletion process is initiated.
- deleteReason: Stores the reason for profile deletion.

**Handlers**

- handleInputChange: Generic handler to update state variables based on input changes.
- handleCheckboxChange: Generic handler to update boolean state variables based on checkbox changes.
- handleEmailVerify: Handler to verify the email, triggering the OTP input field.
- logout: Handler to manage user logout.
- handleSubmit: Handler for form submission with validation for OTP.

**Form Sections**

The form is divided into several sections, each handling a specific setting:

**Change Email**

- Input for current email address.
- Button to trigger email verification and display OTP fields.
- Input fields for OTP and new email address, displayed conditionally based on showOtp.

**Change Password**

- Input fields for current password, new password, and password confirmation.

**Profile Privacy**

- Checkbox to toggle profile privacy settings.

**Delete Profile**

- Checkbox to initiate profile deletion.
- Radio buttons for selecting the reason for profile deletion, displayed conditionally based on deleteProfile.

**Logout**

- Button to log out of the account.

**Save Changes**

- Button to save all changes made in the settings form.

**Styling**

Custom styling is applied using the Settings.css file. Key classes used include:

- title: Styling for the main title.
- subTitle: Styling for section titles.
- input-email: Specific styling for email input fields.
- input-otp: Specific styling for OTP input fields.
- input-style: General styling for other input fields.
- logout: Styling for logout and verify buttons.
- verify: Additional styling for the verify button.
- logout-design: Specific styling for the logout button.
- save-button: Styling for the save button.
- save-button-container: Container styling for the save button.
- radio-container: Container styling for radio button elements.
- radio-label: Styling for radio button labels.

