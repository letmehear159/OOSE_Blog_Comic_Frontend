import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'antd/dist/reset.css'// Đối với AntD v5 trở lên
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import { AuthWrapper } from './context/auth.context.jsx'
import Callback from './callback/CallBack.jsx'
import { EditBlogCharacterPage } from './pages/EditBlogCharacterPage.jsx'
import { ViewBlogCharacterPage } from './pages/ViewBlogCharacterPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import { NewBlogCharacterPage } from './pages/NewBlogCharacterPage.jsx'
import CharacterPage from './pages/CharacterPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ViewBlogPage from './pages/ViewBlogPage.jsx'
import Homepage from './pages/Homepage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true,
        element: <Homepage/>

      },
      {
        path: '/new-character',
        element: <NewBlogCharacterPage/>
      },

      {
        path: '/edit-character/:id',
        element: <EditBlogCharacterPage/>
      },
      {
        path: '/character/:id',
        element: <ViewBlogCharacterPage/>
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage/>
      },
      {
        path: '/review-truyen',
        element: <ReviewPage/>
      },
      {
        path: '/nhanvat',
        element: <CharacterPage/>
      },
      {
        path: '/view-blog',
        element: <ViewBlogPage/>
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage/>

  },
  {
    path: '/register',
    element: <RegisterPage/>,

  },
  {
    path: '/callback',
    element: <Callback/>
  },

])

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <RouterProvider router={router}/>
  </AuthWrapper>
)
