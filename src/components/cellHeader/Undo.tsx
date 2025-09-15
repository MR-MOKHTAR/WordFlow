import { type Editor } from "@tiptap/react";
import { MdOutlineUndo } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function Undo({ editor }: { editor: Editor | null }) {
  const undoHandler = useCallback(() => editor?.commands.undo(), [editor]);
  return (
    <Tooltip content="Undo (Ctrl+Z)" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<MdOutlineUndo size={18} />}
        size={26}
        shape="md"
        onClick={undoHandler}
        variantType="icon"
      />
    </Tooltip>
  );
}

export default memo(Undo);
