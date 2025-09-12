import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 h-80 text-white">
      <div className="max-w-7xl border-b border-indigo-500 mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl">
            MyApp
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Dashboard</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Team</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Projects</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Calendar</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Reports</a>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Profile */}
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.pravatar.cc/300"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
