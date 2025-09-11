import { HiMinus } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { LuMaximize } from "react-icons/lu";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import { useCallback } from "react";

function HeaderRight() {
    const handleClose = useCallback(() => {
    window.ipcRenderer.send("window:close");
  }, []);

  const handleMaximize = useCallback(() => {
    window.ipcRenderer.send("window:maximize");
  }, []);

  const handleMinimize = useCallback(() => {
    window.ipcRenderer.send("window:minimize");
  }, []);

  return (
    <div className="flex items-center gap-1">
      <ButtonWithIcon
        onClick={handleClose}
        Icon={IoCloseOutline}
        iconSize={18}
      />
      <ButtonWithIcon
        onClick={handleMaximize}
        Icon={LuMaximize}
        iconSize={18}
      />
      <ButtonWithIcon onClick={handleMinimize} Icon={HiMinus} iconSize={18} />
    </div>
  );
}

export default HeaderRight;
