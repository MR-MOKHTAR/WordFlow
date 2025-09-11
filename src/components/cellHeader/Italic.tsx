import { type Editor } from "@tiptap/react";
import { HiOutlineItalic } from "react-icons/hi2";
import ButtonWithIcon from "../Ui/ButtonWithIcon";
import Tooltip from "../Ui/Tooltip";
import { memo, useCallback } from "react";

function Italic({ editor }: { editor: Editor | null }) {
  const italicHandler = useCallback(
    () => editor?.commands.toggleItalic(),
    [editor]
  );
  return (
    <Tooltip content="Italic" position="bottom-end" delay={700}>
      <ButtonWithIcon
        Icon={HiOutlineItalic}
        size={26}
        iconSize={16}
        rounded="md"
        onClick={italicHandler}
      />
    </Tooltip>
  );
}
export default memo(Italic);
