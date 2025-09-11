import { BrowserWindow, app } from "electron";
import fs from "fs";
import path from "path";

export default async function exportToPdf(cells: string[]) {
  // پنجره مخفی
  const win = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
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

  await win.loadFile(tempPath);

  const pdfPath = path.join(app.getPath("downloads"), "output.pdf");
  const pdfData = await win.webContents.printToPDF({});

  fs.writeFileSync(pdfPath, pdfData);
  win.close();

  return pdfPath;
}
