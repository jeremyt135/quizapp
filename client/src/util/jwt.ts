import jwt from 'jsonwebtoken'

export const tokenIsExpired = (token: string) => {
  const decoded = jwt.decode(token) as { exp: number }
  if (!decoded) {
    return true
  }
  const now = Math.floor(new Date().getTime() / 1000)
  return decoded.exp < now
}
