import { type Editor } from "@tiptap/react";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import { MdOutlineRedo } from "react-icons/md";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

type RedoProp = {
  editor: Editor | null;
};
function Redo({ editor }: RedoProp) {
  const redoHandler = useCallback(() => editor?.commands.redo(), [editor]);
  return (
    <Tooltip content="Redo (Ctrl+Y)" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={MdOutlineRedo}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={redoHandler}
      />
    </Tooltip>
  );
}

export default memo(Redo);
