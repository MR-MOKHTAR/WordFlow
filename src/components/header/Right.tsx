import { HiMinus } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { LuMaximize } from "react-icons/lu";
import { useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

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
      <UnifiedButton
        variantType="icon"
        size={30}
        shape="md"
        onClick={handleClose}
        icon={<IoCloseOutline size={18} />}
      />
      <UnifiedButton
        variantType="icon"
        size={30}
        shape="md"
        onClick={handleMaximize}
        icon={<LuMaximize size={18} />}
      />
      <UnifiedButton
        variantType="icon"
        size={30}
        shape="md"
        onClick={handleMinimize}
        icon={<HiMinus size={18} />}
      />
    </div>
  );
}

export default HeaderRight;
