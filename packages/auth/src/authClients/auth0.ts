import type { Auth0Client as Auth0 } from '@auth0/auth0-spa-js'

import { gHistory } from '@redwoodjs/history'

import type { AuthClient } from './'

export type AuthClientAuth0 = AuthClient

export type { Auth0 }

// TODO: Map out this user properly.
export interface Auth0User {}

export const auth0 = (client: Auth0): AuthClientAuth0 => {
  return {
    type: 'auth0',
    client,
    restoreAuthState: async () => {
      if (
        global?.location?.search?.includes('code=') &&
        global?.location?.search?.includes('state=')
      ) {
        const { appState } = await client.handleRedirectCallback()
        const url =
          appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
        gHistory.navigate(url, { replace: true })
      }
    },
    login: async (options?) => client.loginWithRedirect(options),
    logout: (options?) => client.logout(options),
    signup: async (options?) =>
      client.loginWithRedirect({
        ...options,
        screen_hint: 'signup',
        prompt: 'login',
      }),
    getToken: async () => client.getTokenSilently(),
    getUserMetadata: async () => {
      const user = await client.getUser()
      return user || null
    },
  }
}
