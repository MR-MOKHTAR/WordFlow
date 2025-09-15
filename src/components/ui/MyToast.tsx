import Snackbar from "@mui/joy/Snackbar";
import useToast from "../contexts/toast/useToast";
import {
  MdCheckCircleOutline,
  MdInfoOutline,
  MdOutlineDangerous,
  MdOutlineNotificationsNone,
  MdWarningAmber,
} from "react-icons/md";
import { memo, useCallback } from "react";

const iconMap: Record<string, JSX.Element> = {
  danger: <MdOutlineDangerous size={20} />, // وضعیت خطر / خطا
  error: <MdOutlineDangerous size={20} />, // خطا
  warning: <MdWarningAmber size={20} />, // هشدار
  success: <MdCheckCircleOutline size={20} />, // موفقیت
  info: <MdInfoOutline size={20} />, // اطلاع‌رسانی
  neutral: <MdOutlineNotificationsNone size={20} />, // حالت خنثی / پیش‌فرض
};

function MyToast() {
  const { isShowToast, setIsShowToast, toast } = useToast();
  const showToastHandler = useCallback(
    () => setIsShowToast(false),
    [setIsShowToast]
  );
  return (
    <div>
      <Snackbar
        key={toast.color}
        autoHideDuration={toast.duration}
        open={isShowToast}
        variant={toast.variant}
        color={toast.color}
        size={toast.size}
        anchorOrigin={toast.anchorOrigin}
        onClose={showToastHandler}
        startDecorator={iconMap[toast.color || "neutral"]}
        animationDuration={250}
        onClick={showToastHandler}
        sx={{ mt: "40px", maxWidth: "400px", wordWrap: "break-word" }}
      >
        <p>{toast.description}</p>
      </Snackbar>
    </div>
  );
}

export default memo(MyToast);
