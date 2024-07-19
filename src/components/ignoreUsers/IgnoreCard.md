Overview:

The IgnoreCard component is a React component that displays individual user details in a card format. It provides options to view the user's profile and move the user to a shortlist.

Props:

The IgnoreCard component expects the following props:

user: An object containing user details.

backgroundColor: The background color of the card.

color: The text color of the card.

viewButtonColor: The text color of the "View Profile" button.

buttonBackgroundColor: The background color of the "View Profile" button.

onMoveToShortList: A callback function triggered when the shortlist icon is clicked.

Functions:

getAge(dob)

Purpose: Calculates the age of the user based on their date of birth.

Parameters: dob (string) - The date of birth of the user.

Returns: The age of the user.

Component Structure:

Main Container: Wraps the entire card content.

Icons Container: Holds the ignore and heart icons.

Image Container: Reserved for user image (currently empty).

User Information: Displays the user's name, age, and religion.

View Profile Button: A button that links to the user's profile page.

onMoveToShortList: A function to handle moving the user to the shortlist.

Custom Styles:

Dynamic Styles: Applied to the card and button based on the props.

CSS Class: Custom styles are defined in Ignoreuser.css.

External Libraries:

react-router-dom: For navigation (Link component).

react-icons: For icons (GoHeart).

react-bootstrap: For card layout (Card).
