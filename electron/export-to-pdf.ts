import { BrowserWindow, app } from "electron";
import fs from "fs";
import path from "path";

export default async function exportToPdf(cells: string[], fileName: string) {
  // حذف پسوند .json (اگه وجود داشت)
  const baseName = fileName.replace(/\.json$/i, "");

  // پنجره مخفی
  const win = new BrowserWindow({
    show: false,
    webPreferences: { contextIsolation: true, sandbox: true },
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

  // مسیر فایل موقت HTML
  const tempPath = path.join(app.getPath("userData"), "temp.html");
  fs.writeFileSync(tempPath, html, "utf-8");

  try {
    await win.loadFile(tempPath);

    // مسیر نهایی PDF (داخل Downloads کاربر)
    const pdfPath = path.join(app.getPath("downloads"), `${baseName}.pdf`);
    const pdfData = await win.webContents.printToPDF({});

    fs.writeFileSync(pdfPath, pdfData);
    return {
      success: true,
      path: pdfPath,
      message: "فایل PDF با موفقیت ساخته شد!",
    };
  } catch (err) {
    return { success: false, message: err, path: null };
  } finally {
    win.close();
    // فایل temp.html رو پاک کن
    try {
      fs.unlinkSync(tempPath);
    } catch {
      /* ignore */
    }
  }
}
