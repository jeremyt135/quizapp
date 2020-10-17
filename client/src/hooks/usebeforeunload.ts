import { useEffect } from 'react'

export const useBeforeUnload = (handler: (e: BeforeUnloadEvent) => void) => {
  useEffect(() => {
    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  })
}
