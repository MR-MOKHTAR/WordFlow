import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import Editor from "./components/cells/Editor";
import { useEffect } from "react";
import ShowModals from "./components/Modals/ShowModals";

function App() {
  useEffect(() => {
    console.log("App.tsx");
  });

  return (
    <div className={`relative h-screen flex flex-col font-Shabnam`}>
      <Header />
      <div className="h-9" />

      <div className="flex flex-1 min-h-0 pl-0.5">
        <SideBar />
        <Editor />
      </div>

      <ShowModals />
    </div>
  );
}

export default App;
