import jwt from 'jsonwebtoken'

export const tokenIsExpired = (token: string) => {
  console.log('REAL tokenIsExpired')
  const decoded = jwt.decode(token) as { exp: number }
  if (!decoded) {
    return true
  }
  const now = Math.floor(new Date().getTime() / 1000)
  return decoded.exp < now
}
