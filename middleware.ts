// The functionality to redirect a user to the login page is already handled by the NextAuth middleware.

export {default} from 'next-auth/middleware'

export const config = {
    matcher: [
        '/issues/new',
        '/issues/edit/:id+'
    ]
}