import { FaRegFilePdf } from "react-icons/fa";
import ButtonWithIcon from "../../Ui/ButtonWithIcon";
import Tooltip from "../../Ui/Tooltip";
import { useCellsContext } from "../../contexts/cell/useCellsContext";
import useExportPDF from "../../contexts/ExportPDFModal/useExportPDF";
import { useCallback } from "react";

export default function CreatePDF() {
  const { cells } = useCellsContext();
  const { setOpenExportModal, setPdfPath, setIsGenerating } = useExportPDF();

  const exportHandler = useCallback(async () => {
    let result;
    setOpenExportModal(true);
    setIsGenerating(true);

    const content = await cells.map((item) => item.content);
    try {
      result = await window.ipcRenderer.invoke("export-to-pdf", content);
    } finally {
      setIsGenerating(false);
      setPdfPath(result);
    }
  }, [cells, setOpenExportModal, setPdfPath, setIsGenerating]);

  return (
    <Tooltip content="Export PDF">
      <ButtonWithIcon Icon={FaRegFilePdf} onClick={exportHandler} />
    </Tooltip>
  );
}
