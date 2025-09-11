import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  globalShortcut,
  shell,
} from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import globalShortcutHandler from "./globalShortcut";
import {
  createFile,
  getFileData,
  getFileList,
  removeFile,
  saveFile,
} from "./files";
import exportToPdf from "./export-to-pdf";
import { existsSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

export let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: false,
    hasShadow: true,
    width: 1050,
    height: 600,
    resizable: true,
  });

  win.maximize();

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  Menu.setApplicationMenu(null);
  globalShortcutHandler();
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.commandLine.appendSwitch("disable-gpu");
app.whenReady().then(createWindow);

ipcMain.on("window:close", () => {
  win?.close();
});

ipcMain.on("window:maximize", () => {
  win?.isMaximized() ? win.restore() : win?.maximize();
});

ipcMain.on("window:minimize", () => {
  win?.minimize();
  globalShortcut.unregisterAll();
});

ipcMain.handle("create-file", async (_event, data) => {
  return await createFile(data);
});

ipcMain.handle("list-files", async () => {
  return await getFileList();
});
ipcMain.handle("fetch-file-data", async (_event, fileName) => {
  win?.webContents.send("file-loading-start");
  return getFileData(fileName);
});

// * Save

ipcMain.handle("save-file", async (_event, data) => {
  return await saveFile(data);
});

// * export PDF
ipcMain.handle("export-to-pdf", async (_event, cells: string[]) => {
  const pdfPath = await exportToPdf(cells);
  return pdfPath;
});

ipcMain.handle("open-directory", (_event, pdfPath: string) =>
  shell.showItemInFolder(pdfPath)
);
ipcMain.handle("open-pdf", (_event, pdfPath: string) =>
  shell.openPath(pdfPath)
);

// * PDF Window
let pdfWindow: BrowserWindow | null = null;
const safeResolve = (p: string) => path.resolve(p);

ipcMain.handle("open-pdf-in-app", (_event, pdfPath: string) => {
  const safePath = safeResolve(pdfPath);
  if (!existsSync(safePath)) return;

  if (pdfWindow && !pdfWindow.isDestroyed()) {
    pdfWindow.focus();
    pdfWindow.loadURL(`file://${pdfPath}`);
    return;
  }

  pdfWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  });

  pdfWindow.once("ready-to-show", () => {
    pdfWindow?.maximize();
    pdfWindow?.show();
  });

  pdfWindow.on("closed", () => {
    pdfWindow = null;
  });

  win?.minimize();
  pdfWindow.loadURL(`file://${pdfPath}`);
});

ipcMain.handle("remove-file", async (_event, fileName) => {
  const res = await removeFile(fileName);
  return res;
});

app.on("before-quit", () => {
  ipcMain.removeHandler("create-file");
  ipcMain.removeHandler("list-files");
  ipcMain.removeHandler("fetch-file-data");
  ipcMain.removeHandler("save-file");
  ipcMain.removeHandler("export-to-pdf");
  ipcMain.removeHandler("open-directory");
  ipcMain.removeHandler("open-pdf");
  ipcMain.removeHandler("open-pdf-in-app");
  ipcMain.removeHandler("remove-file");
  globalShortcut.unregisterAll();
});
