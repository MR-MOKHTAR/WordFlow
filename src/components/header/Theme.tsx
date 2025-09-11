import { IoMoonOutline, IoSunnySharp } from "react-icons/io5";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import { useCallback, useState } from "react";

export default function Theme() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = useCallback(() => {
    const root = document.querySelector("html") as HTMLElement;
    root.classList.toggle("dark");
    setIsDark((prev) => !prev);
  }, []);

  return (
    <ButtonWithIcon
      onClick={toggleTheme}
      Icon={isDark ? IoMoonOutline : IoSunnySharp}
      className="mt-auto"
    />
  );
}
