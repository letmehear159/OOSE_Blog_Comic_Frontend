import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AdminNavbar from "./components/navigation/AdminNavbar";
import AdminSidebar from "./components/navigation/AdminSidebar";
import AdminDashboard from "./components/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AdminManageUsers from "./components/manage/AdminManageUsers";
import AdminManageReports from "./components/manage/AdminManageReports";
import AdminManageBlogs from "./components/manage/AdminManageBlogs";
import AdminManageCategories from "./components/manage/AdminManageCategories";
import AdminManageTags from "./components/manage/AdminManageTags";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex h-screen relative">
          <AdminSidebar isSidebar={isSidebar} />
          <main className="h-full w-full font-sans">
            <AdminNavbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminManageUsers />} />
              <Route path="/admin/reports" element={<AdminManageReports />} />
              <Route path="/admin/blogs" element={<AdminManageBlogs />} />
              <Route
                path="/admin/categories"
                element={<AdminManageCategories />}
              />
              <Route path="/admin/tags" element={<AdminManageTags />} />
              {/* <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
