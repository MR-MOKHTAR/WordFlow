import { MdOutlineSaveAlt } from "react-icons/md";
import useSaveFile from "../SaveFile/useSaveFile";
import Tooltip from "../ui/Tooltip";
import useFilesContext from "../contexts/FilesContext/useFilesContext";
import { useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

export default function SaveButton() {
  const { activeFile } = useFilesContext();

  const saveFile = useSaveFile({ mode: "instant", throttleDelay: 500 });

  const handleClick = useCallback(
    () => activeFile && saveFile(activeFile),
    [activeFile, saveFile]
  );
  return (
    <Tooltip content={`Save (Ctrl+S)`}>
      <UnifiedButton
        onClick={handleClick}
        variantType="icon"
        size={30}
        shape="md"
        icon={<MdOutlineSaveAlt size={18} />}
      />
    </Tooltip>
  );
}
