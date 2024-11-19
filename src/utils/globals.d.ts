export {}

// Create a type for the roles
export type Roles = 'admin' | 'investor(approved)' | 'business(approved)' | 'guest' | 'investor(pending)' | 'business(pending)'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            id?: number
            role?: Roles
        }
    }
}
