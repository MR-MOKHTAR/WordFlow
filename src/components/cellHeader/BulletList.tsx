import { type Editor } from "@tiptap/react";
import { GrUnorderedList } from "react-icons/gr";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

function BulletList({ editor }: { editor: Editor | null }) {
  const bulletListHandler = useCallback(
    () => editor?.chain().focus().toggleBulletList().run(),
    [editor]
  );
  return (
    <Tooltip content="Bullet List" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={GrUnorderedList}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={bulletListHandler}
      />
    </Tooltip>
  );
}

export default memo(BulletList);
