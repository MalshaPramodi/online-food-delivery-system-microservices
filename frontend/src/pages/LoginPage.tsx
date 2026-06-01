import { ArrowRight, LockKeyhole, Mail, Sparkles } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getRedirectPath, useAuth } from '../features/auth/AuthContext'

type LocationState = {
  from?: string
}

const demoCredentials = [
  {
    label: 'Restaurant',
    email: 'restaurant@foodapp.test',
    password: 'restaurant123',
  },
]

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as LocationState | null)?.from

  useEffect(() => {
    if (user) {
      navigate(getRedirectPath(user.role), { replace: true })
    }
  }, [navigate, user])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const user = await login({ email, password })
      navigate(from ?? getRedirectPath(user.role), { replace: true })
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : 'Unable to login right now.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8f1] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1100px] items-center gap-8 lg:grid-cols-[1fr_440px]">
        <section>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-lg bg-[#FE5826] p-2 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Online Food Delivery
          </Link>
          <h1 className="mt-8 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
            Welcome back to your food delivery workspace.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
            Sign in to manage your orders, update your restaurant, or keep the
            delivery experience running smoothly.
          </p>
          <div className="mt-6 grid max-w-xl gap-3 sm:grid-cols-3">
            {demoCredentials.map((credential) => (
              <button
                key={credential.email}
                type="button"
                onClick={() => {
                  setEmail(credential.email)
                  setPassword(credential.password)
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-sm font-semibold shadow-sm transition hover:border-[#FE5826]"
              >
                {credential.label}
                <span className="mt-1 block text-xs font-normal text-slate-500">
                  Fill demo login
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#476E00]">
              Login
            </p>
            <h2 className="mt-2 text-2xl font-bold">Access your account</h2>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <span className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder="you@example.com"
                />
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <span className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <LockKeyhole className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder="Password"
                />
              </span>
            </label>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#476E00] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            New here?{' '}
            <Link to="/signup" className="font-semibold text-[#FE5826]">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
