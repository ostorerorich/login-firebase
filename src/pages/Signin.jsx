import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useForm } from 'react-hook-form'
export const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSignin = async (e) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="w-96 p-6 shadow-lg bg-white rounded-md">
      <h1 className="text-2xl">Signin </h1>

      <hr className="mt-3 py-2" />
      <form onSubmit={handleSubmit(handleSignin)}>
        <div className="mb-4">
          <input
            type="email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
          <span className="text-red-500">
            {errors.email?.type === 'required' && <p>This field is required</p>}
            {errors.email?.type === 'pattern' && (
              <p>Enter a valid email address</p>
            )}
          </span>
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register('password', { required: true, minLength: 6 })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
          <span className="text-red-500">
            {errors.password?.type === 'required' && (
              <p>This field is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p>Minimum length should be 6</p>
            )}
          </span>
        </div>

        <button
          type="submit"
          className="inline-block w-full px-8 py-3 leading-none text-white bg-green-600 hover:bg-green-700 font-semibold rounded shadow"
        >
          SignIn
        </button>
        <span className="text-red-500 p-2">{error && <p>{error}</p>}</span>
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
