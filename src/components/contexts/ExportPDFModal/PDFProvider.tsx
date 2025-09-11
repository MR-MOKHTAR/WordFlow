import { memo, ReactNode, useMemo, useState } from "react";
import { ExportPDFContext } from "../contexts";

function PDFProvider({ children }: { children: ReactNode }) {
  const [openExportModal, setOpenExportModal] = useState(false);
  const [pdfPath, setPdfPath] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const contextValue = useMemo(
    () => ({
      openExportModal,
      setOpenExportModal,
      pdfPath,
      setPdfPath,
      isGenerating,
      setIsGenerating,
    }),
    [
      openExportModal,
      setOpenExportModal,
      pdfPath,
      setPdfPath,
      isGenerating,
      setIsGenerating,
    ]
  );

  return (
    <ExportPDFContext.Provider value={contextValue}>
      {children}
    </ExportPDFContext.Provider>
  );
}

export default memo(PDFProvider);
