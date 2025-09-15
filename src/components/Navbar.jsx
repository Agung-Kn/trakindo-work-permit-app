import { Fragment, useState } from "react";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const profile = useSelector((state) => state.auth.profile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 h-80 text-white">
      <div className="max-w-7xl mx-auto px-4 border-b border-indigo-500">
        <div className="flex justify-between items-center py-3">

          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl">
            Trakindo
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex space-x-8">
            <a href="/" className="hover:bg-purple-800 px-3 py-2 rounded-md">Dashboard</a>
            <a href="/" className="hover:bg-purple-800 px-3 py-2 rounded-md">Work Permit A</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Work Permit B</a>
            <a href="#" className="hover:bg-purple-800 px-3 py-2 rounded-md">Work Permit Spesific</a>
          </div>

          {/* Right side */}
          <Menu as="div" className="relative ml-4">
            <MenuButton className="flex items-center text-sm focus:outline-none cursor-pointer">
              <span className="ml-2 text-lg font-medium text-white">
                {profile.name}
              </span>
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-50 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg border border-gray-200 focus:outline-none">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      onClick={handleLogout}
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "block w-full text-left px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Logout
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md hover:bg-purple-800">Dashboard</a>
            <a href="/" className="block px-3 py-2 rounded-md hover:bg-purple-800">Work Permit A</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-purple-800">Work Permit B</a>
            <a href="#" className="block px-3 py-2 rounded-md hover:bg-purple-800">Work Permit Spesific</a>
          </div>
        )}
      </div>
    </nav>
  );
}
