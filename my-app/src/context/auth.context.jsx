import { createContext, useState } from 'react'

export const AuthContext = createContext({})

export const AuthWrapper = (props) => {
  const [user, setUser] = useState(null)


  const [isLoading, setIsLoading] = useState(false)
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

