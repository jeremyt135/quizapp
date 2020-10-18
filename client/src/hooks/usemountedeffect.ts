import React, { useEffect } from 'react'

export const useMountedEffect = (
  effect: (state: { mounted: boolean }) => void | (() => void),
  deps?: React.DependencyList
) => {
  const state = { mounted: true }
  useEffect(() => {
    const cleanup = effect(state)
    return () => {
      state.mounted = false
      if (cleanup) {
        cleanup()
      }
    }
  }, deps)
}
