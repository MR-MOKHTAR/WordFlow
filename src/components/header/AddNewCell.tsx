import { FaPlus } from "react-icons/fa";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import { useCallback } from "react";

function AddNewCell() {
  const createdNewCell = useCreatedNewCell();
  const handleClick = useCallback(() => createdNewCell(), [createdNewCell]);
  return (
    <Tooltip content="New Note" position="bottom">
      <ButtonWithIcon Icon={FaPlus} onClick={handleClick} />
    </Tooltip>
  );
}

export default AddNewCell;
