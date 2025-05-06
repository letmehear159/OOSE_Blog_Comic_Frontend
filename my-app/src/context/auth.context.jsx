import { createContext, useState } from 'react'

export const AuthContext = createContext({})

export const AuthWrapper = (props) => {
  const [user, setUser] = useState(null)
  const [uploadCharacterAvatar, setUploadCharacterAvatar] = useState(null)


  const [isLoading, setIsLoading] = useState(false)
  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading,uploadCharacterAvatar, setUploadCharacterAvatar }}>
      {
        props.children
      }
    </AuthContext.Provider>
  )
}

