import { memo } from "react";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "cancel" | "outline" | "danger" | "success";

interface MyButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses: Record<Variant, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  cancel: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  outline:
    "border border-gray-400 text-gray-700 bg-transparent hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
};

const MyButton = memo(function MyButton({
  children,
  variant = "default",
  size = "md",
  onClick,
  className = "",
}: MyButtonProps) {
  // کلاس‌ها کاملاً ثابت هستند و فقط ترکیب می‌شوند → بدون نیاز به useMemo
  const classes = `inline-flex items-center justify-center gap-x-2 rounded-xl font-medium transition-colors cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
});

export default MyButton;
