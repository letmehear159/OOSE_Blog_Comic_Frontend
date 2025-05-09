import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import AppFooter from "./components/Footer/AppFooter";
import { useContext, useEffect } from "react";
import "./App.css";
import { AuthContext } from "./context/auth.context.jsx";
import { fetchAccountAPI } from "./services/userService.js";
function App() {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoading(true);
      const userPromise = fetchAccountAPI();
      userPromise
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div className="app-container min-h-screen flex flex-col bg-gray-50 mt-2">
        <div className="header-container rounded-lg">
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
