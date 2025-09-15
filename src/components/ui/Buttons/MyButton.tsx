import { memo } from "react";
import Button, { ButtonProps } from "@mui/joy/Button";

interface MyButtonProps extends ButtonProps {
  rounded?: boolean;
  icon?: JSX.Element;
  iconPosition?: "start" | "end";
}

function MyButton({
  children,
  onClick,
  variant = "soft",
  size = "md",
  className = "",
  color = "primary",
  rounded = false,
  icon,
  iconPosition,
  sx,
  ...rest
}: MyButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      className={className}
      color={color}
      startDecorator={iconPosition === "start" ? icon : undefined}
      endDecorator={iconPosition === "end" ? icon : undefined}
      sx={{
        ...(rounded
          ? { borderRadius: "50%", width: 32, height: 32, p: 0 }
          : { borderRadius: "8px" }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default memo(MyButton);
