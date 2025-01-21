const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this service, you accept and agree to be bound
          by the terms and conditions of this agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Description of Service
        </h2>
        <p className="mb-4">
          We provide a platform for tracking and analyzing health and fitness
          data through various integrations with third-party services and
          devices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. User Responsibilities
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Provide accurate and up-to-date information</li>
          <li>Use the service in compliance with applicable laws</li>
          <li>
            Not misuse or attempt to gain unauthorized access to the service
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Data Usage</h2>
        <p className="mb-4">
          You retain ownership of your data. By using our service, you grant us
          the right to collect, analyze, and store your data as described in our
          Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Service Modifications
        </h2>
        <p className="mb-4">
          We reserve the right to modify or discontinue the service at any time,
          with or without notice. We shall not be liable to you or any third
          party for any modification, suspension, or discontinuance of the
          service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          The service is provided "as is" without warranties of any kind. We
          shall not be liable for any indirect, incidental, special, or
          consequential damages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to update these terms at any time. Continued use
          of the service after such changes constitutes acceptance of the new
          terms.
        </p>
      </section>
    </div>
  );
};

export { TermsOfService };
