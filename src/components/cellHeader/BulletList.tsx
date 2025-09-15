import { type Editor } from "@tiptap/react";
import { GrUnorderedList } from "react-icons/gr";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function BulletList({ editor }: { editor: Editor | null }) {
  const bulletListHandler = useCallback(
    () => editor?.chain().focus().toggleBulletList().run(),
    [editor]
  );
  return (
    <Tooltip content="Bullet List" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<GrUnorderedList size={18} />}
        size={26}
        onClick={bulletListHandler}
        variantType="icon"
        shape="md"
      />
    </Tooltip>
  );
}

export default memo(BulletList);
