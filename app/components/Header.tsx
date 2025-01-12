import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  authenticated: boolean;
}

const Header: React.FC<HeaderProps> = ({ authenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8 mr-2" />
          <div className="text-lg font-bold">BookFinder</div>
        </div>
        <ul className="flex space-x-4 items-center">
          <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
          <li><a href="/upload-book" className="hover:underline">Upload Book</a></li>
          <li><a href="/my-books" className="hover:underline">My Books</a></li>
          {authenticated ? (
            <>
              <li><a href="/edit" className="hover:underline">Edit</a></li>
              <li><a href="/logout" className="hover:underline">Log Out</a></li>
            </>
          ) : (
            <>
              <li className="relative">
                <button onClick={toggleMenu} className="focus:outline-none">
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                </button>
                {menuOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                    <li><a href="/login" className="block px-4 py-2 hover:bg-gray-200">Log In</a></li>
                    <li><a href="/register" className="block px-4 py-2 hover:bg-gray-200">Register</a></li>
                  </ul>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;