import { type Editor } from "@tiptap/react";
import { MdOutlineRedo } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

type RedoProp = {
  editor: Editor | null;
};
function Redo({ editor }: RedoProp) {
  const redoHandler = useCallback(() => editor?.commands.redo(), [editor]);
  return (
    <Tooltip content="Redo (Ctrl+Y)" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<MdOutlineRedo size={18} />}
        size={26}
        shape="md"
        onClick={redoHandler}
        variantType="icon"
      />
    </Tooltip>
  );
}

export default memo(Redo);
