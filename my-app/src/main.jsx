import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "antd/dist/reset.css"; // Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import { AuthWrapper } from "./context/auth.context.jsx";
import Callback from "./callback/CallBack.jsx";
import { EditBlogCharacterPage } from "./pages/EditBlogCharacterPage.jsx";
import { ViewBlogCharacterPage } from "./pages/ViewBlogCharacterPage.jsx";
import { NewBlogCharacterPage } from "./pages/NewBlogCharacterPage.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import ViewBlogPage from "./pages/ViewBlogPage.jsx";
import Homepage from "./pages/Homepage.jsx";
import DashboardPage from './pages/DashboardPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import SearchResultPage from './pages/SearchResultPage'
import UserPage from './pages/UserPage.jsx'
import CommentPage from './pages/CommentPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import FavouritePage from './pages/FavouritePage.jsx'
import { ReportProvider } from './context/ReportContext'
import FavouriteProvider from './context/FavouriteContext.jsx'
import CommentAdminPage from './pages/CommentAdminPage.jsx'
import { ROUTES } from "./constants/api.js";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: ROUTES.NEW_CHARACTER,
        element: <NewBlogCharacterPage />,
      },
      {
        path: ROUTES.EDIT_CHARACTER,
        element: <EditBlogCharacterPage />,
      },
      {
        path: ROUTES.CHARACTER,
        element: <ViewBlogCharacterPage />,
      },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: <ForgotPasswordPage />,
      },
      {
        path: ROUTES.REVIEW_COMIC,
        element: <ReviewPage />,
      },
      {
        path: ROUTES.REVIEW_CHARACTER,
        element: <CharacterPage />,
      },
      {
        path: ROUTES.VIEW_BLOG,
        element: <ViewBlogPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.CALLBACK,
    element: <Callback />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTES.SEARCH,
    element: <SearchResultPage />,
  },
  {
    path: ROUTES.USER_BY_USERNAME,
    element: <UserPage />,
  },
  {
    path: ROUTES.COMMENT,
    element: <CommentPage />,
  },
  {
    path: ROUTES.REPORT,
    element: <ReportPage />,
  },
  {
    path: ROUTES.FAVOURITE,
    element: <FavouritePage />,
  },
  {
    path: ROUTES.COMMENT_ADMIN,
    element: <CommentAdminPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <FavouriteProvider>
      <ReportProvider>
        <RouterProvider router={router} />
      </ReportProvider>
    </FavouriteProvider>
  </AuthWrapper>
);
