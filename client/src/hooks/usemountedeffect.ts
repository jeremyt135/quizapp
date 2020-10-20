import React, { useEffect, useRef } from 'react'

export const useMountedEffect = (
  effect: (state: { mounted: boolean }) => void | (() => void),
  deps?: React.DependencyList
) => {
  const state = useRef({ mounted: true })
  useEffect(() => {
    const cleanup = effect(state.current)
    return () => {
      state.current.mounted = false
      if (cleanup) {
        cleanup()
      }
    }
  }, deps)
}
