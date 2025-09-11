import { app, globalShortcut, BrowserWindow, ipcMain, shell, Menu } from "electron";
import { fileURLToPath } from "node:url";
import path$1 from "node:path";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";
function globalShortcutHandler() {
  let isOpenDevTools = false;
  app.whenReady().then(() => {
    globalShortcut.register("CommandOrControl+S", () => {
      win == null ? void 0 : win.webContents.send("CommandOrControl+S");
    });
    globalShortcut.register("CommandOrControl+N", () => {
      win == null ? void 0 : win.webContents.send("add-cell");
    });
    globalShortcut.register("CommandOrControl+Shift+I", () => {
      if (!isOpenDevTools) {
        win == null ? void 0 : win.webContents.openDevTools();
        isOpenDevTools = true;
      } else {
        win == null ? void 0 : win.webContents.closeDevTools();
        isOpenDevTools = false;
      }
    });
  });
  app.on("will-quit", () => {
    globalShortcut.unregisterAll();
  });
}
const userDataPath = app.getPath("userData");
const myDataDir = path.join(userDataPath, "Data");
const createDir = () => {
  if (!fs.existsSync(myDataDir)) {
    fs.mkdirSync(myDataDir, { recursive: true });
  }
};
async function createFile(data) {
  var _a;
  const result = await getFileList();
  if (result.success) {
    const newFile = (_a = result.files) == null ? void 0 : _a.includes(`${data.fileName}`);
    if (!newFile) {
      const filePath = path.join(myDataDir, `${data.fileName}`);
      try {
        await fs.promises.writeFile(
          filePath,
          JSON.stringify(data.content, null, 2),
          "utf8"
        );
        return { success: true, path: filePath };
      } catch (err) {
        return { success: false, error: err };
      }
    } else {
      return { success: false, error: "فایل  دیگر با این اسم وجود دارد!" };
    }
  }
}
async function getFileList() {
  createDir();
  try {
    const files = await fs.promises.readdir(myDataDir);
    const filesJson = files.filter((f) => f.endsWith(".json"));
    return { success: true, files: filesJson };
  } catch (err) {
    return { success: false, error: err };
  }
}
async function getFileData(fileName) {
  const filePath = path.join(myDataDir, fileName);
  try {
    const result = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(result);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}
async function saveFile(data) {
  const newFilePath = path.join(myDataDir, data.fileName);
  try {
    await fs.promises.writeFile(
      newFilePath,
      JSON.stringify(data.content),
      "utf-8"
    );
    return { success: true, path: newFilePath };
  } catch (err) {
    return { success: false, error: err };
  }
}
async function removeFile(fileName) {
  try {
    await unlink(path.join(myDataDir, fileName));
    return { success: true, message: `فایل ${fileName} با موفقیت حذف شد.` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message };
  }
}
async function exportToPdf(cells) {
  const win2 = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true }
  });
  const html = `
    <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="src/index.css" />
        <style>
        p {
         margin: 0.3em 0;
         text-align: justify;
         }
          ul, ol { margin: 0; padding-left: 1.2em; }
          li { margin: 0; padding: 0; }
      </style>
      </head>
      <body>
        ${cells.map((c) => `${c}`).join("")}
      </body>
    </html>
  `;
  const tempPath = path.join(app.getPath("userData"), "temp.html");
  fs.writeFileSync(tempPath, html);
  await win2.loadFile(tempPath);
  const pdfPath = path.join(app.getPath("downloads"), "output.pdf");
  const pdfData = await win2.webContents.printToPDF({});
  fs.writeFileSync(pdfPath, pdfData);
  win2.close();
  return pdfPath;
}
const __dirname = path$1.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path$1.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path$1.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path$1.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path$1.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path$1.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path$1.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false
    },
    frame: false,
    hasShadow: true,
    width: 1050,
    height: 600,
    resizable: true
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
ipcMain.handle("export-to-pdf", async (_event, cells) => {
  const pdfPath = await exportToPdf(cells);
  return pdfPath;
});
ipcMain.handle(
  "open-directory",
  (_event, pdfPath) => shell.showItemInFolder(pdfPath)
);
ipcMain.handle(
  "open-pdf",
  (_event, pdfPath) => shell.openPath(pdfPath)
);
ipcMain.handle("open-pdf-in-app", (_event, pdfPath) => {
  const pdfWin = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false
  });
  pdfWin.once("ready-to-show", () => {
    pdfWin.maximize();
    pdfWin.show();
  });
  win == null ? void 0 : win.minimize();
  pdfWin.loadURL(`file://${pdfPath}`);
});
ipcMain.handle("remove-file", async (_event, fileName) => {
  const res = await removeFile(fileName);
  return res;
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  win
};
