import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'

export const Signup = () => {
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleSignup = async (e) => {
    setLoading(true)
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', res.user.uid), {
        email: res.user.email,
        uid: res.user.uid,
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="w-96 p-6 shadow-lg bg-white rounded-md">
      <h1 className="text-2xl">Sign up</h1>

      <hr className="mt-3 py-2" />
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
          <span>
            {errors.email?.type === 'required' && (
              <p className="text-red-500">This field is required</p>
            )}
          </span>
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={password}
            {...register('password', {
              required: true,
              minLength: 6,
            })}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          />
          <span>
            {errors.password?.type === 'required' && (
              <p className="text-red-500">This field is required</p>
            )}
          </span>
        </div>

        <button
          type="submit"
          className="inline-block w-full px-8 py-3 leading-none text-white bg-green-600 hover:bg-green-700 font-semibold rounded shadow"
        >
          Sign up
        </button>
        <span className="text-red-500 p-2">{error && <p>{error}</p>}</span>
      </form>
      <span className="text-black mt-4">
        Not a member?{' '}
        <Link to="/signin" className="text-green-600">
          Signin
        </Link>
      </span>
    </div>
  )
}
