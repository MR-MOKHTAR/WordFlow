import { app } from "electron";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";

const userDataPath = app.getPath("userData");
const myDataDir = path.join(userDataPath, "data");

type DataType = {
  fileName: string; // اینجا همیشه باید با پسوند .json بیاد
  content: object[];
};

// * Ensure directory exists
const createDir = () => {
  if (!fs.existsSync(myDataDir)) {
    fs.mkdirSync(myDataDir, { recursive: true });
  }
};

async function createFile(data: DataType) {
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
  } catch (err: unknown) {
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

async function getFileData(fileName: string) {
  const filePath = path.join(myDataDir, fileName);

  try {
    const result = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(result);
    return { success: true, data };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

async function saveFile(data: DataType) {
  const filePath = path.join(myDataDir, data.fileName);

  try {
    await fs.promises.writeFile(
      filePath,
      JSON.stringify(data.content, null, 2),
      "utf-8"
    );

    return { success: true, path: filePath };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

async function removeFile(fileName: string) {
  const filePath = path.join(myDataDir, fileName);

  try {
    await unlink(filePath);
    return { success: true, message: `فایل ${fileName} با موفقیت حذف شد.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { success: false, error: message };
  }
}

export { createFile, getFileList, getFileData, saveFile, removeFile };
