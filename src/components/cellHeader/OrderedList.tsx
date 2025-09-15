import { type Editor } from "@tiptap/react";
import { GrOrderedList } from "react-icons/gr";
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
        icon={<GrOrderedList size={18} />}
        size={26}
        onClick={orderedListHandler}
        variantType="icon"
        shape="md"
      />
    </Tooltip>
  );
}

export default memo(OrderedList);
