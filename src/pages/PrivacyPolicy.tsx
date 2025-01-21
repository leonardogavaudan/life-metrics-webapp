const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect information that you provide directly to us, including but
          not limited to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Account information (name, email, password)</li>
          <li>Health and fitness data from connected devices and services</li>
          <li>Usage data and analytics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">We use the collected information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and maintain our services</li>
          <li>Analyze and improve our services</li>
          <li>Communicate with you about updates and changes</li>
          <li>Protect against fraud and unauthorized access</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your personal
          information. However, no method of transmission over the Internet is
          100% secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
        <p className="mb-4">
          Our service integrates with various third-party health and fitness
          services. Please review their respective privacy policies for
          information about how they handle your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Updates to This Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. We will notify
          you of any changes by posting the new policy on this page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this privacy policy, please contact
          us.
        </p>
      </section>
    </div>
  );
};

export { PrivacyPolicy };
