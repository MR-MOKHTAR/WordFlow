import { createContext } from "react";
import {
  CellContextType,
  DeleteFileContextType,
  ExportPDFContextType,
  FileNameContextType,
  FilesContextType,
  FontContextType,
  NewFileContextType,
  RemoveCellContextType,
} from "../Types";

export const FilesContext = createContext<FilesContextType | null>(null);
export const CellContext = createContext<CellContextType | null>(null);
export const FileNameContext = createContext<FileNameContextType | null>(null);
export const FontModalContext = createContext<FontContextType | null>(null);
export const DeleteFileContext = createContext<DeleteFileContextType | null>(
  null
);
export const RemoveCellContext = createContext<RemoveCellContextType | null>(
  null
);
export const ExportPDFContext = createContext<ExportPDFContextType | null>(
  null
);
export const NewFileContext = createContext<NewFileContextType | null>(null);
