import * as React from "react";
import useDarkMode from "use-dark-mode";
import { FaSun, FaMoon } from "react-icons/fa";

export function DarkModeToggle() {
  const { toggle, value } = useDarkMode();

  const label = value ? "Disable dark mode" : "Enable dark mode";

  return (
    <button
      aria-label={label}
      onClick={toggle}
      className="bg-black p-2 rounded-full flex items-center space-x-3 relative"
    >
      <FaSun color="#F6E05E" />
      <FaMoon color="#F6E05E" />
      <span
        className="absolute w-8 h-8 bg-white rounded-full transition-all duration-200 left-0 top- bottom-0 border border-black"
        style={{
          marginLeft: 0,
          transform: value ? "translateX(0px)" : "translateX(28px)",
        }}
      />
    </button>
  );
}
