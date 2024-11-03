export {}

// Create a type for the roles
export type Roles = 'admin' | 'investor' | 'business' | 'guest'

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            id?: number
            role?: Roles
        }
    }
}