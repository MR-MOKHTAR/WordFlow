import { app } from "electron";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";

const userDataPath = app.getPath("userData");
const myDataDir = path.join(userDataPath, "Data");

type DataType = {
  fileName: string;
  content: object[];
};

const createDir = () => {
  if (!fs.existsSync(myDataDir)) {
    fs.mkdirSync(myDataDir, { recursive: true });
  }
};

async function createFile(data: DataType) {
  const result = await getFileList();
  if (result.success) {
    const newFile = result.files?.includes(`${data.fileName}`);
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
  // * Create directory if it does not exist
  createDir();

  try {
    const files = await fs.promises.readdir(myDataDir);
    const filesJson = files.filter((f) => f.endsWith(".json"));
    // console.log(myDataDir);

    return { success: true, files: filesJson };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function getFileData(fileName: string) {
  const filePath = path.join(myDataDir, fileName);

  try {
    const result = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(result);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err };
  }
}

// * Save File

async function saveFile(data: DataType) {
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

async function removeFile(fileName: string) {
  try {
    await unlink(path.join(myDataDir, fileName));
    return { success: true, message: `فایل ${fileName} با موفقیت حذف شد.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, message };
  }
}

export { createFile, getFileList, getFileData, saveFile, removeFile };
