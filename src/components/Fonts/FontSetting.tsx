import { AiOutlineFontSize } from "react-icons/ai";
import Tooltip from "../ui/Tooltip";
import useFont from "../contexts/FontModal/useFont";
import { useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

export default function FontSetting() {
  const { setOpenFontModal } = useFont();
  const handleClick = useCallback(() => {
    setOpenFontModal(true);
  }, [setOpenFontModal]);

  return (
    <Tooltip content="Font Settings" position="bottom" delay={200}>
      <UnifiedButton
        onClick={handleClick}
        variantType="icon"
        size={30}
        shape="md"
        icon={<AiOutlineFontSize size={18} />}
      />
    </Tooltip>
  );
}
