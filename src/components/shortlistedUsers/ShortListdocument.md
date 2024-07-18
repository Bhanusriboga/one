Overview:

The ShortListedUsers component is a React functional component that displays a list of shortlisted users with pagination functionality. It allows users to be moved to an ignore list, dynamically updating the displayed user list and showing a popup notification when a user is ignored. The component is styled with custom CSS and uses reactstrap for layout and pagination.

Dependencies:

React: Core library for building user interfaces.

Reactstrap: Bootstrap 4 components built with React.

React Router: For navigation.

react-icons/fa6: For the back button icon.

CSS: Custom styles for the component.

State Variables:

currentPage: Tracks the current page in pagination.

ignoreList: Stores the IDs of users that have been ignored.

popupVisible: Controls the visibility of the popup notification.

Helper Functions:

handleMoveToIgnoreList: Adds a user ID to the ignoreList and shows the popup.

handlePageChange: Updates the currentPage state when a pagination link is clicked.

showPopup: Sets popupVisible to true and hides it after 2 seconds using a timeout.

Main Render Function :

The component renders the following elements:

Back Button: Navigates to the previous page.

Heading: Displays the title "Shortlisted".

User Cards: Displays user cards in a responsive grid layout.

Pagination: Allows navigation between pages of users.

Popup Notification: Displays a message when a user is ignored.

Filtering and Pagination :

Users in the ignoreList are filtered out from the main user list.

The number of pages is recalculated based on the filtered user list.

When a user is ignored and removed from the current page, the component ensures that the correct number of users is displayed on the page by updating the currentPage state if necessary.

CSS Styles:

Custom styles are applied through the Usercard.css file.

The popup notification is styled to appear in the top of the screen.

Summary :

The ShortListedUsers component effectively handles the display and pagination of a list of shortlisted users, allowing for dynamic updates when users are ignored. It provides a user-friendly interface with a responsive layout and visual feedback through a popup notification. The component is built with React, Reactstrap, and custom CSS, ensuring a clean and functional design.
