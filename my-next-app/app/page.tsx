import FileContent from "./components/FileContent";
import FileOperations from "./components/FileOperations";

const Home = () => {
  // hooks -------------------------------------------------------------------

  // handlers ----------------------------------------------------------------

  // jsx ---------------------------------------------------------------------
  return (
    <div className="w-full mt-[12px] grow">
      <div className="flex flex-row h-full">
        <FileOperations />
        <FileContent />
      </div>
    </div>
  );
};

export default Home;
