
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";  
import AppSidebar from "./components/Sidebar/AppSidebar";
import AppFooter from "./components/Footer/AppFooter";
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
        <div className="footer-container">
          <AppFooter />
        </div>
      </div>
      
    </>
  );
}

export default App;
