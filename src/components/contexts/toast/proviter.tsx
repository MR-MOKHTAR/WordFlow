import { ReactNode, useMemo, useState } from "react";
import { ToastContext } from "../contexts";
import { ToastContextType, ToastData } from "../../Types";

type Props = {
  children: ReactNode;
};

export default function ToastProvider({ children }: Props) {
  const [isShowToast, setIsShowToast] = useState(false);

  // تمام تنظیمات توست در یک state
  const [toast, setToast] = useState<ToastData>({
    title: "",
    description: "",
    color: "neutral",
    variant: "outlined",
    size: "md",
    duration: 3000,
    anchorOrigin: { vertical: "top", horizontal: "left" },
  });

  const contextValue: ToastContextType = useMemo(
    () => ({
      isShowToast,
      setIsShowToast,
      toast,
      setToast,
    }),
    [isShowToast, toast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}
