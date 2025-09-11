import { useCallback } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import Tooltip from "../Ui/Tooltip";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import useNewFile from "../contexts/newfile/useNewFile";

export default function AddNewFile() {
  const { setOpenNewFileModal } = useNewFile();
  const handleOpenModal = useCallback(
    () => setOpenNewFileModal(true),
    [setOpenNewFileModal]
  );

  return (
    <>
      <Tooltip content="New File" position="left">
        <ButtonWithIcon
          Icon={AiOutlineFileAdd}
          onClick={handleOpenModal}
          size={30}
          iconSize={16}
          rounded="md"
        />
      </Tooltip>
    </>
  );
}
