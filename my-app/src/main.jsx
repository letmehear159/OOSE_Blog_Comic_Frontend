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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: []
  },
  {
    path: '/login',
    element:<LoginPage/>

  },
  {
    path: "/register",
    element: <RegisterPage/>,

  },
  {
    path:"/callback",
    element:<Callback/>
  },
  {
    path:"/character",
    element:<EditBlogCharacterPage/>
  },

])

createRoot(document.getElementById('root')).render(
  <AuthWrapper>
    <RouterProvider router={router}/>
  </AuthWrapper>
)
