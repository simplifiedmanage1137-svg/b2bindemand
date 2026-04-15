import { createChatBotMessage } from 'react-chatbot-kit';
import { BotAvatar } from './BotAvatar';
import { UserAvatar } from './UserAvatar';
import Options from './widgets/Options';

const botName = "B2B Assistant";

const createCustomMessage = (message, widget) => {
  return createChatBotMessage(message, {
    widget: widget,
  });
};

const config = {
  initialMessages: [
    createCustomMessage("Hello! I'm your B2B Assistant. How can I help you today?", "options"),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#005F73",
    },
    chatButton: {
      backgroundColor: "#005F73",
    },
  },
  customComponents: {
    botAvatar: BotAvatar,
    userAvatar: UserAvatar,
  },
  state: {
    messages: [],
  },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          {
            text: "Services",
            handler: (props) => {
              props.actionProvider.handleOptions("services");
            },
          },
          {
            text: "Pricing",
            handler: (props) => {
              props.actionProvider.handleOptions("pricing");
            },
          },
          {
            text: "Demo",
            handler: (props) => {
              props.actionProvider.handleOptions("demoRequest");
            },
          },
          {
            text: "Support",
            handler: (props) => {
              props.actionProvider.handleOptions("support");
            },
          },
          {
            text: "Contact",
            handler: (props) => {
              props.actionProvider.handleContact();
            },
          },
        ],
      },
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "services",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          {
            text: "Lead Generation",
            info: "Generate high-quality B2B leads",
            handler: (props) => {
              props.actionProvider.handleOptions("lead-gen");
            },
          },
          {
            text: "Market Research",
            info: "In-depth industry analysis",
            handler: (props) => {
              props.actionProvider.handleOptions("research");
            },
          },
          {
            text: "Content Marketing",
            info: "B2B content strategy",
            handler: (props) => {
              props.actionProvider.handleOptions("content");
            },
          },
          {
            text: "Account-Based Marketing",
            info: "Targeted account strategies",
            handler: (props) => {
              props.actionProvider.handleOptions("abm");
            },
          },
          {
            text: "Sales Enablement",
            info: "Empower your sales team",
            handler: (props) => {
              props.actionProvider.handleOptions("sales");
            },
          },
        ],
      },
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "pricing",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          {
            text: "Get Custom Quote",
            handler: (props) => {
              props.actionProvider.handleContact();
            },
          },
          {
            text: "View Pricing Plans",
            handler: (props) => {
              props.actionProvider.handleOptions("pricing-plans");
            },
          },
        ],
      },
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "demoRequest",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          {
            text: "Schedule Online Demo",
            handler: (props) => {
              props.actionProvider.handleContact();
            },
          },
          {
            text: "Request Product Tour",
            handler: (props) => {
              props.actionProvider.handleContact();
            },
          },
        ],
      },
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "support",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          {
            text: "Technical Issues",
            handler: (props) => {
              props.actionProvider.handleOptions("tech-support");
            },
          },
          {
            text: "Account Help",
            handler: (props) => {
              props.actionProvider.handleOptions("account-help");
            },
          },
          {
            text: "Feature Questions",
            handler: (props) => {
              props.actionProvider.handleOptions("features");
            },
          },
        ],
      },
      mapStateToProps: ["messages"],
    },
    {
      widgetName: "contactForm",
      widgetFunc: (props) => (
        <div className="bg-white rounded-lg p-4 shadow-sm mt-3 w-full">
          <form className="space-y-3" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            props.actionProvider.handleContactSubmit({
              name: formData.get('name'),
              email: formData.get('email'),
              company: formData.get('company'),
              message: formData.get('message')
            });
          }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005F73]"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005F73]"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005F73]"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#005F73]"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-gradient-to-r from-[#005F73] to-[#376B7E] text-white rounded-md hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      ),
    },
  ],
  customMessages: {
    userMessage: (props) => (
      <div className="flex justify-end mb-4 w-full">
        <div className="bg-gradient-to-r from-[#E65A1F] to-[#ff7b3d] text-white rounded-2xl py-2 px-4 max-w-[80%] shadow-md">
          {props.message}
        </div>
      </div>
    ),
    botMessage: (props) => (
      <div className="flex mb-4 w-full">
        <div className="bg-gradient-to-r from-[#005F73] to-[#376B7E] text-white rounded-2xl py-2 px-4 max-w-[80%] shadow-md">
          {props.message}
        </div>
      </div>
    ),
  },
};

export default config;
