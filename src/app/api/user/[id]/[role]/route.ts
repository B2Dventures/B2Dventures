// src/app/api/user/[id]/[role]/route.ts
import {auth, createClerkClient} from '@clerk/nextjs/server';

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/utils/db";

export async function POST(req: NextApiRequest, res: NextApiResponse , { params }: { params: { id: number; role: string } }) {
    // Only allow if the user has the 'admin' role
    if (auth().sessionClaims?.metadata?.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admins only' })
    }

    const userIdToUpdate = params.id; // Get user ID from the route parameters
    const newRole = params.role; // Get new role from the route parameters
    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    const user = await prisma.user.findUnique({
        where: {
            id: userIdToUpdate,
        },
        select:{
            clerkId: true
        },
    })

    if (!user) {
        return res.status(404).json({ error: 'User not Fond' })
    }

    // Update the role of the target user
    await clerkClient.users.updateUser(user.clerkId, {
        publicMetadata: {
            role: newRole, // newRole could be 'investor', 'business', etc.
        },
    });

    return res.status(201).json({ success: true, message: `User role updated to ${newRole}` });
}
