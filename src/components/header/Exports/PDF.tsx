import { FaRegFilePdf } from "react-icons/fa";
import Tooltip from "../../ui/Tooltip";
import { useCellsContext } from "../../contexts/cell/useCellsContext";
import useExportPDF from "../../contexts/ExportPDFModal/useExportPDF";
import { useCallback } from "react";
import useFileName from "../../contexts/fileName/useFileName";
import UnifiedButton from "@/components/ui/Buttons/UnifiedButton";
import useToast from "@/components/contexts/toast/useToast";

export default function CreatePDF() {
  const { cells } = useCellsContext();
  const {
    setOpenExportModal,
    setPdfPath,
    setIsGenerating,
    setIsError,
    setIsDone,
  } = useExportPDF();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();

  const exportHandler = useCallback(async () => {
    if (cells.length === 0) {
      setToast({
        anchorOrigin: { vertical: "top", horizontal: "left" },
        color: "warning",
        size: "sm",
        variant: "solid",
        duration: 4000,
        description: "برای ساخت PDF یک فایل را باز نمایید!",
      });
      setIsShowToast(true);
      return
    }

    const content = cells.map((item) => item.content);

    // reset state before new export
    setIsError(false);
    setIsDone(false);
    setPdfPath("");

    setOpenExportModal(true);
    setIsGenerating(true);

    try {
      const res = await window.ipcRenderer.invoke("export-to-pdf", {
        content,
        fileName,
      });

      if (res?.success) {
        setPdfPath(res.path);
        setIsDone(true);
      } else {
        setIsError(true);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsGenerating(false);
    }
  }, [
    cells,
    setOpenExportModal,
    setPdfPath,
    setIsGenerating,
    fileName,
    setIsError,
    setIsDone,
    setIsShowToast,
    setToast,
  ]);

  return (
    <Tooltip content="Export PDF">
      <UnifiedButton
        onClick={exportHandler}
        variantType="icon"
        size={30}
        shape="md"
        icon={<FaRegFilePdf size={18} />}
      />
    </Tooltip>
  );
}
