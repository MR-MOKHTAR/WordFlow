import { MdDeleteOutline } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import useRemoveCell from "../contexts/cell/useRemoveCell";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

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
      <UnifiedButton
      variantType="icon"
        icon={<MdDeleteOutline size={18} className="text-red-700/75"/>}
        onClick={clickHandler}
        size={26}
        className="hover:bg-red-100! dark:hover:bg-red-900/25! "
      />
    </Tooltip>
  );
}

export default memo(DeleteCell);
