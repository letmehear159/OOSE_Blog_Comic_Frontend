
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";  

function App() {
  return (
    <>
      <div className="app-container">
        <div className="header-container">
          <Navbar />
        </div>
        <div className="content-container">
          <Outlet />
        </div>
      </div>
      
    </>
  );
}

export default App;
