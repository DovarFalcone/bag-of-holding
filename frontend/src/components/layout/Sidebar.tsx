
import React from "react";

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <>
    {/* Overlay for mobile */}
    <div
      className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity ${open ? 'block' : 'hidden'} sm:hidden`}
      onClick={onClose}
    />
    <aside
      className={`fixed z-50 top-0 left-0 h-full w-64 bg-gray-800 p-4 text-gray-100 shadow-lg transform transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'} sm:static sm:translate-x-0 sm:block`}
      style={{ minHeight: '100vh' }}
    >
      <div className="font-bold text-lg mb-4">Sidebar</div>
      {/* Add your sidebar nav here */}
    </aside>
  </>
);

export default Sidebar;
