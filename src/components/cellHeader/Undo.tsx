import { type Editor } from "@tiptap/react";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import { MdOutlineUndo } from "react-icons/md";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

function Undo({ editor }: { editor: Editor | null }) {
  const undoHandler = useCallback(() => editor?.commands.undo(), [editor]);
  return (
    <Tooltip content="Undo (Ctrl+Z)" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={MdOutlineUndo}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={undoHandler}
      />
    </Tooltip>
  );
}

export default memo(Undo);
