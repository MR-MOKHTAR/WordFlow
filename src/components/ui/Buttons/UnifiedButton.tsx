import { memo, ReactNode } from "react";
import {
  IconButton,
  IconButtonProps,
  Button,
  ButtonProps,
} from "@mui/material";
import clsx from "clsx";

interface UnifiedButtonCustomProps {
  variantType: "text" | "icon";
  shape?: "md" | "full" | "none";
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
  className?: string;
  color?: ButtonProps["color"] | IconButtonProps["color"];
  variant?: ButtonProps["variant"]
  children?: ReactNode;
  onClick?: () => void;
  size?: number;
  textBtnSize?: ButtonProps["size"]
}

const defaultClasses =
  "header-btn text-stone-700! dark:text-stone-300! hover:bg-gray-200! hover:text-stone-900! dark:hover:bg-gray-600/30! dark:hover:text-stone-100!";

const UnifiedButton = memo(function UnifiedButton(
  props: UnifiedButtonCustomProps
) {
  const {
    onClick,
    variant,
    size = 30,
    textBtnSize= "medium",
    variantType = "text",
    shape = "md",
    icon,
    iconPosition = "start",
    className,
    color,
    children,
    ...rest
  } = props;

  // دکمه متنی
  if (variantType === "text") {
    return (
      <Button
        onClick={onClick}
        variant={variant}
        size={textBtnSize}
        color={color ? (color as ButtonProps["color"]) : undefined}
        className={`font-semibold flex items-center justify-center gap-x-2.5 ${className}`}
        startIcon={iconPosition === "start" ? icon : undefined}
        endIcon={iconPosition === "end" ? icon : undefined}
        sx={{
          minWidth: 0,
        }}
        {...(rest as ButtonProps)}
      >
        {children}
      </Button>
    );
  }

  return (
    <IconButton
      onClick={onClick}
      color={color ? (color as IconButtonProps["color"]) : undefined}
      className={clsx(!color && defaultClasses, className)}
      style={{ width: size, height: size }}
      sx={{
        width: 28,
        height: 28,
        p: 0,
        borderRadius: shape === "full" ? "50%" : shape === "md" ? "6px" : 0,
      }}
      {...(rest as IconButtonProps)}
    >
      {icon}
    </IconButton>
  );
});

export default UnifiedButton;
