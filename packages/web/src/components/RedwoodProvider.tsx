import { HelmetProvider } from 'react-helmet-async'

import '@redwoodjs/history'

interface RedwoodProviderProps {
  children: React.ReactNode
}

export const RedwoodProvider = ({ children }: RedwoodProviderProps) => {
  return (
    <HelmetProvider context={global.__REDWOOD__HELMET_CONTEXT}>
      {children}
    </HelmetProvider>
  )
}

declare global {}
