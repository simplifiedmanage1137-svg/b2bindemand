class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleGreeting() {
    const message = this.createChatBotMessage(
      "Hello! I'm here to help with your B2B needs. How can I assist you today?",
      {
        widget: "options",
      }
    );
    this.addMessageToState(message);
  }

  handleOptions(option) {
    let message;
    switch (option) {
      case 'services':
        message = this.createChatBotMessage(
          "Here are our main B2B services:",
          {
            widget: "services",
          }
        );
        break;
      case 'pricing':
        message = this.createChatBotMessage(
          "Let me help you with pricing information:",
          {
            widget: "pricing",
          }
        );
        break;
      case 'demoRequest':
        message = this.createChatBotMessage(
          "I'd be happy to show you a demo of our platform:",
          {
            widget: "demoRequest",
          }
        );
        break;
      case 'support':
        message = this.createChatBotMessage(
          "How can we help you today?",
          {
            widget: "support",
          }
        );
        break;
      default:
        message = this.createChatBotMessage(
          "I'm here to help! What would you like to know?",
          {
            widget: "options",
          }
        );
    }
    this.addMessageToState(message);
  }

  handleContact() {
    const message = this.createChatBotMessage(
      "I'll connect you with our team. Please provide your contact details:",
      {
        widget: "contactForm",
      }
    );
    this.addMessageToState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "I'm here to help with your B2B needs. Could you be more specific? Here are some options:",
      {
        widget: "options",
      }
    );
    this.addMessageToState(message);
  }

  handleAIResponse(response) {
    const message = this.createChatBotMessage(response);
    this.addMessageToState(message);
  }

  addMessageToState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
