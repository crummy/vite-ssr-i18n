// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, {useContext} from 'react'
import type {PageContext} from './types'
import {Locale} from "./i18n";

export { PageContextProvider }
export { usePageContext }

const Context = React.createContext<PageContext & Locale>(undefined as any)

function PageContextProvider({ pageContext, children }: { pageContext: PageContext & Locale; children: React.ReactNode }) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

function usePageContext() {
  return useContext(Context)
}
