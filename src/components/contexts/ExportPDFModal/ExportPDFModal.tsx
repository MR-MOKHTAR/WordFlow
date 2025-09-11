import { GoCheckCircle } from "react-icons/go";
import MyModal from "../../Ui/MyModal";
import useExportPDF from "./useExportPDF";
import { HiOutlineExternalLink, HiOutlineFolder } from "react-icons/hi";
import { HiOutlineDocument } from "react-icons/hi2";
import { memo, useCallback } from "react";

function ExportPDFModal() {
  const { setOpenExportModal, pdfPath, isGenerating } = useExportPDF();

  const handleOpenDirectory = useCallback(() => {
    if (!pdfPath) return;
    window.ipcRenderer.invoke("open-directory", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  const handleOpenFile = useCallback(() => {
    window.ipcRenderer.invoke("open-pdf", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  const handleOpenFileInApp = useCallback(() => {
    window.ipcRenderer.invoke("open-pdf-in-app", pdfPath);
    setOpenExportModal(false);
  }, [pdfPath, setOpenExportModal]);

  return (
    <MyModal contentSize="sm" onClose={() => setOpenExportModal(false)}>
      <div className="flex flex-col gap-4 w-full items-center">
        {!isGenerating && (
          <GoCheckCircle
            className="text-green-500 animate-scale-in"
            size={40}
          />
        )}

        <span className="text-sm text-gray-600 dark:text-gray-300 text-center">
          {isGenerating
            ? "در حال ساخت فایل PDF..."
            : "فایل PDF با موفقیت ساخته شد."}
        </span>

        {isGenerating ? (
          <progress className="progress progress-secondary w-full my-seamless"></progress>
        ) : (
          <div className="card bg-base-300/50 backdrop-blur-2xl shadow-sm rounded-xl">
            <div className="card-body p-4 flex flex-row justify-center gap-3">
              {/* دکمه باز کردن فولدر */}
              <button
                className="btn btn-sm btn-secondary flex items-center gap-2 animate-fade-in"
                disabled={isGenerating}
                onClick={handleOpenDirectory}
              >
                <HiOutlineFolder size={18} />
                <span>پوشه</span>
              </button>

              {/* دکمه نمایش در نرم‌افزار */}
              <button
                className="btn btn-sm btn-accent flex items-center gap-2 animate-fade-in"
                disabled={isGenerating}
                onClick={handleOpenFileInApp}
              >
                <HiOutlineDocument size={18} />
                <span>برنامه</span>
              </button>

              {/* دکمه باز کردن با برنامه پیش‌فرض */}
              <button
                className="btn btn-sm btn-primary flex items-center gap-2 animate-fade-in"
                disabled={isGenerating}
                onClick={handleOpenFile}
              >
                <HiOutlineExternalLink size={18} />
                <span>پیش‌فرض</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </MyModal>
  );
}

export default memo(ExportPDFModal);
