import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="w-96 p-6 shadow-lg bg-white rounded-md">
      <h1 className="text-2xl">Signin </h1>

      <hr className="mt-3 py-2" />
      <form onSubmit={handleSignin}>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="inline-block w-full px-8 py-3 leading-none text-white bg-green-600 hover:bg-green-700 font-semibold rounded shadow"
        >
          SignIn
        </button>
        {error && <p>{error}</p>}
      </form>
      <span className="text-black mt-4">
        Not a member?{' '}
        <Link to="/signup" className="text-green-600">
          Signup
        </Link>
      </span>
    </div>
  )
}
