import React, { useState } from "react";

export const TopNav: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="text-lg sm:text-xl font-bold text-black cursor-pointer">
          Pythia
          </div>

          <div className="hidden sm:flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              Welcome, <span className="text-gray-900 font-medium">Harshal</span>
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="flex gap-6">
            <Dropdown label="User Role" options={["Marketing Operations", "Analytics Team", "Admin"]} />
            <Dropdown label="Date Range" options={["01-03 - 18-03-202", "19-03 - 25-03-202", "26-03 - 31-03-202"]} />
            <Dropdown label="Comparison" options={["Previous Period", "Same Period Last Year", "Custom Period"]} />
          </div>

          <div className="flex items-center gap-4 ml-6">
            <ActionButton icon="database" label="Data Source" />
            <ActionButton icon="help" label="Help" />

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                      Harshal
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Account Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Preferences
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Switch Account
                    </button>
                    <hr className="my-1" />
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-600 hover:text-gray-900"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 flex flex-col gap-4">
          <Dropdown label="User Role" options={["Marketing Operations", "Analytics Team", "Admin"]} />
          <Dropdown label="Date Range" options={["01-03 - 18-03-202", "19-03 - 25-03-202", "26-03 - 31-03-202"]} />
          <Dropdown label="Comparison" options={["Previous Period", "Same Period Last Year", "Custom Period"]} />

          <ActionButton icon="database" label="Data Source" />
          <ActionButton icon="help" label="Help" />
          
        </div>
      )}
    </header>
  );
};

/* Reusable Dropdown */
const Dropdown = ({ label, options }: { label: string; options: string[] }) => (
  <div className="flex flex-col items-start">
    <span className="text-xs text-gray-500 mb-1">{label}</span>
    <select className="text-sm text-gray-700 bg-white border border-gray-200 rounded-md px-2 py-1 outline-none cursor-pointer">
      {options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

/* Reusable Action Button */
const ActionButton = ({ icon, label }: { icon: "database" | "help"; label: string }) => {
  const icons: Record<string, JSX.Element> = {
    database: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </svg>
    ),
    help: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  };

  return (
    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
      {icons[icon]}
      <span>{label}</span>
    </button>
  );
};
