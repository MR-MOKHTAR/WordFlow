import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import MyButton from "../Ui/ButtonWithIcon";
import { Dispatch, memo, SetStateAction, useCallback } from "react";

type PropType = {
  setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
  isOpenSideBar?: boolean;
};

function ToggleSideBar({ setIsOpenSideBar }: PropType) {
  const showSideBarHandler = useCallback(() => {
    setIsOpenSideBar((prev) => !prev);
  }, [setIsOpenSideBar]);

  return (
    <MyButton
      onClick={showSideBarHandler}
      Icon={BsReverseLayoutSidebarReverse}
      size={30}
      iconSize={16}
      rounded="md"
    />
  );
}

export default memo(ToggleSideBar);
