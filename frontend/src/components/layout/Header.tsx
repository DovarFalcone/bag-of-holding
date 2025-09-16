
import React from "react";

const Header = ({ onMenuClick }: { onMenuClick?: () => void }) => (
  <header className="bg-gray-800 p-4 flex items-center text-xl font-semibold text-gray-100">
    {/* Hamburger for mobile */}
    <button
      className="sm:hidden mr-4 text-gray-100 focus:outline-none"
      onClick={onMenuClick}
      aria-label="Open sidebar"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
    </button>
    Bag of Holding
  </header>
);

export default Header;
