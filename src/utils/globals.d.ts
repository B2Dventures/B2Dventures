export {}

// Create a type for the roles
export type Roles = 'admin' | 'investor' | 'business' | 'guest' | 'investor(pending)' | 'business(pending)'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            id?: string,
            role?: Roles
        }
    }
}
