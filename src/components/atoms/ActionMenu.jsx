import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function ActionMenu({ actions = [] }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="p-2 rounded-full hover:bg-gray-100">
          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600" />
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="fixed right-45 mt-2 w-36 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-50">
          <div className="py-1">
            {actions.map((action, idx) => (
              <MenuItem key={idx}>
                {({ focus }) => (
                  <button
                    onClick={action.onClick}
                    className={`block w-full px-4 py-2 text-sm text-left rounded-md transition-colors
                      ${focus ? "bg-gray-100" : ""}
                      ${action.danger ? "text-red-600" : "text-gray-700"}
                    `}
                  >
                    {action.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
