// src/app/api/user/[id]/[role]/route.ts
import { createClerkClient , getAuth } from '@clerk/nextjs/server';

import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextApiRequest, res: NextApiResponse , { params }: { params: { id: string; role: string } }) {
    const userIdToUpdate = params.id; // Get user ID from the route parameters
    const newRole = params.role; // Get new role from the route parameters
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    // Authenticate the user making the request
    const { userId } = getAuth(req);
    if (!userId) {
        return res.status(401).json({ error: 'Not authenticated' })
    }

    // Fetch the requesting user to check their role
    const requestingUser = await clerkClient.users.getUser(userId);
    const role = requestingUser.privateMetadata.role;

    // Only allow if the user has the 'admin' role
    if (role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admins only' })
    }

    // Update the role of the target user
    await clerkClient.users.updateUser(userIdToUpdate, {
        privateMetadata: {
            role: newRole, // newRole could be 'investor', 'business', etc.
        },
    });

    return res.status(201).json({ success: true, message: `User role updated to ${newRole}` });
}
