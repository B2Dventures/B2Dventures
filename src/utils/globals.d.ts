export {}

// Create a type for the roles
export type Roles = 'admin' | 'investor' | 'business'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: Roles
        }
    }
}