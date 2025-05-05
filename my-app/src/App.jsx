import { useContext, useEffect, useState } from 'react'
import './App.css'
import { AuthContext } from './context/auth.context.jsx'
import { fetchAccount } from './services/userService.js'
import { Button, message, Spin } from 'antd'

function App () {
  const { user, setUser, isLoading, setIsLoading } = useContext(AuthContext)

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setIsLoading(true)
      const userPromise = fetchAccount()
      userPromise
        .then(user => {
          setUser(user)
        })
        .catch(error => {
          setUser(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [])

  console.log(">>> Check user ",user)
  return (
    isLoading === true ? <Spin/> :
      <>
        Lấy dữ liệu thành công
      </>
  )
}

export default App