import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-700">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Privacy Policy for SmartCare App</h1>

      <p className="mb-4">
        Welcome to SmartCare! Your privacy is of utmost importance to us. This
        Privacy Policy outlines how we collect, use, and protect your personal
        information. By using the SmartCare application ("App"), you agree to
        the terms outlined in this policy.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">1. Information We Collect</h2>
      <p className="mb-4">
        When you use SmartCare, we may collect the following types of
        information:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and other details provided during signup.
        </li>
        <li>
          <strong>Medical Information:</strong> Health metrics, progress
          tracking data, and other related details that you choose to input into
          the App.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>To personalize your experience and provide tailored health insights.</li>
        <li>To maintain and improve the functionality of the App.</li>
        <li>To communicate with you about updates, promotions, and notifications.</li>
        <li>To ensure the security of your account and data.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">3. How We Protect Your Information</h2>
      <p className="mb-4">
        We employ industry-standard security measures to protect your data
        against unauthorized access, alteration, disclosure, or destruction.
        These measures include:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Encryption of sensitive data.</li>
        <li>Secure authentication protocols.</li>
        <li>Regular security audits and updates.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">4. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal or medical data with third
        parties, except as required by law or with your explicit consent. In
        limited cases, we may share data with trusted service providers to
        enhance your experience, ensuring they comply with strict confidentiality
        agreements.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">5. Your Rights</h2>
      <p className="mb-4">
        As a SmartCare user, you have the right to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Access and review the personal data we hold about you.</li>
        <li>Request corrections to inaccurate or outdated information.</li>
        <li>Delete your account and associated data, subject to legal
          requirements.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy periodically. Any changes will be
        communicated through the App, and continued use constitutes acceptance
        of the updated terms.
      </p>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">7. Contact Us</h2>
      <p className="mb-6">
        If you have any questions or concerns about this Privacy Policy, please
        contact us:
      </p>
      <address className="not-italic">
        <strong>SmartCare Support Team</strong>
        <br />
        Email: <a href="mailto:support@sunsystems.ng" className="text-blue-500">support@sunsystems.ng</a>
      </address>
    </div>
  );
};

export default PrivacyPolicy;
