import useFilesContext from "../contexts/FilesContext/useFilesContext";

export default function useFetchFileData() {
  const { openFile, setActiveFile } = useFilesContext();

  return async (fileName: string) => {
    const res = await window.ipcRenderer.invoke("fetch-file-data", fileName);
    openFile(fileName, res.data);
    setActiveFile(fileName);
  };
}
