import { app as c, globalShortcut as p, BrowserWindow as g, ipcMain as r, shell as P, Menu as j } from "electron";
import { fileURLToPath as D } from "node:url";
import i from "node:path";
import l, { existsSync as E } from "fs";
import { unlink as x } from "fs/promises";
import m from "path";
const v = [
  {
    key: "CommandOrControl+S",
    action: () => e == null ? void 0 : e.webContents.send("shortcut:save")
  },
  {
    key: "CommandOrControl+N",
    action: () => e == null ? void 0 : e.webContents.send("shortcut:new")
  },
  {
    key: "CommandOrControl+Shift+I",
    action: () => e != null && e.webContents.isDevToolsOpened() ? e.webContents.closeDevTools() : e == null ? void 0 : e.webContents.openDevTools()
  }
];
function T() {
  c.whenReady().then(() => {
    v.forEach(({ key: s, action: t }) => {
      p.register(s, t) || console.warn(`Failed to register shortcut: ${s}`);
    });
  }), c.on("will-quit", () => {
    v.forEach(({ key: s }) => p.unregister(s));
  });
}
const F = c.getPath("userData"), d = m.join(F, "data"), S = () => {
  l.existsSync(d) || l.mkdirSync(d, { recursive: !0 });
};
async function C(s) {
  S();
  const t = m.join(d, s.fileName);
  try {
    return l.existsSync(t) ? { success: !1, error: "فایلی با این نام وجود دارد!" } : (await l.promises.writeFile(
      t,
      JSON.stringify(s.content, null, 2),
      "utf8"
    ), { success: !0, path: t });
  } catch (n) {
    return { success: !1, error: n instanceof Error ? n.message : String(n) };
  }
}
async function I() {
  S();
  try {
    return { success: !0, files: (await l.promises.readdir(d)).filter((n) => n.endsWith(".json")) };
  } catch (s) {
    return { success: !1, error: s instanceof Error ? s.message : String(s) };
  }
}
async function O(s) {
  const t = m.join(d, s);
  try {
    const n = await l.promises.readFile(t, "utf-8");
    return { success: !0, data: JSON.parse(n) };
  } catch (n) {
    return { success: !1, error: n instanceof Error ? n.message : String(n) };
  }
}
async function L(s) {
  const t = m.join(d, s.fileName);
  try {
    return await l.promises.writeFile(
      t,
      JSON.stringify(s.content, null, 2),
      "utf-8"
    ), { success: !0, path: t };
  } catch (n) {
    return { success: !1, error: n instanceof Error ? n.message : String(n) };
  }
}
async function z(s) {
  const t = m.join(d, s);
  try {
    return await x(t), { success: !0, message: `فایل ${s} با موفقیت حذف شد.` };
  } catch (n) {
    return { success: !1, error: n instanceof Error ? n.message : String(n) };
  }
}
async function H(s, t) {
  const n = t.replace(/\.json$/i, ""), f = new g({
    show: !1,
    webPreferences: { contextIsolation: !0, sandbox: !0 }
  }), _ = `
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
        ${s.join("")}
      </body>
    </html>
  `, y = m.join(c.getPath("userData"), "temp.html");
  l.writeFileSync(y, _, "utf-8");
  try {
    await f.loadFile(y);
    const h = m.join(c.getPath("downloads"), `${n}.pdf`), R = await f.webContents.printToPDF({});
    return l.writeFileSync(h, R), {
      success: !0,
      path: h,
      message: "فایل PDF با موفقیت ساخته شد!"
    };
  } catch (h) {
    return { success: !1, message: h, path: null };
  } finally {
    f.close();
    try {
      l.unlinkSync(y);
    } catch {
    }
  }
}
const b = i.dirname(D(import.meta.url));
process.env.APP_ROOT = i.join(b, "..");
const u = process.env.VITE_DEV_SERVER_URL, B = i.join(process.env.APP_ROOT, "dist-electron"), w = i.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = u ? i.join(process.env.APP_ROOT, "public") : w;
let e, a = null;
function U() {
  e = new g({
    icon: i.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: i.join(b, "preload.mjs"),
      contextIsolation: !0,
      nodeIntegration: !1
    },
    frame: !1,
    hasShadow: !0,
    width: 1050,
    height: 600,
    resizable: !0,
    show: !1
  }), e.maximize(), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), u ? e.loadURL(u) : e.loadFile(i.join(w, "index.html")), j.setApplicationMenu(null), T();
}
const N = () => {
  a = new g({
    width: 400,
    height: 250,
    frame: !1,
    alwaysOnTop: !0,
    center: !0,
    resizable: !1,
    show: !1
  }), u ? a.loadURL(`${u}/splash.html`) : a.loadFile(i.join(w, "splash.html")), a.once("ready-to-show", () => {
    a == null || a.show();
  });
};
c.on("window-all-closed", () => {
  process.platform !== "darwin" && (c.quit(), e = null);
});
c.commandLine.appendSwitch("disable-gpu");
c.whenReady().then(() => {
  N(), setTimeout(() => {
    a == null || a.close(), a = null, U(), e == null || e.once("ready-to-show", () => {
      e == null || e.show();
    });
  }, 3e3);
});
r.on("window:close", () => {
  e == null || e.close();
});
r.on("window:maximize", () => {
  e != null && e.isMaximized() ? e.restore() : e == null || e.maximize();
});
r.on("window:minimize", () => {
  e == null || e.minimize(), p.unregisterAll();
});
r.handle("create-file", async (s, t) => await C(t));
r.handle("list-files", async () => await I());
r.handle("fetch-file-data", async (s, t) => (e == null || e.webContents.send("file-loading-start"), O(t)));
r.handle("save-file", async (s, t) => await L(t));
r.handle(
  "export-to-pdf",
  async (s, t) => await H(t.content, t.fileName)
);
r.handle(
  "open-directory",
  (s, t) => P.showItemInFolder(t)
);
r.handle(
  "open-pdf",
  (s, t) => P.openPath(t)
);
let o = null;
const $ = (s) => i.resolve(s);
r.handle("open-pdf-in-app", (s, t) => {
  const n = $(t);
  if (E(n)) {
    if (o && !o.isDestroyed()) {
      o.focus(), o.loadURL(`file://${t}`);
      return;
    }
    o = new g({
      width: 900,
      height: 700,
      webPreferences: {
        nodeIntegration: !1,
        contextIsolation: !0
      },
      show: !1
    }), o.once("ready-to-show", () => {
      o == null || o.maximize(), o == null || o.show();
    }), o.on("closed", () => {
      o = null;
    }), e == null || e.minimize(), o.loadURL(`file://${t}`);
  }
});
r.handle("remove-file", async (s, t) => await z(t));
c.on("before-quit", () => {
  r.removeHandler("create-file"), r.removeHandler("list-files"), r.removeHandler("fetch-file-data"), r.removeHandler("save-file"), r.removeHandler("export-to-pdf"), r.removeHandler("open-directory"), r.removeHandler("open-pdf"), r.removeHandler("open-pdf-in-app"), r.removeHandler("remove-file"), p.unregisterAll();
});
export {
  B as MAIN_DIST,
  w as RENDERER_DIST,
  u as VITE_DEV_SERVER_URL,
  e as win
};
