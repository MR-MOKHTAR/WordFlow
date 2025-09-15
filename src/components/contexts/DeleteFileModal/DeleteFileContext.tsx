import { FC, memo, ReactNode, useCallback, useMemo, useState } from "react";
import { DeleteFileContext } from "../contexts";
import useFilesContext from "../FilesContext/useFilesContext";
import useFileName from "../fileName/useFileName";
import useToast from "../toast/useToast";

type PropsType = {
  children: ReactNode;
};

const DeletedFileContext: FC<PropsType> = ({ children }) => {
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { removeFile, activeFile, files } = useFilesContext();
  const { setFileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  const closeFileModal = useCallback(() => setOpenDeleteFileModal(false), []);

  const removeFileHandler = useCallback(
    async (file: string) => {
      closeFileModal();

      const cellIDS = files[file]?.cells?.map((cell) => cell.id) || [];

      try {
        const res = await window.ipcRenderer.invoke("remove-file", file);

        if (res?.success) {
          // حذف فایل از state
          removeFile(file);
          if (file === activeFile) {
            setFileName(null);
          }

          // Toast موفقیت
          setToast({
            color: "success",
            size: "sm",
            variant: "solid",
            description: res.message, // پیام برگشتی از main
            duration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "left" },
          });
          setIsShowToast(true);

          // حذف سلول‌های باز از localStorage
          for (const id of cellIDS) {
            localStorage.removeItem(id);
          }
        } else {
          // Toast خطا (error برمی‌گرده)
          setToast({
            color: "danger",
            size: "sm",
            variant: "solid",
            description: res?.error || "خطا در حذف فایل!",
            duration: 3000,
            anchorOrigin: { vertical: "top", horizontal: "left" },
          });
          setIsShowToast(true);
        }
      } catch (err) {
        // خطای غیرمنتظره (مثلاً ipc کار نکرد)
        setToast({
          color: "danger",
          size: "sm",
          variant: "solid",
          description: "ارتباط با سیستم حذف فایل برقرار نشد!",
          duration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "left" },
        });
        setIsShowToast(true);
      }
    },
    [
      removeFile,
      closeFileModal,
      activeFile,
      setFileName,
      files,
      setIsShowToast,
      setToast,
    ]
  );

  const value = useMemo(
    () => ({
      openDeleteFileModal,
      setOpenDeleteFileModal,
      closeFileModal,
      removeFileHandler,
      selectedFile,
      setSelectedFile,
    }),
    [openDeleteFileModal, closeFileModal, removeFileHandler, selectedFile]
  );

  return (
    <DeleteFileContext.Provider value={value}>
      {children}
    </DeleteFileContext.Provider>
  );
};

export default memo(DeletedFileContext);
