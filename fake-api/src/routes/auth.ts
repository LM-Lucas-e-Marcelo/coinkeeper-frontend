import Elysia from 'elysia'

const authRoute = new Elysia()

authRoute.post('/auth/sign-in', ({ set }) => {
  set.status = 200

  return {
    token: 'some token',
    user: {
      name: 'Marcelo Rebelo',
    },
  }
})

export { authRoute }
