import { getCookie } from 'cookies-next'
import { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

const timeoutInMilliseconds = 10 * 60 * 1000

export const api = ky.create({
  prefixUrl: 'http://localhost:5000',
  timeout: timeoutInMilliseconds,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieStore: CookiesFn | undefined
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')

          cookieStore = serverCookies
        }

        const token = getCookie('token', { cookies: cookieStore })
        const organizationToken = getCookie('organization-token', {
          cookies: cookieStore,
        })

        if (token) {
          request.headers.set('tokenaccess', token)
        }

        if (organizationToken) {
          request.headers.set('tokenaccess-organization', organizationToken)
        }
      },
    ],
  },
})
