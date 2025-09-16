import { app, globalShortcut, BrowserWindow, ipcMain, shell, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import fs, { existsSync } from "fs";
import { unlink } from "fs/promises";
import path from "path";
const shortcuts = [
  {
    key: "CommandOrControl+S",
    action: () => win == null ? void 0 : win.webContents.send("shortcut:save")
  },
  {
    key: "CommandOrControl+N",
    action: () => win == null ? void 0 : win.webContents.send("shortcut:new")
  },
  {
    key: "CommandOrControl+Shift+I",
    action: () => (win == null ? void 0 : win.webContents.isDevToolsOpened()) ? win.webContents.closeDevTools() : win == null ? void 0 : win.webContents.openDevTools()
  }
];
function globalShortcutHandler() {
  app.whenReady().then(() => {
    shortcuts.forEach(({ key, action }) => {
      const success = globalShortcut.register(key, action);
      if (!success) {
        console.warn(`Failed to register shortcut: ${key}`);
      }
    });
  });
  app.on("will-quit", () => {
    shortcuts.forEach(({ key }) => globalShortcut.unregister(key));
  });
}
const userDataPath = app.getPath("userData");
const myDataDir = path.join(userDataPath, "data");
const createDir = () => {
  if (!fs.existsSync(myDataDir)) {
    fs.mkdirSync(myDataDir, { recursive: true });
  }
};
async function createFile(data) {
  createDir();
  const filePath = path.join(myDataDir, data.fileName);
  try {
    if (fs.existsSync(filePath)) {
      return { success: false, error: "فایلی با این نام وجود دارد!" };
    }
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data.content, null, 2),
      "utf8"
    );
    return { success: true, path: filePath };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
async function getFileList() {
  createDir();
  try {
    const files = await fs.promises.readdir(myDataDir);
    const filesJson = files.filter((f) => f.endsWith(".json"));
    return { success: true, files: filesJson };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
async function getFileData(fileName) {
  const filePath = path.join(myDataDir, fileName);
  try {
    const result = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(result);
    return { success: true, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
async function saveFile(data) {
  const filePath = path.join(myDataDir, data.fileName);
  try {
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data.content, null, 2),
      "utf-8"
    );
    return { success: true, path: filePath };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
async function removeFile(fileName) {
  const filePath = path.join(myDataDir, fileName);
  try {
    await unlink(filePath);
    return { success: true, message: `فایل ${fileName} با موفقیت حذف شد.` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}
async function exportToPdf(cells, fileName) {
  const baseName = fileName.replace(/\.json$/i, "");
  const win2 = new BrowserWindow({
    show: false,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  const html = `
    <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: sans-serif;
            line-height: 1.8;
            padding: 20px;
          }
          p {
            margin: 0.3em 0;
            text-align: justify;
          }
          ul, ol { margin: 0; padding-left: 1.2em; }
          li { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        ${cells.join("")}
      </body>
    </html>
  `;
  const tempPath = path.join(app.getPath("userData"), "temp.html");
  fs.writeFileSync(tempPath, html, "utf-8");
  try {
    await win2.loadFile(tempPath);
    const pdfPath = path.join(app.getPath("downloads"), `${baseName}.pdf`);
    const pdfData = await win2.webContents.printToPDF({});
    fs.writeFileSync(pdfPath, pdfData);
    return {
      success: true,
      path: pdfPath,
      message: "فایل PDF با موفقیت ساخته شد!"
    };
  } catch (err) {
    return { success: false, message: err, path: null };
  } finally {
    win2.close();
    try {
      fs.unlinkSync(tempPath);
    } catch {
    }
  }
}
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
let splashWin = null;
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false
    },
    frame: false,
    hasShadow: false,
    width: 1050,
    height: 600,
    resizable: true,
    show: false
  });
  win.maximize();
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path$1.join(RENDERER_DIST, "index.html"));
  }
  Menu.setApplicationMenu(null);
  globalShortcutHandler();
}
const createSplashWindow = () => {
  splashWin = new BrowserWindow({
    width: 400,
    height: 250,
    frame: false,
    alwaysOnTop: false,
    center: true,
    resizable: false,
    show: false,
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (VITE_DEV_SERVER_URL) {
    splashWin.loadURL(`${VITE_DEV_SERVER_URL}/splash.html`);
  } else {
    splashWin.loadFile(path$1.join(RENDERER_DIST, "splash.html"));
  }
  splashWin.once("ready-to-show", () => {
    splashWin == null ? void 0 : splashWin.show();
  });
};
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.commandLine.appendSwitch("disable-gpu");
app.whenReady().then(() => {
  createSplashWindow();
  createWindow();
  win == null ? void 0 : win.once("ready-to-show", () => {
    splashWin == null ? void 0 : splashWin.close();
    splashWin = null;
    win == null ? void 0 : win.show();
  });
});
ipcMain.on("window:close", () => {
  win == null ? void 0 : win.close();
});
ipcMain.on("window:maximize", () => {
  (win == null ? void 0 : win.isMaximized()) ? win.restore() : win == null ? void 0 : win.maximize();
});
ipcMain.on("window:minimize", () => {
  win == null ? void 0 : win.minimize();
  globalShortcut.unregisterAll();
});
ipcMain.handle("create-file", async (_event, data) => {
  return await createFile(data);
});
ipcMain.handle("list-files", async () => {
  return await getFileList();
});
ipcMain.handle("fetch-file-data", async (_event, fileName) => {
  win == null ? void 0 : win.webContents.send("file-loading-start");
  return getFileData(fileName);
});
ipcMain.handle("save-file", async (_event, data) => {
  return await saveFile(data);
});
ipcMain.handle(
  "export-to-pdf",
  async (_event, data) => {
    const pdfPath = await exportToPdf(data.content, data.fileName);
    return pdfPath;
  }
);
ipcMain.handle(
  "open-directory",
  (_event, pdfPath) => shell.showItemInFolder(pdfPath)
);
ipcMain.handle(
  "open-pdf",
  (_event, pdfPath) => shell.openPath(pdfPath)
);
let pdfWindow = null;
const safeResolve = (p) => path$1.resolve(p);
ipcMain.handle("open-pdf-in-app", (_event, pdfPath) => {
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
      contextIsolation: true
    },
    show: false
  });
  pdfWindow.once("ready-to-show", () => {
    pdfWindow == null ? void 0 : pdfWindow.maximize();
    pdfWindow == null ? void 0 : pdfWindow.show();
  });
  pdfWindow.on("closed", () => {
    pdfWindow = null;
  });
  win == null ? void 0 : win.minimize();
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
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  win
};
