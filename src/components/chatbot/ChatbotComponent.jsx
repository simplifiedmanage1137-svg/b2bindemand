import { useEffect } from 'react';

const BOTPRESS_BOT_ID = 'd3c130b1-c655-4d07-a57f-86c04dd5c016';
const BOTPRESS_CLIENT_ID = 'd3c130b1-c655-4d07-a57f-86c04dd5c016';

const ChatbotComponent = () => {
  useEffect(() => {
    if (document.getElementById('bp-webchat-script')) return;

    // Config script
    const configScript = document.createElement('script');
    configScript.id = 'bp-webchat-config';
    configScript.innerHTML = `
      window.botpressWebChat = {
        botId: '${BOTPRESS_BOT_ID}',
        clientId: '${BOTPRESS_CLIENT_ID}',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v2.3',
        messagingUrl: 'https://messaging.botpress.cloud',
        showPoweredBy: false,
        enableTranscriptDownload: false,
        theme: 'prism',
        themeColor: '#005F73',
        botName: 'B2B Assistant',
        botDescription: 'Ask me anything about B2BinDemand services',
        composerPlaceholder: 'Search anything about B2BinDemand...',
        avatarUrl: '',
        stylesheet: '',
        useSessionStorage: false,
      };
    `;
    document.head.appendChild(configScript);

    // ✅ Add custom CSS to override button size & position
    const style = document.createElement('style');
    style.id = 'bp-custom-styles';
    style.innerHTML = `
      /* Floating button - smaller size */
      .bp-webchat-launcher {
        width: 48px !important;
        height: 48px !important;
        bottom: 80px !important;  /* ← upar shift karne ke liye value increase karein */
        right: 20px !important;
      }
      
      /* Button icon inside */
      .bp-webchat-launcher svg {
        width: 28px !important;
        height: 28px !important;
      }
      
      /* Hover effect */
      .bp-webchat-launcher:hover {
        transform: scale(1.05) !important;
      }
    `;
    document.head.appendChild(style);

    // Inject script
    const script = document.createElement('script');
    script.id = 'bp-webchat-script';
    script.src = 'https://cdn.botpress.cloud/webchat/v2.3/inject.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const s1 = document.getElementById('bp-webchat-script');
      const s2 = document.getElementById('bp-webchat-config');
      const s3 = document.getElementById('bp-custom-styles');
      if (s1) s1.remove();
      if (s2) s2.remove();
      if (s3) s3.remove();
    };
  }, []);

  return null;
};

export default ChatbotComponent;