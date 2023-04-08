import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Error } from './pages/Error'

function App() {
  const { currentUser } = useContext(AuthContext)
  const Protected = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/signin" />
    }
    return children
  }

  const UnProtected = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/" />
    }
    return children
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-600">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtected>
                <Signup />
              </UnProtected>
            }
          />
          <Route
            path="/signin"
            element={
              <UnProtected>
                <Signin />
              </UnProtected>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
