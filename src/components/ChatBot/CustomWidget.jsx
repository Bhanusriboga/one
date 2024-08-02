import React, { useState } from 'react';
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Icon from "./Assets/Icon.png";
import ChatBotIcon from "./Assets/ChatBotIcon.png";
import ChatBotCloseButton from "./Assets/ChatBotCloseButton.png";
import mobileCloseButton from "./Assets/mobileClosebutton.png";
import './CustomWidget.css';

const CustomWidget = () => {
  const [key, setKey] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const toggleChatbot = () => {
    setIsChatBotOpen(!isChatBotOpen);
    if (!isOpen) {
      setIsButtonVisible(false); 
    } else {
      setIsButtonVisible(true);
      setKey(prevKey => prevKey + 1); 
    }
    setIsOpen(prevState => !prevState);
  };

  const steps = [
    {
      id: "1",
      message: 'Welcome to Matchmaking Services. How can I assist you today?',
      trigger: "2"
    },
    {
      id: "2",
      user: true,
      trigger: "3"
    },
    {
      id: "3",
      message: "What kind of matchmaking service are you interested in?",
      trigger: "4"
    },
    {
      id: "4",
      options: [
        { id: 'findPartner', label: "Find a Life Partner", value: "findPartner", trigger: "6" },
        { id: 'consultation', label: "Consultation Services", value: "consultation", trigger: "5" }
      ]
    },
    {
      id: "5",
      message: "Thank you for choosing our consultation services. We will assist you with your consultation.",
      trigger: "previous"
    },
    {
      id: "6",
      message: "Thank you for choosing our matchmaking services. We will assist you with finding a life partner.",
      trigger: "previous"
    },
    {
      id: "previous",
      message: "Would you like to go back?",
      trigger: "back"
    },
    {
      id: "back",
      options: [
        { id: 'yes', label: "Yes", value: "yes", trigger: "3" },
        { id: 'no', label: "No", value: "no", trigger: "end" }
      ]
    },
    {
      id: "end",
      message: "Thank you for using Matchmaking Services. Would you like to start over?",
      trigger: "restart"
    },
    {
      id: "restart",
      options: [
        { id: 'restart-yes', label: "Yes, restart", value: "yes", trigger: "3" },
        { id: 'restart-no', label: "No, exit", value: "no", trigger: "exit" }
      ]
    },
    {
      id: "exit",
      message: "Thank you for using Matchmaking Services.",
      end: true
    }
  ];

  const theme = {
    background: '#fff',
    fontFamily: 'poppins',
    fontSize: '12px',
    color: '#3d3d3d',
    headerBgColor: '#780024',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#e9e9e9',
    botFontColor: '#3d3d3d',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
    textAlign: "center",
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={chatbotContainerStyle}>
        <button onClick={toggleChatbot} style={floatingButtonStyle} className='d-none d-md-block' data-testid="chat-button-md">
          <img src={isOpen ? ChatBotCloseButton : ChatBotIcon} alt="Chat Button" style={iconStyle}/>
        </button>
        {isButtonVisible && (
          <button onClick={toggleChatbot} style={floatingButtonStyle} className='d-md-none' data-testid="chat-button-sm">
            <img src={ChatBotIcon} alt="Chat Button" style={iconStyle} />
          </button>
        )}
        {isOpen && ( 
          <div style={chatbotStyle}>
            <button onClick={toggleChatbot} style={mobileStyle} className='d-md-none' >
              <img src={mobileCloseButton} alt="Chat Button" style={iconStyle} />
            </button>
            <Chatbot
              key={key}
              steps={steps}
              floating={false}
              botAvatar={Icon}
              headerTitle="Chat with our Service Expert"
              headerTitleClass="header-title-custom" 
              inputStyle={{
                background: "#e5e5e5",
                fontSize: "16px",
                fontFamily: "poppins",
                fontWeight: '300',
                color: "#000",
                paddingLeft: "16px",
              }}
              placeholder={"Type Your Message"}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

const floatingButtonStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  background: 'transparent',
  border: 'none',
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  cursor: 'pointer',
  textAlign: 'right',
  padding: 0,
};

const iconStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

const mobileStyle = {
  position: 'fixed',
  top: '5rem',
  right: '3rem',
  background: 'transparent',
  border: 'none',
  borderRadius: '50%',
  width: '30px',
  height: '60px',
  cursor: 'pointer',
  textAlign: 'right',
  padding: 0,
  zIndex: 1000,
};

const chatbotContainerStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  display: 'flex',
  flexDirection: 'column-reverse',
  alignItems: 'flex-end',
};

const chatbotStyle = {
  marginBottom: '80px',
  zIndex: 1, 
};

export default CustomWidget;
