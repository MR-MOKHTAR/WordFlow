import { type Editor } from "@tiptap/react";
import { HiOutlineItalic } from "react-icons/hi2";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function Italic({ editor }: { editor: Editor | null }) {
  const italicHandler = useCallback(
    () => editor?.commands.toggleItalic(),
    [editor]
  );
  return (
    <Tooltip content="Italic" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<HiOutlineItalic size={18} />}
        size={26}
        onClick={italicHandler}
        variantType="icon"
        shape="md"
      />
    </Tooltip>
  );
}
export default memo(Italic);
