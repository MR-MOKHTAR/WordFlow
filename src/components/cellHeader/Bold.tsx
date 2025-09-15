import { type Editor } from "@tiptap/react";
import { HiOutlineBold } from "react-icons/hi2";
import Tooltip from "../ui/Tooltip";
import { memo, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

function Bold({ editor }: { editor: Editor | null }) {
  const boldHandler = useCallback(
    () => editor?.commands.toggleBold(),
    [editor]
  );
  return (
    <Tooltip content="Bold" position="bottom-end" delay={700}>
      <UnifiedButton
        icon={<HiOutlineBold size={18} />}
        size={26}
        onClick={boldHandler}
        variantType="icon"
        shape="md"
      />
    </Tooltip>
  );
}
export default memo(Bold);
