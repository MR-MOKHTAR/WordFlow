import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
// import MyButton from "../ui/Buttons/ButtonWithIcon";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import UnifiedButton from "../ui/Buttons/UnifiedButton";

type PropType = {
  setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
  isOpenSideBar?: boolean;
};

function ToggleSideBar({ setIsOpenSideBar }: PropType) {
  const showSideBarHandler = useCallback(() => {
    setIsOpenSideBar((prev) => !prev);
  }, [setIsOpenSideBar]);

  return (
    <UnifiedButton
      onClick={showSideBarHandler}
      icon={<BsReverseLayoutSidebarReverse size={20} />}
      size={36}
      shape="md"
      variantType="icon"
    />
  );
}

export default memo(ToggleSideBar);
