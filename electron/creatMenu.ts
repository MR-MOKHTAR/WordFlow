// import {
//   Menu,
//   MenuItemConstructorOptions,
//   dialog,
//   BrowserWindow,
// } from "electron";
// import fs from "fs";
// import path from "node:path";
// import { fileURLToPath } from "node:url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// function createMenu(win: BrowserWindow) {
//   const template: MenuItemConstructorOptions[] = [
//     {
//       label: "file",
//       submenu: [
//         {
//           label: "New File",
//           accelerator: "CommandOrControl+N",
//           click: () => {
//             openFileHandler();
//           },
//         },
//       ],
//     },
//   ];

//   const menu = Menu.buildFromTemplate(template);
//   Menu.setApplicationMenu(menu);

//   const openFileHandler = () => {
//     dialog
//       .showOpenDialog(win, {
//         title: "یک فایل را انتخاب نمایید",
//         defaultPath: __dirname,
//         properties: ["openFile"],
//         filters: [
//           { name: "Images", extensions: ["jpg", "png"] },
//           { name: "Text Files", extensions: ["txt"] },
//           { name: "All Files", extensions: ["*"] },
//         ],
//       })
//       .then((result) => {
//         if (result.canceled) {
//           console.log("Closed Dailog ...");
//         } else {
//           fs.readFile(result.filePaths[0], "utf-8", (err, data) => {
//             if (err) throw err;

//             win.webContents.send("file-data", data);
//           });
//         }
//       });
//   };
// }

// export default createMenu;
