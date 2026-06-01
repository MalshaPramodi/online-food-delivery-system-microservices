import type { PropsWithChildren } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { createCustomer, loginCustomer } from '../../api/customerApi'

export type UserRole = 'admin' | 'customer' | 'restaurant'

export type AuthUser = {
  id?: number
  name: string
  email: string
  role: UserRole
  restaurantName?: string
}

type StoredAccount = AuthUser & {
  password: string
}

type SignupInput = Omit<AuthUser, 'role'> & {
  role: Exclude<UserRole, 'admin'>
  password: string
}

type LoginInput = {
  email: string
  password: string
}

type AuthContextValue = {
  user: AuthUser | null
  login: (input: LoginInput) => Promise<AuthUser>
  signup: (input: SignupInput) => Promise<AuthUser>
  logout: () => void
}

const USER_STORAGE_KEY = 'food-delivery-auth-user'
const ACCOUNTS_STORAGE_KEY = 'food-delivery-auth-accounts'

const demoAccounts: StoredAccount[] = [
  {
    name: 'Admin User',
    email: 'admin@foodapp.test',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Restaurant Owner',
    email: 'restaurant@foodapp.test',
    password: 'restaurant123',
    role: 'restaurant',
    restaurantName: 'Urban Spice Kitchen',
  },
  {
    name: 'Customer User',
    email: 'customer@foodapp.test',
    password: 'customer123',
    role: 'customer',
  },
]

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback

  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function getStoredUser() {
  return parseJson<AuthUser | null>(
    window.localStorage.getItem(USER_STORAGE_KEY),
    null,
  )
}

function getStoredAccounts() {
  return parseJson<StoredAccount[]>(
    window.localStorage.getItem(ACCOUNTS_STORAGE_KEY),
    [],
  )
}

function saveStoredAccounts(accounts: StoredAccount[]) {
  window.localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser())

  const saveUser = (input: AuthUser) => {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(input))
    setUser(input)
    return input
  }

  const login = async (input: LoginInput) => {
    const email = normalizeEmail(input.email)

const localAccount = [...demoAccounts, ...getStoredAccounts()].find(
  (item) =>
    normalizeEmail(item.email) === email &&
    item.password === input.password &&
    item.role !== 'customer',
)

if (localAccount) {
  return saveUser({
    name: localAccount.name,
    email: localAccount.email,
    role: localAccount.role,
    restaurantName: localAccount.restaurantName,
  })
}

try {
  const customer = await loginCustomer({
    email,
    password: input.password,
  })

  return saveUser({
    id: customer.id,
    name: customer.fullName,
    email: customer.email,
    role: 'customer',
  })
} catch {
  throw new Error('Invalid email or password.')
}
  }

  const signup = async (input: SignupInput) => {
    const email = normalizeEmail(input.email)
    const storedAccounts = getStoredAccounts()
    const existingAccount = [...demoAccounts, ...storedAccounts].some(
      (account) => normalizeEmail(account.email) === email,
    )

    if (existingAccount) {
      throw new Error('An account with this email already exists.')
    }

    if (input.role === 'customer') {
      const customer = await createCustomer({
        fullName: input.name.trim(),
        email,
        phone: '0000000000',
        password: input.password,
        active: true,
    })

    return saveUser({
        id: customer.id,
        name: customer.fullName,
        email: customer.email,
        role: 'customer',
    })
}

    const account: StoredAccount = {
      ...input,
      email,
      name: input.name.trim(),
      restaurantName: input.role === 'restaurant' ? input.name.trim() : undefined,
    }

    saveStoredAccounts([...storedAccounts, account])

    return saveUser({
      name: account.name,
      email: account.email,
      role: account.role,
      restaurantName: account.restaurantName,
    })
  }

  const logout = () => {
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login,
      signup,
      logout,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}

export function getRedirectPath(role: UserRole) {
  if (role === 'admin') return '/ops/dashboard'
  if (role === 'restaurant') return '/restaurant/dashboard'
  return '/'
}
