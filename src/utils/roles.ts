import { auth } from '@clerk/nextjs/server'
import { Roles } from "@/utils/globals";

export const checkRole = (role: Roles) => {
    const { sessionClaims } = auth()
    return sessionClaims?.metadata.role === role
}

