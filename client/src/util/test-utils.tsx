import React from 'react'
import { render, RenderOptions, screen } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from '../store/store'
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom'

type MockStore = Partial<RootState>
const mockStore = configureStore<MockStore>([thunk])
const defaultMockStore = mockStore({})

interface AllContextsProps extends BrowserRouterProps {
  children: React.ReactNode
  store?: MockStore
}

const AllContextsWrapper = ({
  children,
  store,
  ...props
}: AllContextsProps) => {
  return (
    <BrowserRouter {...props}>
      <Provider store={store != null ? mockStore(store) : defaultMockStore}>
        {children}
      </Provider>
    </BrowserRouter>
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
  browserRouterProps?: BrowserRouterProps,
  options?: Pick<
    RenderOptions<typeof import('@testing-library/dom/types/queries')>,
    'container' | 'baseElement' | 'hydrate' | 'wrapper'
  >
) => {
  const Wrapper: React.FC<{}> = ({ children }) => (
    <AllContextsWrapper store={mockStore} {...browserRouterProps}>
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
