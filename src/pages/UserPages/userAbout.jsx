import React from 'react';
import UserLayout from './UserLayout';

function About() {
  return (
    <UserLayout>
      <div className="min-h-screen bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg mb-6">
            Our Reservation System is a modern web application that enables users to quickly and easily book available time slots. 
            With its intuitive, user-friendly interface, the system bridges the communication gap between administrators and users, 
            ensuring a smooth and efficient booking experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Separate login systems for users and administrators</li>
            <li>Secure JWT-based authentication</li>
            <li>Algorithm to prevent booking time conflicts</li>
            <li>Automatic email notifications sent 30 minutes before appointments</li>
            <li>Easy-to-use admin panel for efficient management</li>
            <li>Flexible time slot definitions</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Technologies</h2>
          <p className="text-gray-700">
            The application is developed using modern technologies such as <span className="font-medium">Spring Boot, React.js, and PostgreSQL</span>. 
            For UI design, we have chosen <span className="font-medium">Tailwind CSS</span> to ensure both performance and aesthetic appeal.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to fully digitalize the appointment process, eliminating manual operations and enabling users to manage their time 
            in the most efficient way possible.
          </p>
        </div>
      </div>
    </UserLayout>
  );
}

export default About;
