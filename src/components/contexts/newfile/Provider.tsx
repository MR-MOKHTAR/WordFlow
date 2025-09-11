import { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { NewFileContext } from "../contexts";
import useCreateFile from "../../Hooks/useCreateFile";
import useFileName from "../fileName/useFileName";
import useCreatedNewCell from "../../Hooks/useCreatedNewCell";
import useFilesContext from "../FilesContext/useFilesContext";

function NewFileProvider({ children }: { children: ReactNode }) {
  const createFile = useCreateFile();
  const { setFileName } = useFileName();
  const createdNewCell = useCreatedNewCell();
  const { openFile } = useFilesContext();

  const [openNewFileModal, setOpenNewFileModal] = useState(false);
  const onClose = useCallback(() => setOpenNewFileModal(false), []);

  const onCreate = useCallback(
    async (fileName: string) => {
      const fullName = fileName.endsWith(".json")
        ? fileName
        : `${fileName}.json`;

      const result = await createFile({ fileName: fullName });
      if (!result) return;

      openFile(fullName, []);
      setFileName(fullName);
      createdNewCell();
      setOpenNewFileModal(false);
    },
    [createFile, openFile, setFileName, createdNewCell]
  );

  const contextValue = useMemo(
    () => ({ openNewFileModal, setOpenNewFileModal, onClose, onCreate }),
    [openNewFileModal, setOpenNewFileModal, onClose, onCreate]
  );
  return (
    <NewFileContext.Provider value={contextValue}>
      {children}
    </NewFileContext.Provider>
  );
}

export default memo(NewFileProvider);
