Overview:

The IgnoreUsers component is a React component designed to manage and display a list of ignored users, allowing users to move specific individuals to a shortlist with options for pagination and responsive design. This component makes use of several third-party libraries and custom components to provide a rich user experience.

Libraries and Dependencies:

React: The core library for building the user interface.

Reactstrap: For responsive layout and styling with Col and Row.

React Router: For navigation (useNavigate).

React Toastify: For displaying notifications (toast).

Custom Components: IgnoreCard and PaginationComponent.

CSS: Custom styling is applied through Ignoreuser.css.

Assets: Images such as back.svg and Group 202.svg.

State Variables:

currentPage (number): Tracks the current page number for pagination.

shortList (array): Stores the IDs of users who have been moved to the shortlist.

pendingShortList (array): Temporarily holds user IDs during the transition to the shortlist.

usersPerPage (number): Determines the number of users displayed per page.

Functions:

handleMoveToShortList(userId)

Purpose: Moves a user to the pending shortlist, then to the final shortlist after a delay, unless the move is undone.

Parameters: userId (number) - The ID of the user to be moved.

Notifications: Uses toast to notify the user of the action and provide an option to undo.

undoMoveToShortList(userId, toastId)

Purpose: Removes a user from the pending shortlist and updates the notification.

Parameters:

userId (number) - The ID of the user to be removed from the pending shortlist.

toastId (number) - The ID of the toast notification to be updated.

handlePageChange(pageNumber)

Purpose: Updates the current page number for pagination.

Parameters: pageNumber (number) - The new page number.

handleResize()

Purpose: Adjusts the number of users displayed per page based on the window width.

Called by: A useEffect hook that adds and removes a resize event listener.

Hooks :

useEffect(() => { ... }, [])

Purpose: Sets up the initial number of users per page based on window size and adds an event listener for window resize.

Cleanup: Removes the event listener on component unmount.

useEffect(() => { ... }, [shortList, pendingShortList, currentPage, currentUsers.length])

Purpose: Adjusts the current page if the list of users changes and the current page becomes invalid (e.g., if the last user on the last page is moved to the shortlist).

Layout

Main Container: Contains the entire component content.

Header and Back Button: Provides a header and a back navigation button.

User Cards: Displays users in a responsive grid layout using Row and Col from Reactstrap. Each user card is rendered using the IgnoreCard component.

Pagination: Displays pagination controls at the bottom using the PaginationComponent

Custom Styles:

Dynamic Styles: Applied to user cards based on the index (even or odd) for alternating background colors.

Inline Styles: Used for the back button image and other elements.

Summary:

The IgnoreUsers component is a React component that manages a list of ignored users, allowing for moving users to a shortlist, with pagination and responsive design.


