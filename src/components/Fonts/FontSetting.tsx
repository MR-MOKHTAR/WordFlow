import { AiOutlineFontSize } from "react-icons/ai";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import useFont from "../contexts/FontModal/useFont";
import { useCallback } from "react";

export default function FontSetting() {
  const { setOpenFontModal } = useFont();
  const handleClick = useCallback(() => {
    setOpenFontModal(true);
  }, [setOpenFontModal]);

  return (
    <Tooltip content="Font Settings" position="bottom" delay={200}>
      <ButtonWithIcon
        Icon={AiOutlineFontSize}
        className="header-btn"
        onClick={handleClick}
      />
    </Tooltip>
  );
}
