import prisma from "@/utils/db";
import {NextResponse} from 'next/server';
import {auth, createClerkClient} from "@clerk/nextjs/server";
import {Roles} from "@/utils/globals";


export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({ users });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching users" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    // Only allow if the user has the 'admin' role
    if (auth().sessionClaims?.metadata?.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden: Admins only' }, { status: 400 });
    }
    const validRoles: Roles[] = ['admin', 'investor(approved)', 'business(approved)', 'guest', 'investor(pending)', "business(pending)"];
    let newRole: Roles | null = null;

    const { searchParams } = new URL(req.url);
    const userIdToUpdate = searchParams.get("id"); // Get user ID from the route parameters
    const role = searchParams.get("role"); // Get new role from the route parameters

    if (validRoles.includes(role as Roles)) {
        newRole = role as Roles;
        // Now `newRole` is guaranteed to be a valid `Roles` type
    } else {
        // Handle invalid role value, e.g., by setting a default or throwing an error
        NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

    const user = await prisma.user.findUnique({
        where: {
            id: Number(userIdToUpdate),
        },
        select:{
            clerkId: true
        },
    })

    if (!user) {
        return NextResponse.json({ error: 'User not Fond' }, {status: 404});
    }

    // Update the role of the target user
    const response = await clerkClient.users.updateUserMetadata(user.clerkId, {
        publicMetadata : {
            role : newRole
        }
    });

    return NextResponse.json({ success: true, message: `User role updated to ${newRole}` });
}
