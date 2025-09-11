type Cell = {
  id: string;
  content: string;
  isOpen: boolean;
};

const emptyCell: Cell = {
  id: crypto.randomUUID(),
  content: "",
  isOpen: true,
};

function useCreateFile() {
  const createFileHandler = async ({ fileName }: { fileName: string }) => {
    const res = await window.ipcRenderer.invoke("create-file", {
      fileName,
      content: emptyCell,
    });

    if (res.success) return { success: true };
  };
  return createFileHandler;
}

export default useCreateFile;
