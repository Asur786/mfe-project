import React from "react";
import "./App.css";

const PrivacyPolicyApp = () => {
  // T013: Define section data structure
  const sections = [
    {
      id: "data-collection",
      title: "Data Collection and Usage",
      order: 1,
      content: (
        <>
          <p>
            We collect information that you provide directly to us when you use our services. This includes:
          </p>
          <ul>
            <li><strong>Account Information</strong>: Name, email address, and password when you create an account</li>
            <li><strong>Profile Data</strong>: Optional profile information such as bio, preferences, and settings</li>
            <li><strong>Usage Data</strong>: Information about how you interact with our application, including pages visited, features used, and time spent</li>
            <li><strong>Device Information</strong>: Browser type, operating system, IP address, and device identifiers</li>
            <li><strong>Communication Data</strong>: Messages, feedback, and support requests you send to us</li>
          </ul>
          <p>
            We use this information to provide, maintain, and improve our services, personalize your experience, 
            communicate with you, and ensure the security of our platform.
          </p>
        </>
      )
    },
    {
      id: "cookies",
      title: "Cookie Policy",
      order: 2,
      content: (
        <>
          <p>
            We use cookies and similar tracking technologies to enhance your experience on our platform. 
            Cookies are small text files stored on your device that help us remember your preferences and understand how you use our services.
          </p>
          <h3>Types of Cookies We Use:</h3>
          <ul>
            <li><strong>Essential Cookies</strong>: Required for the website to function properly (e.g., authentication, security)</li>
            <li><strong>Analytics Cookies</strong>: Help us understand how visitors interact with our website by collecting and reporting information anonymously</li>
            <li><strong>Functional Cookies</strong>: Remember your preferences and settings for a personalized experience</li>
            <li><strong>Marketing Cookies</strong>: Used to track visitors across websites to display relevant advertisements</li>
          </ul>
          <p>
            You can control cookie preferences through your browser settings. Please note that disabling certain cookies 
            may affect the functionality of our services.
          </p>
        </>
      )
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      order: 3,
      content: (
        <>
          <p>
            Our application integrates with third-party services to provide enhanced functionality. 
            These services may collect and process data according to their own privacy policies:
          </p>
          <ul>
            <li><strong>Analytics Providers</strong>: We use analytics services to understand user behavior and improve our platform (e.g., Google Analytics)</li>
            <li><strong>Authentication Services</strong>: Third-party authentication providers for secure login (e.g., OAuth providers)</li>
            <li><strong>Content Delivery Networks (CDN)</strong>: To deliver content efficiently and securely</li>
            <li><strong>Payment Processors</strong>: If applicable, secure payment processing through certified third-party providers</li>
            <li><strong>Cloud Service Providers</strong>: For hosting and data storage infrastructure</li>
          </ul>
          <p>
            We carefully select third-party partners and require them to handle data responsibly and in compliance 
            with applicable privacy laws. However, we are not responsible for the privacy practices of third-party services.
          </p>
          <p>
            We recommend reviewing the privacy policies of these third-party services to understand how they handle your information.
          </p>
        </>
      )
    },
    {
      id: "user-rights",
      title: "User Rights",
      order: 4,
      content: (
        <>
          <p>
            You have the following rights regarding your personal data:
          </p>
          <ul>
            <li><strong>Access</strong>: You can request a copy of the personal data we hold about you</li>
            <li><strong>Correction</strong>: You can update or correct your personal information at any time through your account settings</li>
            <li><strong>Deletion</strong>: You can request deletion of your account and associated personal data</li>
            <li><strong>Data Portability</strong>: You can request your data in a structured, machine-readable format</li>
            <li><strong>Opt-Out</strong>: You can opt out of marketing communications and certain data collection practices</li>
            <li><strong>Restriction of Processing</strong>: You can request that we limit how we use your personal data</li>
            <li><strong>Object to Processing</strong>: You can object to certain types of data processing</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided in the Contact Information section below. 
            We will respond to your request within a reasonable timeframe as required by applicable law.
          </p>
          <p>
            Please note that certain data may be retained for legal, security, or operational purposes even after you request deletion.
          </p>
        </>
      )
    },
    {
      id: "contact",
      title: "Contact Information",
      order: 5,
      content: (
        <>
          <p>
            If you have any questions, concerns, or requests regarding this privacy policy or our data practices, 
            please contact us:
          </p>
          <ul>
            <li><strong>Email</strong>: privacy@example.com</li>
            <li><strong>Support Portal</strong>: https://support.example.com</li>
            <li><strong>Mailing Address</strong>: 
              <br/>Privacy Team
              <br/>123 Tech Street
              <br/>San Francisco, CA 94105
              <br/>United States
            </li>
          </ul>
          <p>
            We are committed to protecting your privacy and will respond to your inquiries as quickly as possible, 
            typically within 30 days.
          </p>
          <p>
            <strong>Last Updated</strong>: April 27, 2026
            <br/><strong>Version</strong>: 1.0
          </p>
          <p>
            We may update this privacy policy from time to time. We will notify you of any material changes by 
            posting the new privacy policy on this page and updating the "Last Updated" date.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="privacy-policy">
      {/* T022: Add privacy policy title and last updated date */}
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last Updated: April 27, 2026 | Version 1.0</p>
      
      {/* T025, T026: Create navigation component structure and render table of contents */}
      <nav className="table-of-contents">
        <h2>Table of Contents</h2>
        <ul>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* T020, T024: Add section rendering logic with semantic HTML and section IDs for anchor linking */}
      {sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          <div className="section-content">
            {section.content}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PrivacyPolicyApp;
