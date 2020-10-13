import React from 'react'
import { render, RenderOptions, screen } from '@testing-library/react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { RootState } from '../store/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const mockStore = configureStore<RootState>([thunk])()
const persistor = persistStore(mockStore)

const ProviderWrapper: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Provider store={mockStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

const renderWithProviders = (
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
  options:
    | Pick<
        RenderOptions<typeof import('@testing-library/dom/types/queries')>,
        'container' | 'baseElement' | 'hydrate' | 'wrapper'
      >
    | undefined
) => {
  render(ui, { wrapper: ProviderWrapper, ...options })
}

export * from '@testing-library/react'

export { renderWithProviders as render }
