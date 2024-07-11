**State Management**

The component uses the useState hook to manage the state of the active content. The activeContent state determines which content section is currently displayed.

**Button Data**

An array named buttonData holds the data for the sidebar buttons. Each button has an id and a label:

- editImage: Edit Image
- addPreferences: Add Preferences
- editProfile: Edit Profile
- ignoredUsers: Ignored Users
- shortlisted: Shortlisted
- settings: Settings

**RenderContent Function**

The RenderContent function uses a switch statement to render the appropriate content based on the value of activeContent. Possible values include:

- editImage: Displays "Edit Image Content"
- addPreferences: Displays "Add Preferences Content"
- editProfile: Displays "Edit Profile Content"
- ignoredUsers: Displays "Ignored Users Content"
- shortlisted: Displays "Shortlisted Content"
- settings: Displays the Settings component

**Layout**

The layout is structured using Reactstrap's Container, Row, and Col components:

- **Sidebar (Col)**: Contains buttons to switch between content sections. Each button sets the activeContent state when clicked.
- **Content Area (Col)**: Displays the content corresponding to the current value of activeContent.

**Styling**

- **Bootstrap CSS**: Imported from bootstrap/dist/css/bootstrap.min.css.
- **Custom CSS**: Specific styles for the component are defined in CommanSideBar.css.

**Usage**

1. **Import Dependencies**: Ensure that React, Reactstrap, Bootstrap, Font Awesome, and your custom CSS are imported.
1. **State Initialization**: The component initializes the activeContent state with a default value ('userImage').
1. **Button Click Handling**: Each button in the sidebar updates the activeContent state, which triggers a re-render of the RenderContent function to display the appropriate content.
1. **Component Structure**: The component is structured into a sidebar and a content area using Reactstrap's grid system.

