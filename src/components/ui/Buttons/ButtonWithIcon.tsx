import { IconType } from "react-icons";
import { memo } from "react";
import { IconButton, IconButtonProps } from "@mui/material";
import clsx from "clsx";

interface ButtonWithIconProps extends Omit<IconButtonProps, "children"> {
  Icon: IconType;
  btnSize?: number; // ← تغییر نام
  iconSize?: number; // سایز آیکون
  rounded?: "full" | "md" | "none"; // کنترل گردی
}

const defaultClasses =
  "header-btn text-stone-700! dark:text-stone-300! hover:bg-gray-200! hover:text-stone-900! dark:hover:bg-gray-600/30! dark:hover:text-stone-100!";

const ButtonWithIcon = memo(function ButtonWithIcon({
  onClick,
  Icon,
  btnSize = 28,
  iconSize,
  rounded = "md",
  color,
  className,
  ...rest
}: ButtonWithIconProps) {
  return (
    <IconButton
      onClick={onClick}
      color={color}
      className={clsx(!color && defaultClasses, className)}
      sx={{
        width: btnSize,
        height: btnSize,
        p: 0,
        borderRadius:
          rounded === "full" ? "50%" : rounded === "md" ? "6px" : "0px",
      }}
      aria-label={crypto.randomUUID()}
      {...rest} // اجازه بده تمام propsهای IconButton هم کار کنن
    >
      <Icon size={iconSize ?? Math.round(btnSize * 0.6)} />
    </IconButton>
  );
});

export default ButtonWithIcon;

/*
import { IconType } from "react-icons";
import { CSSProperties, memo, useMemo } from "react";

type ButtonWithIconProps = {
  onClick?: () => void;
  className?: string;
  Icon: IconType;
  size?: number; // اندازه دکمه (عرض و ارتفاع)
  iconSize?: number; // سایز آیکون
  rounded?: "full" | "md" | "none"; // کنترل گردی
};

const ButtonWithIcon = memo(function ButtonWithIcon({
  onClick,
  Icon,
  className,
  size = 32,
  iconSize,
  rounded = "full",
}: ButtonWithIconProps) {
  const radiusClass =
    rounded === "full"
      ? "rounded-full"
      : rounded === "md"
      ? "rounded-md"
      : "rounded-none";

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      width: size,
      height: size,
    }),
    [size]
  );

  return (
    <button
      onClick={onClick}
      style={buttonStyle}
      className={`relative overflow-hidden header-btn group inline-flex items-center justify-center ${radiusClass} cursor-pointer transition-all duration-150 bg-transparent text-stone-700 dark:text-stone-300
        hover:bg-gray-200 hover:text-stone-900 
        dark:hover:bg-gray-600/30 dark:hover:text-stone-100 
        active:scale-95 active:bg-gray-300 dark:active:bg-gray-600/50 
        ripple-effect
        ${className}`}
    >
      <Icon size={iconSize ?? Math.round(size * 0.5)} />
    </button>
  );
});

export default ButtonWithIcon;

*/
