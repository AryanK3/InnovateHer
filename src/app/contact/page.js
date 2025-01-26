"use client";

export default function Contact() {
  return (
    <div className="bg-[#E6CFDC] text-gray-900 min-h-screen font-serif">
      <section className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-[#5A2A51] text-center mb-6">
          Contact FratCheck
        </h1>
        <p className="text-lg text-center text-gray-700 mb-4">
          We’d love to hear from you! Whether you have questions or need assistance, feel free to reach out.
        </p>
        
        <div className="space-y-8">
          {/* Email Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-[#5A2A51] mb-4">Email</h2>
            <p className="text-lg text-gray-700">
              For general inquiries, partnership opportunities, or questions about FratCheck, reach us via email at:
            </p>
            <a
              href="mailto:contact@fratcheck.com"
              className="text-lg text-pink-600 hover:text-pink-700 font-semibold transition duration-300"
            >
              contact@fratcheck.com
            </a>
          </div>

          {/* Phone Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-[#5A2A51] mb-4">Phone</h2>
            <p className="text-lg text-gray-700">
              Prefer to speak with someone? Give us a call at the number below:
            </p>
            <a
              href="tel:+1234567890"
              className="text-lg text-pink-600 hover:text-pink-700 font-semibold transition duration-300"
            >
              +1 (234) 567-890
            </a>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold text-[#5A2A51] mb-4">Our Address</h2>
            <p className="text-lg text-gray-700">
              If you prefer to visit us in person, our office is located at:
            </p>
            <p className="text-lg text-gray-700 font-semibold">
              1234 Greek Way, Purdue University, West Lafayette, IN 47906
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
