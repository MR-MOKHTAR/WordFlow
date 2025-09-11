import { type Editor } from "@tiptap/react";
import { HiOutlineBold } from "react-icons/hi2";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

function Bold({ editor }: { editor: Editor | null }) {
  const boldHandler = useCallback(
    () => editor?.commands.toggleBold(),
    [editor]
  );
  return (
    <Tooltip content="Bold" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={HiOutlineBold}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={boldHandler}
      />
    </Tooltip>
  );
}
export default memo(Bold);
