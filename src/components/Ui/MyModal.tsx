import { memo, MouseEvent, ReactNode, useCallback } from "react";
import { MdOutlineClose } from "react-icons/md";
import ButtonWithIcon from "./ButtonWithIcon";

type ModalProps = {
  children: ReactNode;
  contentSize?: "xs" | "sm" | "md" | "lg";
  onClose?: () => void;
  hasXbtn?: boolean;
};

const sizeClasses: Record<NonNullable<ModalProps["contentSize"]>, string> = {
  xs: "max-w-xs", // 320px
  sm: "max-w-sm", // 384px
  md: "max-w-md", // 448px
  lg: "max-w-lg", // 512px
};

const MyModal = memo(function MyModal({
  children,
  contentSize = "sm",
  onClose,
  hasXbtn = true,
}: ModalProps) {
  const clickHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    []
  );
  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose} // بستن وقتی روی overlay کلیک شد
    >
      <div
        className={`modal-content w-full relative ${sizeClasses[contentSize]}`}
        onClick={clickHandler} // جلوگیری از بستن هنگام کلیک روی محتوا
      >
        {children}

        {hasXbtn && onClose && (
          <div className="absolute -top-2.5 -right-2.5">
            <ButtonWithIcon
              className="w-5 h-5 bg-gray-300/50 dark:bg-gray-500/15 hover:bg-gray-300 dark:hover:bg-gray-500/40"
              Icon={MdOutlineClose}
              onClick={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default memo(MyModal);
