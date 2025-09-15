import { type Editor } from "@tiptap/react";
import { MdOutlineFormatListNumbered } from "react-icons/md";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function OrderedList({ editor }: { editor: Editor | null }) {
  const orderedListHandler = useCallback(
    () => editor?.chain().focus().toggleOrderedList().run(),
    [editor]
  );
  return (
    <Tooltip content="Ordered List" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<MdOutlineFormatListNumbered size={20} />}
        size={26}
        onClick={orderedListHandler}
        variantType="icon"
        shape="md"
      />
    </Tooltip>
  );
}

export default memo(OrderedList);
