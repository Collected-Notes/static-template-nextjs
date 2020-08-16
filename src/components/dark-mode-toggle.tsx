import * as React from "react";
import useDarkMode from "use-dark-mode";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "components/dark-mode-toggle.module.css";

export function DarkModeToggle() {
  const { toggle, value } = useDarkMode();

  const label = value ? "Disable dark mode" : "Enable dark mode";

  return (
    <button aria-label={label} onClick={toggle} className={styles.button}>
      <FaSun color="#F6E05E" />
      <FaMoon color="#F6E05E" />
      <span
        style={{ transform: value ? "translateX(0px)" : "translateX(28px)" }}
      />
    </button>
  );
}
