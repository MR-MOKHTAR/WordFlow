import { type Editor } from "@tiptap/react";
import { GrOrderedList } from "react-icons/gr";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

function OrderedList({ editor }: { editor: Editor | null }) {
  const orderedListHandler = useCallback(
    () => editor?.chain().focus().toggleOrderedList().run(),
    [editor]
  );
  return (
    <Tooltip content="Ordered List" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={GrOrderedList}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={orderedListHandler}
      />
    </Tooltip>
  );
}

export default memo(OrderedList);
