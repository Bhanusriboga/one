# CustomWidget Component Documentation
## Description

The CustomWidget component is a customizable chatbot widget built using
react-simple-chatbot. It offers a floating button to open and close the
chatbot interface and provides a conversational flow for matchmaking
services.
## Overview

The `CustomWidget` component provides a chatbot interface for matchmaking services using the `react-simple-chatbot` library. It includes functionality to toggle the chatbot, customize the theme, and handle user interactions via steps. The chatbot also fetches the user's profile picture using Redux.

## Dependencies

- `react`: Core React library for component-based UI development.
- `react-simple-chatbot`: A simple chatbot component for React applications.
- `styled-components`: Allows for theming and styling of the chatbot component.
- `react-redux`: Used for state management.
- Redux Slices: 
  - `getProfilePic` (ProfilePic slice): Fetches the user's profile picture.
  - `setIsOpen` (Users slice): Toggles the chatbot's visibility state.

## Props

This component does not receive any external props but manages its own internal state.

## State

The component uses the following states:

- **isOpen** (`useSelector` from Redux): Determines if the chatbot is currently open.
- **key** (`useState`): Manages the key for resetting the chatbot session.
- **isChatBotOpen** (`useState`): Local state to track whether the chatbot is open.
- **isButtonVisible** (`useState`): Manages the visibility of the chatbot button.

## Hooks

- **useEffect**: Fetches the profile picture using `dispatch(getProfilePic())` when the component mounts.
- **useSelector**: 
  - Fetches the chatbot open state (`isOpen`) from the `users` slice.
  - Fetches the profile picture from the `profilePic` slice.
- **useDispatch**: Dispatches actions to:
  - Fetch the profile picture.
  - Toggle the chatbot's open state (`setIsOpen` action from the `users` slice).

## Steps

The chatbot follows a step-by-step interaction:

1. Initial welcome message.
2. User input.
3. Matchmaking service selection:
   - "Find a Life Partner"
   - "Consultation Services"
4. Option to go back or restart.

## Theme Customization

The chatbot UI can be customized using the `theme` object, which includes:

- `background`: Background color of the chatbot.
- `fontFamily`: Font used in the chatbot.
- `fontSize`: General font size.
- `color`: Text color.
- `headerBgColor`: Background color of the header.
- `headerFontColor`: Font color in the header.
- `botBubbleColor`: Background color of the bot's message bubbles.
- `userBubbleColor`: Background color of the user's message bubbles.

## Chatbot Avatar

- The `userAvatar` is conditionally set to the user's profile picture. If no profile picture is available, it defaults to the `Icon` image.

## Styles

- `floatingButtonStyle`: Defines the style for the chatbot toggle button.
- `iconStyle`: Specifies the size and style for the button icons.
- `mobileStyle`: Adjusts the close button style for mobile devices.
- `chatbotContainerStyle`: Container styling for the chatbot to be positioned fixed at the bottom-right of the page.
- `chatbotStyle`: Styling for the chatbot itself, including margin and z-index.

## Functions

### `toggleChatbot()`
This function handles the opening and closing of the chatbot. It performs the following actions:

- Toggles the `isChatBotOpen` state.
- Manages the visibility of the chatbot button based on whether the chatbot is open or closed.
- Increments the `key` state to reset the chatbot session.
- Dispatches the `setIsOpen` action to update the chatbot's open state in Redux.

## Usage Example

To use the `CustomWidget` component, simply import it and include it in your JSX:

```jsx
import CustomWidget from './CustomWidget';

function App() {
  return (
    <div>
      <CustomWidget />
    </div>
  );
}