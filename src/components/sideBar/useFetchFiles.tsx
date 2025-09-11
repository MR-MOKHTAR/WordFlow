import { useCallback } from "react";
import useFilesContext from "../contexts/FilesContext/useFilesContext";

export default function useFetchFiles() {
  const { openFile } = useFilesContext();

  const fetchFiles = useCallback(async () => {
    const res = await window.ipcRenderer.invoke("list-files");
    if (res.success) {
      res.files.forEach((file: string) => {
        // سلول‌ها هنوز خالی هستند، وقتی کاربر باز کند fetch می‌شوند
        openFile(file, []);
      });
      console.log(res.files);
    }
  }, [openFile]);

  return fetchFiles;
}
