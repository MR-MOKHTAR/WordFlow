import { useCallback } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Tooltip from "../ui/Tooltip";
import useNewFile from "../contexts/newfile/useNewFile";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

export default function AddNewFile() {
  const { setOpenNewFileModal } = useNewFile();
  const handleOpenModal = useCallback(
    () => setOpenNewFileModal(true),
    [setOpenNewFileModal]
  );

  return (
      <Tooltip content="New File" position="left">
        <UnifiedButton
        variantType="icon"
          icon={<AiOutlineFileAdd size={20}/>}
          onClick={handleOpenModal}
         size={36}
         shape="md"
         
        />
      </Tooltip>
  );
}
