class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCase = message.toLowerCase().trim();

    // Check for greetings
    if (this.containsAny(lowerCase, ['hi', 'hello', 'hey', 'howdy'])) {
      return this.actionProvider.handleGreeting();
    }

    // Check for service inquiries
    if (this.containsAny(lowerCase, ['service', 'services', 'offer', 'offering', 'provide'])) {
      return this.actionProvider.handleOptions('services');
    }

    // Check for pricing inquiries
    if (this.containsAny(lowerCase, ['price', 'pricing', 'cost', 'package', 'plan'])) {
      return this.actionProvider.handleOptions('pricing');
    }

    // Check for demo requests
    if (this.containsAny(lowerCase, ['demo', 'demonstration', 'show', 'preview'])) {
      return this.actionProvider.handleOptions('demoRequest');
    }

    // Check for support inquiries
    if (this.containsAny(lowerCase, ['help', 'support', 'issue', 'problem', 'trouble'])) {
      return this.actionProvider.handleOptions('support');
    }

    // Check for contact requests
    if (this.containsAny(lowerCase, ['contact', 'email', 'phone', 'reach', 'talk'])) {
      return this.actionProvider.handleContact();
    }

    // Default response for unrecognized input
    return this.actionProvider.handleDefault();
  }

  containsAny(str, words) {
    return words.some(word => str.includes(word));
  }
}

export default MessageParser;
