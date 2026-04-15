import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import { BackgroundBeamsWithCollision } from "./ui/background-beams";
import { seoConfig } from "../utils/seoConfig";

const PrivacyPolicy = () => {
  const { title, description, keywords, ogImage } = seoConfig.privacy;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    {
      title: "B2BinDemand \"WHERE TALENT MEETS DEMAND\"",
      content: (
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">By reference, this privacy policy is incorporated into and is subject to any agreements entered into with B2BInDemand and its affiliates (collectively, "B2BinDemand"). Your use of the website and any information you provide to us via the website or through other official B2BInDemand channels remains subjected to this Privacy Policy, we are committed to safeguard the privacy of all our users.</p>
      )
    },
    {
      title: "2025 DATA PRIVACY",
      content: (
        <p>This policy may be amended or updated from time to time to reflect changes in our practices regarding the processing of personal data, or changes in applicable law. We encourage you to read this policy carefully and to regularly check this page to review any changes we might make to the terms of this policy.</p>
      )
    },
    {
      title: "DISCLOSURE OF INFORMATION",
      content: (
        <>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">B2BInDemand will not rent or sell your personal information to others, but may disclose personal information with clients and service provider partners that work with B2binDemand. Only these third parties have access to personal information which is necessary for them to complete their services.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We may disclose your personal information to any member of our group of companies (this includes our subsidiaries, our ultimate holding company, and all its subsidiaries) in so far as reasonably necessary for the purposes, and on the legal bases, set out in this privacy policy. At all times, these parties are required to agree to process such information in compliance with this privacy policy, and we deploy reasonable efforts to limit their use of such information. B2BinDemand may release any information available if required to do so by law, or in the good faith belief that such action is necessary to comply with law or the powers of government enforcement agencies.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We will share your personal information outside of B2BinDemand if we have a good faith belief that access, use, preservation, or disclosure of the information is reasonably necessary to:</p>
        </>
      ),
      listTitle: "We will share your personal information outside of B2binDemand if we have a good faith belief that:",

      list: [
        "Meet any applicable law, regulation, legal process, or enforceable governmental request.",
        "Enforce applicable terms of services, including investigation of potential violations.",
        "Detect, preventer otherwise address fraud, security, or technical issues.",
        "Protect against harm to the rights, property, or safety of B2binDemand, our users, or the public as required or permitted by law."
      ],

    },
    {
      content: (
        <>
        <p>If we engage a third-party processor to process your personal data, the processor will be subject to binding contractual obligations to:</p>
        <p>&#x2022; Only process the personal data by our prior written instructions.</p>
        <p>&#x2022; Use measures to protect the confidentiality and security of the personal data, together with any additional requirements under applicable law.</p>
        </>
      )
     
    },
    {
      title: "THE COMMITMENTS",
      content: (
        <>
          <p>B2BInDemand is committed to protecting the privacy of the companies and individual (“Users”) that use our services & website and the information they provide to us. You can visit B2BinDemand a website without revealing your identity. We clarify that you are not obliged to provide us with personal information beyond the limited data we need to provide our services. In addition, we do not require you to provide “sensitive personal data”  to use our services.</p>
          <p>Future is committed to protecting the privacy of your personal information whilst striving to provide the very best user experience. Under the UK General Data Protection Regulation 2021 (GDPR), the Data Protection Act 2018, and related laws, we have a legal duty to protect the personal information we collect from you. GDPR says that personal data is any information relating to a living individual who can be identified, either directly or indirectly from that information. </p>
          <p>We may also receive this information when you provide it to us via email at our email address available online and through our website. We may receive business profile information about you, such as your industry, company size, and job title from other sources, and add it to the information we hold about you. B2BinDemand may collect information from other sources to help us correct or supplement our records and improve the quality or personalization of our service to you. We work closely with third parties (for example, business partners, service providers, and sub-contractors) and may receive information about you from them.</p>
          <p>B2BinDemand may use the information we obtain and collect from you for several business purposes including, providing promotional content regarding our services or related content based on a user’s interests identified or shared, verify your profile information, deliver targeted advertising and improve the website for internal business purposes.</p>
          <p>We clarify that B2BinDemand, operates on a global basis and may transfer data to countries that may have data protection laws that differ from those of your country. We will take all necessary precautionary actions to ensure that when the data is transferred to such countries it will be done so in compliance with security protocols appropriate to the sensitivity level of the data or information being transferred.</p>
          <p>We also collect statistical and analytical data about your visits and activity on our sites, such as the pages you view, how long, and which links are followed. This helps to improve the way we deliver content and the products and services offered to you. We also use this anonymized data to report our performance and sell advertising. Some of our websites contain links to products and services offered by third-part websites. If you click on those links, we will use data collected about your activity on our site to direct you to the third-party site. We and the third party may collect data to show’s that you have clicked on the link and whether you purchased any products and services. We may receive a commission from the third party if you link to their site from a future site and purchase goods and services from them.</p>
        </>
      )
    },
    {
      title: "DATA SECURITY",
      content: (
        <>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We are committed to protecting the personal data we hold and keeping your information secure by taking appropriate technical and organizational measures against unauthorized or unlawful processing and accidental loss, destruction, or damage.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">Where we use third-party service providers to store data, we have appropriate agreements in place to ensure that your data is protected. In addition, we limit access to your    personal information to those employees, agents, contractors, and other third parties who have a business need to know. We also require any third parties to whom we may transfer personal data to have appropriate security measures in place. They will only process your personal information on our instructions and are subject to a duty of confidentiality.</p>
        </>
      )
    },
    {
      title: "DATA RETENTION",
      content: (
        <p>B2BinDemand takes precautions to protect data and information under it’s control from misuse, loss, or alteration. B2BinDemand security measures include industry- standard technology and equipment to help protect your information and B2BInDemand maintains security measures to allow only the appropriate personnel and contractors access to your information. Unfortunately, no system can ensure complete security and B2BinDemand disclaims any liability resulting from the use of the Platform or third-party hacking events or intrusions. We will retain your personal information as needed to provide you with our services. This includes the personal information you or others have provided to B2BinDemand and the data generated or inferred from your use of our services. Not with standing any other provision B2BinDemand may retain your personal information where such retention is necessary for compliance with a legal obligation.</p>
      )
    },
    {
      title: "DATA ACCURACY",
      content: (
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We take every reasonable step to ensure that your data is kept accurate and up-to- date and are erased or rectified if we become aware of inaccuracies. We take every reasonable step to ensure that your personal data which we process are accurate and where necessary, kept up to date along with any of your personal data that we process that you inform us is inaccurate (having regard to the purposes for which they are Processed) are erased or rectified.</p>
      )
    },
    {
      title: "CONSENT",
      content: (
        <>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We may process your personal data where we have obtained your prior, express consent to the processing (this legal basis is only used concerning entirely voluntary processing – it is not used for processing that is necessary or obligatory in any way. Compliance with applicable law. We may process your personal data where the processing is required by applicable law. Vital interests, we may process your personal data where the processing is necessary to protect the vital interests of any individual.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">Provision of services to you – providing our services to you, communicating with you concerning those services and providing you with promotional items at your request or in connection with those services or similar services. We have checked that legitimate interests are the most appropriate basis. We understand our responsibility to protect the individual’s interests. We have conducted a legitimate interest assessment (LIA) and kept a record of it, to ensure that we can justify our decision.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We have identified the relevant legitimate interests. We have checked that the processing is necessary and there is no less intrusive way to achieve the same result.</p>
        </>
      )
    },
    {
      title: "LAWFUL BASIS FOR PROCESSING & TRANSFER INFORMATION",
      content: (
        <>
          <p>We may process your personal data where you have given your prior, express consent; the processing is necessary for a contract between you and us. The Processing is required by applicable law, the processing is necessary to protect the vital interest as of any individual or where we have a valid legitimate interest in the processing.</p>
          <p>Consent to processing and transfer of information in some instances, we rely on your specific consent to process your personal information. This is where you have actively agreed and ‘opted-in’, for example, to receive marketing communications from us and you have the right to withdraw your consent at any time.</p>
          <p>We may process your data for the following purposes:</p>,
          <ul>
            <li>providing services to you,</li>
            <li>operating our sites and applications communicating with you</li>
            <li>marketing – sharing marketing content;</li>
            <li>delivering eBooks</li>
            <li>sharing newsletters and improving our services.</li>
          </ul>
        </>
      )
    },
    {
      title: "LEGITIMATE INTEREST",
      content: (
        <>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We have done a balancing test and are confident that the individual’s interests do not over ride those legitimate interests. We only use individual data in ways they would reasonably expect unless we have a very good reason. We are not using people’ s data in ways they would find intrusive or which could cause them harm unless we have a very good reason. If we process children’s data, we take extra care to make sure we protect their interests. We have considered safeguards to reduce the impact where ever possible.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We have considered whether we can offer an opt-out. If our LIA identifies a significant privacy impact, we have considered whether we also need to conduct a DPIA. We keep our LIA under review and repeat it if circumstances change. We include information about our legitimate interests in our privacy information. CCPA, GDPR, & CAN-SPAM CCPA by the California Consumer Privacy Act, if you are a consumer residing in California the following additional terms apply to you.</p>
          <p>&#x2022; Right to Know About Information Collected, Disclosed, or Sold.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">You have the right to request that we disclose what personal information we collect. The categories of California consumers’ personal information we may collect are listed. We collect the following categories of data from our prospects, personal details, demographic information, contact details, consent records, purchase details, employer details, content and advertising data and views and opinions of our prospects. We use this data for the purposes listed above.<b>("Purposes for which we may Process your Personal Data").</b></p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We confirm we do not sell personal information of minors under 18 years of age without authorization. We may disclose the categories of personal information listed in our vendors and service providers for business purposes.</p>
          <p>&#x2022; Right to Request Deletion of Personal Information</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">You have the right to request the deletion of personal information collected or maintained by us. To do so please submit a request via sales@B2BIndemand.com If you are a current or former prospect submitting a request by web form or email, please provide sufficient information to identify your details including your email address on details with us. You may be asked to verify your identity by responding to us with the same email address which you want to delete. If you are not a current or former prospect we may ask for proof of identity sufficient to show you are the same consumer about whom we have collected personal information that you are requesting to be deleted.</p>
          <p>&#x2022; Right to Opt-Out of the Sale of Personal Information</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">You have the right to opt-out of the sale of your personal information by a business.</p>
          <p>&#x2022; Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">You have the right not to receive discriminatory treatment by the business for the exercise of the privacy rights conferred by the California Consumer Privacy Act. »</p>
          <p>&#x2022; Authorized Agent</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">If you would like to request under the California Consumer Privacy Act on behalf of a California consumer who is a current or former prospect, please provide an email from the email address we have on our system for the prospect authorizing the request.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">You may also request under the California Consumer Privacy Act on behalf of a California consumer if you provide</p>
          <p>&#x2022; A signed written permission from the consumer to act on your behalf and the consumer verifies their own identity directly with us, or</p>
          <p>&#x2022; Proof that the consumer has provided you with power of attorney under Probate Code sections 4000 to 4465. We may deny a request from an agent that does not submit proof that they have been authorized by the consumer to act on their behalf.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">GDPA According to Article 20 of the General Data Protection Regulation (GDPR), data subjects of the European Union have the right to receive the personal data concerning him or her which he or she has provided to a controller in a structured, commonly used and machine-readable format and have the right to transmit those data to and the controller without hindrance from the controller to which the personal data have been provided.</p>
          <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">Our Company would like to ensure you are fully aware of your data protection rights. Every user is entitled to the following:</p>
          <table class="border border-solid border-gray-300 w-full text-left">
            <tr class="border-b border-gray-300">
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Access</td>
              <td class="p-3">You have the right to request Our Company for copies of your data.</td>
            </tr>
            <tr class="border-b border-gray-300">
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Rectification</td>
              <td class="p-3">You have the right to request that Our Company correct any information you believe is inaccurate. You also have the right to request Our Company to complete the information you believe is incomplete.</td>
            </tr>
            <tr class="border-b border-gray-300">
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Erasure</td>
              <td class="p-3">You have the right to request that Our Company erase your data, under certain conditions.</td>
            </tr>
            <tr class="border-b border-gray-300">
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Restrict Processing</td>
              <td class="p-3">You have the right to request that Our Company restrict the processing of your data, under certain conditions.</td>
            </tr>
            <tr class="border-b border-gray-300">
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Object to Processing</td>
              <td class="p-3">You have the right to object to Our Company’s processing of your data, under certain conditions.</td>
            </tr>
            <tr>
              <td class="p-3 font-semibold border-r border-gray-300">The Right to Data Portability</td>
              <td class="p-3">You have the right to request that Our Company transfer the data that we have collected to another organization, or directly to you, under certain conditions.</td>
            </tr>
          </table>
        </>
      )
    },
    {
      title: "DATA PROTECTION RIGHTS",
      content: (
        <>
        <p>If you make a request, we have one month to respond to you. Please contact us at our email if you would like to exercise any of these rights. We don’t use misleading or deceptive headers. Who the email is from, whom it’s addressed to, and its routing information is accurate, readers can identify the business or person who sent the message.</p>
        <p>&#x2022; Subject lines are accurate.</p>
        <p>&#x2022; Identify the message as an ad.</p>
        <p> All commercial emails clearly show that they are an advertisement or related.</p>
        <p>&#x2022; Recipients can easily know how to opt out of receiving further emails.</p>
        <p>&#x2022; Honor opt-out requests promptly.  </p>
        <p>We as Marketers honor these requests within business days of having received them.</p>
        </>
      )
    },
    {
      title: "CHARGE A FREE?",
      content: (
        <>
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none"> Require a recipient to give any identification information besides an email address require the recipient to take any other step besides sending a reply via email or visiting a single web page as a condition for honoring an opt-out request.</p>
       <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none"> Once people have responded and said they don’t want to receive any more messages from us we will not sell or transfer their email addresses even in the form of a mailing list. The only exception to this rule is that companies may transfer these email addresses to a company they’ve hired to help them comply with the CAN-SPAM Act CAN-SPAM (Controlling the Assault of Non-Solicited Pornography and Marketing) is an act that was passed in 2003. That act formulates the rules for commercial email and commercial messages. It gives recipients the right to have a business stop emailing them and outlines the penalties incurred for those who violate the law.</p>
       <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none"> We ensure that the emails we share comply with the law to an affiliate offer. Each commercial email tells the reader how to opt out of further emails from the sender. The right to request access to or copies of your relevant personal data together with information regarding the nature, process, sign, and disclosure of those relevant personal data. The right to request rectification of any inaccuracies in your relevant personal data. The right to request on legitimate grounds erasure of your relevant personal data or restriction of processing of your relevant personal data. The right to object on legitimate grounds to the processing of your relevant personal data by us or on our behalf. The right to have certain relevant personal data transferred to another controller in a structured commonly used and machine-readable format to the extent applicable. Where we process your relevant personal data based on your consent the right to withdraw that consent (noting that such withdrawal does not affect the processing of any processing performed before the date on which we receive notice of such withdrawal and does not prevent the processing of your personal data in reliance upon any other available legal bases) and the right to lodge complaints with a Data Protection Authority regarding the processing of your relevant personal data by us or on our behalf.</p>
       <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none"> Your legal rights Subject to applicable law you may have several rights regarding the processing of your relevant personal data.</p>
        </>
      )
    },
    {
      title: "LINKS & THIRD PARTY ADVISERS",
      content: (
        <>
        <p>B2BinDemand allows other companies, also referred to as Third Party Advertisers, Ad Servers or Ad Networks (collectively, the “Advertisers’) to serve advertisements via the Website. These Advertisers may use technology to send directly to your Web browser advertisements and links that appear on the Website.</p>
        <p>This technology may capture certain non-personally identifiable data such as Your IP address, etc. This technology may also measure the effectiveness of them advertisements and personalize the advertising content you may view on the Website. B2BinDemand does not provide any personally identifiable information to these advertisers without your consent except as part of a specific program, feature, or campaign for which you will have the ability to opt out. However, should you click on an advertiser offering or choose to visit an Advertiser’s website.</p>
        </>
      )
    },
    {
      title: "DIRECT MARKETING",
      content: (
        <>
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">We may process your data to contact you with information regarding services that may be of interest to you. You may unsubscribe for free at any time. We may process your data to contact you via email, telephone, direct mail or other communication formats to provide you with information regarding services that may be of interest to you. If we provide</p>
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">services to you we may send information to you regarding our services upcoming promotions and other information that may be of interest to you using the contact details that you have provided to us and are always in compliance with applicable law. You may unsubscribe from our promotional email list at any time by following the unsubscribe instructions included in every promotional email we send. We will not send you promotional emails from a list you have selected to be unsubscribed from but we may continue to contact you to the extent necessary for any services you have requested or from additional lists you have signed up for.</p>
        <p className="text-black-600 dark:text-neutral-200 text-xs sm:text-xl font-bold mb-6">TCPA</p>
        <p className="bg-gray-50/100 p-4 backdrop-blur-sm rounded-lg shadow-sm text-base md:text-base prose prose-lg max-w-none">The Telephone Consumer Protection Act or TCPA compliance controls telemarketing calls, automated calls, pre-recorded calls, text messages, and unsolicited faxes. TCPA compliance is one of the most important policies and our processes are set within this compliance.</p>
        <p>&#x2022; Exclude residential numbers on our in-house do-not-call List.</p>
        <p>&#x2022; Include a mandatory disclosure for agents.</p>
        </>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <BackgroundBeamsWithCollision>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-[8rem] pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#005F73] mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we protect and manage your data.
            </p>
          </motion.div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 lg:p-10">
            <div className="grid gap-2">
              {sections.map((section, index) => (
                <motion.section
                  key={section.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={sectionVariants}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="last:mb-0"
                >
                  <h2 className="text-lg md:text-2xl mb-4 mt-4 font-semibold text-[#005F73] tracking-tight">
                    {section.title}
                  </h2>
                  <div className="text-gray-700 text-base md:text-base space-y-4 prose prose-lg max-w-none">
                    {section.content}
                  </div>

                  {section.list && (
                    <div className="bg-gray-50/80 backdrop-blur-sm rounded-lg p-4 my-6">
                      <h3 className="text-xl font-medium text-[#005F73] mb-4">
                        {section.listTitle}
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {section.list.map((item, i) => (
                          <li key={i} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
