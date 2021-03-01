import React, { useEffect } from 'react'

export const useMountedEffect = (
  effect: (state: { mounted: boolean }) => void | (() => void),
  deps?: React.DependencyList
) => {
  useEffect(() => {
    let state = { mounted: true }
    const cleanup = effect(state)
    return () => {
      state.mounted = false
      if (cleanup) {
        cleanup()
      }
    }
  }, deps)
}
