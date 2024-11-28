import React from "react";
import Link from "next/link";

export default function DrawerDefault({ open, setOpen }) {
  const closeDrawer = () => setOpen(false);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg z-[9999]`}
      >
        {/* Close Button */}
        <div className="p-4 text-right">
          <button
            onClick={closeDrawer}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul className="pl-6">
          <li className="mt-6">
            <Link href="/" onClick={closeDrawer} className="text-tiny text-white hover:underline">
              Twitter
            </Link>
          </li>
          <li className="mt-6">
            <Link href="/" onClick={closeDrawer} className="text-tiny text-white hover:underline">
              Telegram
            </Link>
          </li>
          <li className="mt-6">
            <Link href="/" onClick={closeDrawer} className="text-tiny text-white hover:underline">
              Discord
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
