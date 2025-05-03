import { Button } from 'antd'
import { fetchAllUsers } from '../services/userService.js'

const RegisterPage = () => {

  const handleOnClick = () => {
    fetchAllUsers()
      .then(data => {
        console.log('Users:', data)
      })
      .catch(err => {
        console.error('Failed to fetch users', err)
      })
  }

  return (
    <>
      <Button
        onClick={handleOnClick}>
        Click
      </Button>

      <div>Testing</div>
    </>
  )
}

export default RegisterPage
