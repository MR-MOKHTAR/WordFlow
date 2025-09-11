import { MdDeleteOutline } from "react-icons/md";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import useRemoveCell from "../contexts/cell/useRemoveCell";
import { memo, useCallback } from "react";

type propType = {
  cellId: string;
};

function DeleteCell({ cellId }: propType) {
  const { setCellID, setOpenRemoveCellModal } = useRemoveCell();

  const clickHandler = useCallback(() => {
    setOpenRemoveCellModal(true);
    setCellID(cellId);
  }, [setOpenRemoveCellModal, setCellID, cellId]);

  return (
    <Tooltip content="Delete Note" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={MdDeleteOutline}
        onClick={clickHandler}
        size={26}
        iconSize={16}
        rounded="md"
        className="hover:bg-red-100! dark:hover:bg-red-900/25! text-red-700!"
      />
    </Tooltip>
  );
}

export default memo(DeleteCell);
