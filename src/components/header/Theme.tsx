import { IoMoonOutline, IoSunnySharp } from "react-icons/io5";
import { useCallback, useState } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

export default function Theme() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = useCallback(() => {
    const root = document.querySelector("html") as HTMLElement;
    root.classList.toggle("dark");
    setIsDark((prev) => !prev);
  }, []);

  return (
    <UnifiedButton
      onClick={toggleTheme}
      variantType="icon"
      size={30}
      shape="md"
      icon={isDark ? <IoMoonOutline size={18} /> : <IoSunnySharp size={18} />}
    />
  );
}
