import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { DeleteFileContext } from "../contexts";
import useFilesContext from "../FilesContext/useFilesContext";

type PropsType = {
  children: ReactNode;
};

const DeletedFileContext: FC<PropsType> = ({ children }) => {
  const [openDeleteFileModal, setOpenDeleteFileModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const { removeFile } = useFilesContext();

  const closeFileModal = useCallback(() => setOpenDeleteFileModal(false), []);

  const removeFileHandler = useCallback(
    async (file: string) => {
      closeFileModal();
      const res = await window.ipcRenderer.invoke("remove-file", file);
      if (res?.success) {
        removeFile(file);
      }
    },
    [removeFile, closeFileModal]
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

export default DeletedFileContext;
