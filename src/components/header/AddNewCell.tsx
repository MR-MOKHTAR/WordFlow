import { useCallback, useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";
import useCreatedNewCell from "../Hooks/useCreatedNewCell";
import useFileName from "../contexts/fileName/useFileName";
import useToast from "../contexts/toast/useToast";
import Tooltip from "../ui/Tooltip";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function AddNewCell() {
  const createdNewCell = useCreatedNewCell();
  const { fileName } = useFileName();
  const { setIsShowToast, setToast } = useToast();
  const newCellShortcutRef = useRef<() => void>(() => {});

  const addToastHandler = useCallback(() => {
    setToast({
      description: "برای ایجاد یادداشت یک فایل باز کنید یا فایل جدید بسازید.",
      color: "warning",
      variant: "solid",
      size: "md",
      anchorOrigin: { vertical: "top", horizontal: "left" },
      duration: 4000,
    });
    setIsShowToast(true);
  }, [setIsShowToast, setToast]);

  const handleClick = useCallback(() => {
    if (fileName) createdNewCell();
    else addToastHandler();
  }, [createdNewCell, fileName, addToastHandler]);

  useEffect(() => {
    newCellShortcutRef.current = () => {
      if (fileName) createdNewCell();
      else addToastHandler();
    };
  }, [createdNewCell, fileName, addToastHandler]);

  useEffect(() => {
    const listener = () => newCellShortcutRef.current();
    window.ipcRenderer.on("shortcut:new", listener);

    return () => {
      window.ipcRenderer.removeListener("shortcut:new", listener);
    };
  }, []);
  return (
    <Tooltip content="New Note (Ctrl+N)" position="bottom">
      <UnifiedButton
        onClick={handleClick}
        variantType="icon"
        size={30}
        shape="md"
        icon={<FaPlus size={18} />}
      />
    </Tooltip>
  );
}

export default AddNewCell;
