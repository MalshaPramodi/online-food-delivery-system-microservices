import { ArrowRight, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react'
import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { UserRole } from '../features/auth/AuthContext'
import { getRedirectPath, useAuth } from '../features/auth/AuthContext'

type SignupRole = Exclude<UserRole, 'admin'>

const roles: Array<{
  value: SignupRole
  label: string
  description: string
}> = [
  {
    value: 'customer',
    label: 'Customer',
    description: 'Browse restaurants and place orders.',
  },
  {
    value: 'restaurant',
    label: 'Restaurant',
    description: 'Manage menu and restaurant orders.',
  },
]

export function SignupPage() {
  const navigate = useNavigate()
  const { signup, user } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<SignupRole>('customer')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      const user = await signup({ name, email, password, role })
      navigate(getRedirectPath(user.role), { replace: true })
    } catch (signupError) {
      setError(
        signupError instanceof Error
          ? signupError.message
          : 'Unable to create the account right now.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1100px] items-center gap-8 lg:grid-cols-[440px_1fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FE5826]">
              Sign up
            </p>
            <h1 className="mt-2 text-2xl font-bold">Create your account</h1>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">
                {role === 'restaurant' ? 'Restaurant name' : 'Full name'}
              </span>
              <span className="mt-2 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                <UserRound className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder={
                    role === 'restaurant' ? 'Your restaurant name' : 'Your name'
                  }
                />
              </span>
            </label>

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
                  minLength={6}
                  required
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder="At least 6 characters"
                />
              </span>
            </label>

            <fieldset>
              <legend className="text-sm font-medium text-slate-700">
                Account type
              </legend>
              <div className="mt-2 grid gap-2">
                {roles.map((item) => (
                  <label
                    key={item.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                      role === item.value
                        ? 'border-[#476E00] bg-[#eef7e6]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={item.value}
                      checked={role === item.value}
                      onChange={() => setRole(item.value)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="block text-xs leading-5 text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FE5826] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e84f21] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#476E00]">
              Sign in
            </Link>
          </p>
        </section>

        <section>
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="rounded-lg bg-[#476E00] p-2 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Online Food Delivery
          </Link>
          <h2 className="mt-8 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">
            One signup flow for customers and restaurants.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
            Create an account to start ordering your favorite meals or manage your
            restaurant with ease.
          </p>
        </section>
      </div>
    </main>
  )
}
