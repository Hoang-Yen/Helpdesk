import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <Logo className="h-6 w-6 text-gray-400" />
             <span className="text-gray-500 font-semibold">SpouX</span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-spoux-700">Privacy Policy</a>
            <a href="#" className="hover:text-spoux-700">Terms of Service</a>
            <a href="#" className="hover:text-spoux-700">Contact Support</a>
            <Link to="/admin" className="hover:text-spoux-700">Admin</Link>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SpouX Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};