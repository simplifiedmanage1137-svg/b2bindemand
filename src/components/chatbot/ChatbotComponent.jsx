import React, { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import styles from './Chatbot.module.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [key, setKey] = useState(0); // Add key for forcing re-render
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      const messageParser = new MessageParser(null, null);
      messageParser.parse(transcript);
      resetTranscript();
    }
  }, [transcript, listening, resetTranscript]);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const toggleVoice = async () => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support voice recognition.');
      return;
    }

    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      await SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const clearMessages = () => {
    setMessages([]); // Clear messages state
    localStorage.removeItem('chatMessages'); // Clear localStorage
    setKey(prevKey => prevKey + 1); // Force chatbot re-render
  };

  const saveMessages = (messages) => {
    setMessages(messages);
  };

  return (
    <>
      <button
        onClick={toggleChatbot}
        className={styles.toggleButton}
        aria-label="Toggle chatbot"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotHeaderLeft}>
              <div className={styles.chatbotAvatar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div className={styles.chatbotInfo}>
                <span className={styles.chatbotName}>B2B Assistant</span>
                <span className={styles.chatbotStatus}>Online</span>
              </div>
            </div>
            <div className={styles.chatbotControls}>
              <button
                onClick={toggleVoice}
                className={`${styles.controlButton} ${isListening ? styles.listening : ''}`}
                title={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
              <button
                onClick={clearMessages}
                className={styles.controlButton}
                title="Clear chat history"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
              <button
                onClick={toggleChatbot}
                className={styles.controlButton}
                title="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className={styles.chatbotContent}>
            <Chatbot
              key={key} // Add key prop for forcing re-render
              
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              messageHistory={messages}
              saveMessages={saveMessages}
            />
          </div>

          {isListening && (
            <div className={styles.voiceIndicator}>
              <div className={styles.voiceDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotComponent;
