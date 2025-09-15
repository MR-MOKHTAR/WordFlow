import React from "react";
import ReactDOM from "react-dom/client";
import "./../src/components/i18next/i18n.tsx";
import App from "./App.tsx";
import "./../src/components/i18next/i18n.tsx";
import "./index.css";
import MainFileName from "./components/contexts/fileName/MainFileName.tsx";
import FilesProvider from "./components/contexts/FilesContext/FilesContext.tsx";
import CellsProvider from "./components/contexts/cell/CellsContext.tsx";
import FontContext from "./components/contexts/FontModal/Provider.tsx";
import DeletedFileContext from "./components/contexts/DeleteFileModal/DeleteFileContext.tsx";
import RemoveCellProvider from "./components/contexts/cell/Remove.tsx";
import PDFProvider from "./components/contexts/ExportPDFModal/PDFProvider.tsx";
import NewFileProvider from "./components/contexts/newfile/Provider.tsx";
import ToastProvider from "./components/contexts/toast/proviter.tsx";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <FilesProvider>
        <MainFileName>
          <FontContext>
            <DeletedFileContext>
              <CellsProvider>
                <RemoveCellProvider>
                  <PDFProvider>
                    <NewFileProvider>
                      <CssBaseline />
                      <App />
                    </NewFileProvider>
                  </PDFProvider>
                </RemoveCellProvider>
              </CellsProvider>
            </DeletedFileContext>
          </FontContext>
        </MainFileName>
      </FilesProvider>
    </ToastProvider>
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
