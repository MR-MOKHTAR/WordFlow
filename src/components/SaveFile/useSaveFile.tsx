import { useCallback, useRef } from "react";
import { CellType } from "../Types";
import useFilesContext from "../contexts/FilesContext/useFilesContext";

type Mode = "instant" | "debounce" | "throttle";

interface SaveFileOptions {
  mode?: Mode;
  debounceDelay?: number;
  throttleDelay?: number;
}

export default function useSaveFile({
  mode = "instant",
  debounceDelay = 1000,
  throttleDelay = 5000,
}: SaveFileOptions = {}) {
  const { files, updateFileMeta } = useFilesContext();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastRunRef = useRef<number>(0);

  const saveAction = useCallback(
    async (fileName: string) => {
      const file = files[fileName];
      if (!file) return;

      const content: CellType[] = file.cells || [];

      try {
        const res = await window.ipcRenderer.invoke("save-file", {
          fileName,
          content,
        });

        if (!res?.success) throw new Error(res?.error || "ذخیره ناموفق بود");

        console.log(`[${mode}] فایل ${fileName} ذخیره شد`);
        updateFileMeta(fileName, { isDirty: false }); // ✅ بعد از ذخیره موفق
      } catch (err) {
        console.error("خطا در ذخیره فایل:", err);
      }
    },
    [files, mode, updateFileMeta]
  );

  // این تابع رو برمی‌گردونیم که بشه روی هر فایل صدا زد
  return useCallback(
    (fileName: string) => {
      const now = Date.now();

      if (mode === "instant") {
        saveAction(fileName);
      } else if (mode === "debounce") {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          saveAction(fileName);
        }, debounceDelay);
      } else if (mode === "throttle") {
        if (now - lastRunRef.current >= throttleDelay) {
          lastRunRef.current = now;
          saveAction(fileName);
        }
      }
    },
    [mode, debounceDelay, throttleDelay, saveAction]
  );
}
