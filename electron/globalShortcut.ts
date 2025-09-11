import { app, globalShortcut } from "electron";
import { win } from "./main";

const shortcuts = [
  {
    key: "CommandOrControl+S",
    action: () => win?.webContents.send("shortcut:save"),
  },
  {
    key: "CommandOrControl+N",
    action: () => win?.webContents.send("shortcut:new"),
  },
  {
    key: "CommandOrControl+Shift+I",
    action: () =>
      win?.webContents.isDevToolsOpened()
        ? win.webContents.closeDevTools()
        : win?.webContents.openDevTools(),
  },
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

export default globalShortcutHandler;

/*
🔹 شورتکات‌های پرکاربرد برای ادیتور متن

من بر اساس تجربه Word، VS Code و Google Docs جمع کردم:

📝 مدیریت فایل

Ctrl + N → فایل جدید

Ctrl + O → باز کردن فایل

Ctrl + S → ذخیره

Ctrl + Shift + S → ذخیره به عنوان (Save As)

Ctrl + P → پرینت

🔄 ویرایش متن

Ctrl + C → کپی

Ctrl + X → کات

Ctrl + V → پیست

Ctrl + Z → Undo

Ctrl + Y یا Ctrl + Shift + Z → Redo

Ctrl + A → انتخاب همه

Ctrl + F → جستجو

Ctrl + H → جایگزینی متن (Find & Replace)

✍️ قالب‌بندی

Ctrl + B → Bold

Ctrl + I → Italic

Ctrl + U → Underline

Ctrl + K → لینک‌دار کردن متن (Insert Link)

📄 پیمایش

Ctrl + ↑ / ↓ → حرکت بین پاراگراف‌ها

Ctrl + ← / → → حرکت بین کلمات

Ctrl + Home / End → رفتن به اول/آخر متن

🔧 پیشرفته‌تر (در آینده)

Ctrl + Tab → سوییچ بین تب‌های باز (مثل VS Code / Browser)

Ctrl + W → بستن تب فعلی

Ctrl + Shift + T → باز کردن دوباره تب بسته‌شده (Undo Close Tab)

Ctrl + Shift + P → Command Palette (مثل VS Code، برای دستورات سریع)

Ctrl + / → Comment/Uncomment (برای حالت کدنویسی)
*/
