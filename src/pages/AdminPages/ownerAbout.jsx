import React from 'react';
import AdminLayout from './AdminLayout';

function About() {
  return (
    <AdminLayout>
      <div className="min-h-full bg-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg mb-6">
            Our Reservation System is a modern web application designed to allow users to quickly and easily make bookings in available time slots. 
            With its intuitive and user-friendly interface, the platform ensures smooth communication between administrators and end-users, 
            reducing the risk of errors and providing a seamless booking experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Separate login systems for users and administrators</li>
            <li>Secure JWT-based authentication</li>
            <li>Advanced algorithm to prevent booking time conflicts</li>
            <li>Automated email notifications sent 30 minutes before appointments</li>
            <li>Comprehensive admin panel for easy management</li>
            <li>Flexible time slot configurations for various use cases</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Technologies</h2>
          <p className="text-gray-700">
            The application is built using modern technologies such as <span className="font-medium">Spring Boot, React.js, and PostgreSQL</span>. 
            For the front-end design and styling, we utilized <span className="font-medium">Tailwind CSS</span>, 
            ensuring both performance and a visually appealing user experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Our Mission</h2>
          <p className="text-gray-700">
            Our mission is to fully digitalize appointment processes, eliminating the need for manual operations, 
            and enabling users to manage their time efficiently. 
            By integrating secure authentication, conflict prevention algorithms, and automated notifications, 
            we aim to provide a professional and reliable booking system that can be adapted to a wide range of industries.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-3">Project Scope</h2>
          <p className="text-gray-700">
            This project is designed to be highly scalable and customizable. It can serve a variety of sectors including salons, clinics, 
            coworking spaces, and service-based businesses. The system’s modular architecture allows for easy integration of new features, 
            such as payment gateways, mobile app support, and analytics dashboards, making it a future-proof solution for businesses of all sizes.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default About;
