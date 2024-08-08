# CustomWidget Component Documentation

## Description

The CustomWidget component is a customizable chatbot widget built using
react-simple-chatbot. It offers a floating button to open and close the
chatbot interface and provides a conversational flow for matchmaking
services.

## Installation

### Prerequisites

Ensure you have the following installed:

-   React

-   styled-components

-   react-simple-chatbot

### Installing Dependencies

bash

Copy code

npm install styled-components react-simple-chatbot

## Component Structure

### Imports

-   useState from react: For managing the state of the component.

-   Chatbot from react-simple-chatbot: For embedding the chatbot.

-   ThemeProvider from styled-components: For applying custom themes.

-   Icon, ChatBotIcon, ChatBotCloseButton: Images used in the component.

### State Management

-   key: Used to reset the chatbot when it\'s toggled.

-   isOpen: Boolean state to track whether the chatbot is open or
    closed.

### Functions

#### toggleChatbot

-   Toggles the chatbot\'s open/close state.

-   Increments key if the chatbot is being closed, to reset its state
    when reopened.

### Steps

Defines the steps for the chatbot conversation flow:

1.  Welcome message.

2.  User input.

3.  Inquiry about the type of matchmaking service.

4.  Options for \"Find a Life Partner\" or \"Consultation Services\".

5.  Messages based on the user\'s choice.

6.  Option to go back or end the conversation.

7.  End message and option to restart or exit.

### Theme

Defines the styling for the chatbot using the ThemeProvider from
styled-components.

### Render

-   The chatbot is rendered inside a styled div.

-   A button is used to toggle the visibility of the chatbot.

-   The chatbot component is customized with the defined steps and
    theme.

## Styles

Custom styles are defined for various elements:

-   floatingButtonStyle: Styles for the chatbot toggle button.

-   iconStyle: Styles for the icons used in the button.

-   chatbotContainerStyle: Styles for the chatbot container.

-   chatbotStyle: Styles for the chatbot itself.

**Description**

The CustomWidget is a React component that integrates a simple chatbot
using react-simple-chatbot and styled-components. It provides
matchmaking services interaction with options for finding a life partner
and consultation services.

**Features**

-   Displays initial welcome message and prompts user input.

-   Offers options to choose between \"Find a Life Partner\" and
    \"Consultation Services\".

-   Handles user interactions such as going back, restarting, and ending
    the session.

-   Customizable theme using styled-components.
**OverView**

The CustomWidget is a React component that integrates a simple chatbot using react-simple-chatbot and styled-components. It provides matchmaking services interaction with options for finding a life partner and consultation services.

**Features**

- Displays initial welcome message and prompts user input.
- Offers options to choose between "Find a Life Partner" and "Consultation Services".
- Handles user interactions such as going back, restarting, and ending the session.
- Customizable theme using styled-components.

