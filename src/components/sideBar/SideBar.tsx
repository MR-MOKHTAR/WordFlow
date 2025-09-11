import { useEffect, useState } from "react";
import AddNewFile from "./NewFile";
import ToggleSideBar from "./ToggleSideBar";
import ListFiles from "./ListFiles";
import useFetchFiles from "./useFetchFiles";

function SideBar() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const fetchFiles = useFetchFiles();

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    console.log("SideBar");
  });

  return (
    <div
      className={`sidebar-container ${
        isOpenSideBar
          ? "min-w-35 w-[24%] md:w-[22%] lg:w-[18%]"
          : "w-13 items-center"
      }`}
    >
      <div className="flex-between py-2 border-b border-gray-300 dark:border-b-gray-800">
        {isOpenSideBar && <AddNewFile />}
        <ToggleSideBar setIsOpenSideBar={setIsOpenSideBar} />
      </div>
      {isOpenSideBar && <ListFiles />}
    </div>
  );
}

export default SideBar;
