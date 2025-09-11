import { MdOutlineSaveAlt } from "react-icons/md";
import useSaveFile from "../SaveFile/useSaveFile";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { useCallback } from "react";

export default function SaveButton() {
  const { activeFile } = useFilesContext();

  const saveFile = useSaveFile({ mode: "instant", throttleDelay: 500 });

  const handleClick = useCallback(
    () => activeFile && saveFile(activeFile),
    [activeFile, saveFile]
  );
  return (
    <Tooltip content={`Save (Ctrl+S)`}>
      <ButtonWithIcon Icon={MdOutlineSaveAlt} onClick={handleClick} />
    </Tooltip>
  );
}
