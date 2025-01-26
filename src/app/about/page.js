"use client";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <section className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-6">About FratList</h1>
        <p className="text-lg text-center mb-4">
          FratList is your go-to platform for discovering and connecting with fraternities at universities across the country.
        </p>
        <div className="text-xl mb-8">
          <p className="mb-4">
            As part of our mission to make social spaces on campuses more inclusive, FratList focuses on helping women navigate the
            traditionally male-dominated Greek life. Whether you're interested in networking, understanding fraternity culture, or
            simply connecting with a community, FratList is designed to offer support, information, and safe spaces.
          </p>
          <p className="mb-4">
            FratList provides valuable insights into each fraternity, including their missions, philanthropic activities, and culture.
            We ensure that women can explore these organizations, ask questions, and interact with current members to make informed decisions.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-4">How FratList Helps Women</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <span className="font-semibold">Safe Exploration:</span> Women can browse fraternity profiles and gather all the
              information they need without feeling pressured or excluded.
            </li>
            <li>
              <span className="font-semibold">Direct Access:</span> Get in touch with fraternity members directly for questions or
              concerns, empowering women to make informed decisions about involvement.
            </li>
            <li>
              <span className="font-semibold">Inclusive Environment:</span> FratList aims to foster inclusivity by supporting women
              who want to connect with fraternities or learn more about their social impact and values.
            </li>
            <li>
              <span className="font-semibold">Opportunities for Networking:</span> Fraternities can offer mentorship, job opportunities,
              and other networking benefits to women looking to expand their social and professional circles.
            </li>
            <li>
              <span className="font-semibold">Philanthropy & Charity Events:</span> Women can engage in charity work and philanthropy
              initiatives organized by fraternities, promoting a sense of community and social good.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
