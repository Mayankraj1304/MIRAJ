import './App.css'
import { RouterProvider } from 'react-router'
import { routes } from './app.routes'
import { useSelector } from 'react-redux'
import { useAuth } from '../features/auth/hook/useAuth'
import { useEffect } from 'react'
import { ThemeProvider } from './ThemeContext'

function App() {


  const { handleGetMe } = useAuth()

  const user = useSelector(state => state.auth.user)

  console.log(user)

  useEffect(() => {
    handleGetMe()
  }, [])

  return (
    <ThemeProvider>
      <RouterProvider router={routes} />
    </ThemeProvider>
  )
}

export default App
