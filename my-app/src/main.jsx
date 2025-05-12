import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css' // Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import Callback from './callback/CallBack.jsx'
import { EditBlogCharacterPage } from './pages/EditBlogCharacterPage.jsx'
import { ViewBlogCharacterPage } from './pages/ViewBlogCharacterPage.jsx'
import { NewBlogCharacterPage } from './pages/NewBlogCharacterPage.jsx'
import CharacterPage from './pages/CharacterPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import Homepage from './pages/Homepage.jsx'
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

import { NewBlogComicPage } from './pages/NewBlogComicPage.jsx'
import { EditBlogComicPage } from './pages/EditBlogComicPage.jsx'
import { ViewBlogComicPage } from './pages/ViewBlogComicPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import TestErrorPage from './pages/TestErrorPage.jsx'
// Error handler for async operations
const errorHandler = async (error) => {
  // Log the error to your error tracking service
  console.error("Router Error:", error);

  // Handle different types of errors
  if (error instanceof Response) {
    const data = await error.json().catch(() => ({}));
    throw new Error(data.message || "An error occurred while fetching data");
  }

  if (error instanceof Error) {
    throw error;
  }

  throw new Error("An unexpected error occurred");
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
        errorElement: <ErrorPage />,
        loader: async () => {
          try {
            // Your homepage data fetching logic here
            return null;
          } catch (error) {
            return errorHandler(error);
          }
        },
      },
      {
        path: "/new-character",
        element: <NewBlogCharacterPage />,
      },

      {
        path: "/edit-character/:id",
        element: <EditBlogCharacterPage />,
      },
      {
        path: "/character/:id",
        element: <ViewBlogCharacterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/review-comic",
        element: <ReviewPage />,
      },
      {
        path: "/review-character",
        element: <CharacterPage />,
      },
      // {
      //   path: "/view-blog",
      //   element: <ViewBlogPage />,
      // },
      {
        path: '/new-comic',
        element: <NewBlogComicPage/>
      },
      {
        path: '/edit-comic/:id',
        element: <EditBlogComicPage/>,
      },
      {
        path: "/test-error",
        element: <TestErrorPage />,
      },
      {
        path: "/test-error/404",
        loader: () => {
          throw new Response("Not Found", { status: 404 });
        },
      },
      {
        path: "/test-error/403",
        loader: () => {
          throw new Response("Forbidden", { status: 403 });
        },
      },
      {
        path: "/test-error/500",
        loader: () => {
          throw new Response("Server Error", { status: 500 });
        },
      },
      {
        path: "/test-error/network",
        loader: () => {
          throw new Error("Network Error: Failed to fetch data");
        },
      },
      {
        path: "/test-error/unknown",
        loader: () => {
          throw new Error("An unexpected error occurred");
        },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path: '/search',
    element: <SearchResultPage/>
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage/>
  },
  {
    path: '/users',
    element: <UserPage/>
  },
  {
    path: 'comment',
    element: <CommentPage/>
  },
  {
    path: 'report',
    element: <ReportPage/>
  },
  {
    path: 'favourite',
    element: <FavouritePage/>
  },
  {
    path: '/comment-admin',
    element: <CommentAdminPage/>
  }
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
