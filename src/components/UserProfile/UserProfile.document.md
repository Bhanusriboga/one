**Overview**

  The User8 component is a userInterface profile card that displays user details and 
 allows the user to change the main profile image by clicking on thumbnail images. 
 It also includes interactive icons (heart and minus) for additional functionality.
  
 **Dependencies**
 -React
 -reactStrap
 -Bootstrap
**state variable**
. imageSrc: Holds the source of the currently displayed main image. Initially set to 'Image1.jpeg'.
. images: Array of image paths used as thumbnails to change the main image.
. isHeartClicked: Boolean to toggle the heart icon's clicked state.
. isMinusClicked: Boolean to toggle the minus icon's clicked state
  
 **Handlers**
  . handleCardClick(image): Updates imageSrc to the clicked thumbnail image, changing the main displayed image.
  . handleHeartClick(): Toggles the isHeartClicked state, switching the heart icon between filled and outlined.
 . handleMinusClick(): Toggles the isMinusClicked state, switching the minus icon between filled and outlined.
 **Stucture**
 .Back Button:
Positioned using inline styles, navigates to the previous page on click.
.Main Content (Row):
Left Column (md="4"):
Contains a Card with a background image set to imageSrc.
Inside the card, two icons (heart and minus) that toggle between filled and outlined on click.
Right Column (md="8"):
Displays user details in CardText components. Currently, the details are placeholders (e.g., 'xyz').
.Image Thumbnails (Row):
Displays a list of thumbnails from the images array.
Clicking on a thumbnail updates the main image.
.User Input Component:
Includes the UserIn component within the image thumbnails row.
**Styling**
.Button Styles: Inline styles for positioning and padding.
.Card Styles: Inline styles for dimensions, background image, border radius, and margin.
.Icon Styles: Inline styles for size, color, and cursor pointer.
