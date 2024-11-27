import {NextResponse} from 'next/server';
import {auth, createClerkClient} from "@clerk/nextjs/server";

import prisma from "@/utils/db";
import {Roles} from "@/utils/globals";
import {updateRoleQuery} from "types/models";


export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({users});
    } catch (error) {
        return NextResponse.json({error: "Error fetching users"}, {status: 500});
    }
}


export async function POST(req: Request) {
    // Only allow if the user has the 'admin' role
    if (auth().sessionClaims?.metadata?.role !== 'admin') {
        return NextResponse.json({error: 'Forbidden: Admins only'}, {status: 400});
    }

    const payload: updateRoleQuery = await req.json();
    const {id, role} = payload;

    if (!id || !role) {
        NextResponse.json({error: "Missing required parameters"})
    }


    const clerkClient = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY})

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        select: {
            clerkId: true
        },
    })

    if (!user) {
        return NextResponse.json({error: `User not Fond where id = ${id}`}, {status: 404});
    }

    // Update the role of the target user
    const response = await clerkClient.users.updateUserMetadata(user.clerkId, {
        publicMetadata: {
            role: role
        }
    });

    if (!response) {
        return NextResponse.json({error: "Error updating Clerk metadata"}, {status: 400})
    }

    return NextResponse.json({success: true, message: `User role updated to ${role}`});
}
