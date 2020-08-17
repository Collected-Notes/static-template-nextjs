import * as React from "react";
import useDarkMode from "use-dark-mode";
import { FaSun, FaMoon } from "react-icons/fa";
import styles from "components/dark-mode-toggle.module.css";

function withMounted<Props>(Component: (props: Props) => JSX.Element) {
  return (props: Props) => {
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);
    if (!isMounted) return null;
    return <Component {...props} />;
  };
}

export const DarkModeToggle = withMounted(function DarkModeToggle() {
  const { value, toggle } = useDarkMode(
    window.matchMedia("(preferred-color-scheme: dark)").matches,
    {
      classNameDark: "scheme-dark",
      classNameLight: "scheme-light",
    }
  );

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
});
