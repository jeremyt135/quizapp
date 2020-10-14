import React from 'react'
import { render, RenderOptions, screen } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from '../store/store'
import { Router } from 'react-router'
import { createMemoryHistory, MemoryHistory, History } from 'history'

type MockStore = Partial<RootState>
const mockStore = configureStore<MockStore>([thunk])
const defaultMockStore = mockStore({})

interface AllContextsProps {
  children: React.ReactNode
  history: History | MemoryHistory
  store?: MockStore
}

const AllContextsWrapper = ({ children, store, history }: AllContextsProps) => {
  return (
    <Provider store={store != null ? mockStore(store) : defaultMockStore}>
      <Router history={history}>{children}</Router>
    </Provider>
  )
}

const renderWithAllContexts = (
  ui: React.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => React.ReactElement<
        any,
        string | any | (new (props: any) => React.Component<any, any, any>)
      > | null)
    | (new (props: any) => React.Component<any, any, any>)
  >,
  mockStore?: MockStore,
  history?: History,
  options?: Pick<
    RenderOptions<typeof import('@testing-library/dom/types/queries')>,
    'container' | 'baseElement' | 'hydrate' | 'wrapper'
  >
) => {
  const routerHistory = history ?? createMemoryHistory()
  const Wrapper: React.FC<{}> = ({ children }) => (
    <AllContextsWrapper store={mockStore} history={routerHistory}>
      {children}
    </AllContextsWrapper>
  )
  return render(ui, {
    wrapper: Wrapper,
    ...options
  })
}

export * from '@testing-library/react'

export { renderWithAllContexts as render, mockStore }
